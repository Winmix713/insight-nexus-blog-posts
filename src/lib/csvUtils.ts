/**
 * Utilities for fetching and parsing CSV data
 */

export interface MatchResult {
  date: string;
  homeTeam: string;
  awayTeam: string;
  halfTimeHome: number;
  halfTimeAway: number;
  fullTimeHome: number;
  fullTimeAway: number;
}

/**
 * Fetches CSV data from a URL and parses it into MatchResult objects
 */
export async function fetchMatchResultsFromCSV(url: string): Promise<MatchResult[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    
    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error("Error fetching CSV data:", error);
    return [];
  }
}

/**
 * Parses CSV text into MatchResult objects
 */
function parseCSV(csvText: string): MatchResult[] {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  const results: MatchResult[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Split by comma, but handle quoted values
    const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    
    if (values && values.length >= 7) {
      const cleanValues = values.map(v => v.replace(/"/g, ''));
      
      results.push({
        date: cleanValues[0],
        homeTeam: cleanValues[1],
        awayTeam: cleanValues[2],
        halfTimeHome: parseInt(cleanValues[3], 10),
        halfTimeAway: parseInt(cleanValues[4], 10),
        fullTimeHome: parseInt(cleanValues[5], 10),
        fullTimeAway: parseInt(cleanValues[6], 10)
      });
    }
  }
  
  return results;
}

/**
 * Returns all CSV URLs to fetch
 */
export function getMatchDataUrls(): string[] {
  const baseUrl = "https://raw.githubusercontent.com/Winmix713/legamecs/refs/heads/main/";
  return Array.from({ length: 15 }, (_, i) => `${baseUrl}2032${i}.csv`);
}

/**
 * Calculates team statistics based on match results
 */
export function calculateTeamStats(matches: MatchResult[]) {
  const teams = new Map<string, {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
    form: string[];
  }>();
  
  // Initialize all teams found in matches
  matches.forEach(match => {
    const homeTeam = match.homeTeam;
    const awayTeam = match.awayTeam;
    
    if (!teams.has(homeTeam)) {
      teams.set(homeTeam, {
        played: 0, wins: 0, draws: 0, losses: 0,
        goalsFor: 0, goalsAgainst: 0, points: 0, form: []
      });
    }
    
    if (!teams.has(awayTeam)) {
      teams.set(awayTeam, {
        played: 0, wins: 0, draws: 0, losses: 0,
        goalsFor: 0, goalsAgainst: 0, points: 0, form: []
      });
    }
  });
  
  // Calculate stats for each match
  matches.forEach(match => {
    const homeTeam = teams.get(match.homeTeam)!;
    const awayTeam = teams.get(match.awayTeam)!;
    
    // Update match counts
    homeTeam.played += 1;
    awayTeam.played += 1;
    
    // Update goals
    homeTeam.goalsFor += match.fullTimeHome;
    homeTeam.goalsAgainst += match.fullTimeAway;
    awayTeam.goalsFor += match.fullTimeAway;
    awayTeam.goalsAgainst += match.fullTimeHome;
    
    // Determine result and update stats
    if (match.fullTimeHome > match.fullTimeAway) {
      // Home win
      homeTeam.wins += 1;
      homeTeam.points += 3;
      homeTeam.form.push("W");
      
      awayTeam.losses += 1;
      awayTeam.form.push("L");
    } else if (match.fullTimeHome < match.fullTimeAway) {
      // Away win
      awayTeam.wins += 1;
      awayTeam.points += 3;
      awayTeam.form.push("W");
      
      homeTeam.losses += 1;
      homeTeam.form.push("L");
    } else {
      // Draw
      homeTeam.draws += 1;
      homeTeam.points += 1;
      homeTeam.form.push("D");
      
      awayTeam.draws += 1;
      awayTeam.points += 1;
      awayTeam.form.push("D");
    }
    
    // Keep only the 5 most recent results
    if (homeTeam.form.length > 5) homeTeam.form = homeTeam.form.slice(-5);
    if (awayTeam.form.length > 5) awayTeam.form = awayTeam.form.slice(-5);
  });
  
  // Convert to array and sort by points (descending), then goal difference
  return Array.from(teams.entries())
    .map(([name, stats]) => ({
      name,
      ...stats,
      goalDifference: stats.goalsFor - stats.goalsAgainst
    }))
    .sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points;
      const goalDiffA = a.goalsFor - a.goalsAgainst;
      const goalDiffB = b.goalsFor - b.goalsAgainst;
      if (goalDiffA !== goalDiffB) return goalDiffB - goalDiffA;
      return b.goalsFor - a.goalsFor;
    });
}
