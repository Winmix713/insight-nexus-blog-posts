
import React from 'react';
import { useMatchData } from '@/context/MatchDataContext';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon, RefreshCw } from 'lucide-react';

export const MatchResultsTable = () => {
  const { matches, isLoading, error } = useMatchData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
        <p>Loading match data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
        <p>{error}</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
        <p>No match data available.</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Match Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Match results from the virtual Premier League</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Home Team</TableHead>
              <TableHead>Away Team</TableHead>
              <TableHead className="text-center">HT Score</TableHead>
              <TableHead className="text-center">FT Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.slice(0, 20).map((match, index) => (
              <TableRow key={index}>
                <TableCell>{match.date}</TableCell>
                <TableCell className="font-medium">{match.homeTeam}</TableCell>
                <TableCell className="font-medium">{match.awayTeam}</TableCell>
                <TableCell className="text-center">
                  {match.halfTimeHome} - {match.halfTimeAway}
                </TableCell>
                <TableCell className="text-center">
                  {match.fullTimeHome} - {match.fullTimeAway}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export const LeagueTable = () => {
  const { teamStats, isLoading, error } = useMatchData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
        <p>Loading league table...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
        <p>{error}</p>
      </div>
    );
  }

  if (teamStats.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-700">
        <p>No team statistics available.</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Virtual Premier League Table</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>League standings based on match results</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Pos</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-center">P</TableHead>
              <TableHead className="text-center">W</TableHead>
              <TableHead className="text-center">D</TableHead>
              <TableHead className="text-center">L</TableHead>
              <TableHead className="text-center">GF</TableHead>
              <TableHead className="text-center">GA</TableHead>
              <TableHead className="text-center">GD</TableHead>
              <TableHead className="text-center">Pts</TableHead>
              <TableHead>Form</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamStats.map((team, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{team.name}</TableCell>
                <TableCell className="text-center">{team.played}</TableCell>
                <TableCell className="text-center">{team.wins}</TableCell>
                <TableCell className="text-center">{team.draws}</TableCell>
                <TableCell className="text-center">{team.losses}</TableCell>
                <TableCell className="text-center">{team.goalsFor}</TableCell>
                <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                <TableCell className="text-center">
                  {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                </TableCell>
                <TableCell className="text-center font-bold">{team.points}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    {team.form.map((result: string, i: number) => (
                      <span 
                        key={i}
                        className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full
                          ${result === 'W' ? 'bg-green-500' : result === 'D' ? 'bg-gray-500' : 'bg-red-500'}`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export const TeamPerformanceMetrics = () => {
  const { teamStats, isLoading } = useMatchData();
  
  if (isLoading || teamStats.length === 0) {
    return null;
  }
  
  // Get the top teams for various metrics
  const topScoringTeam = [...teamStats].sort((a, b) => b.goalsFor - a.goalsFor)[0];
  const bestDefenseTeam = [...teamStats].sort((a, b) => a.goalsAgainst - b.goalsAgainst)[0];
  const mostWinsTeam = [...teamStats].sort((a, b) => b.wins - a.wins)[0];
  
  const metrics = [
    {
      title: "Top Scoring Team",
      team: topScoringTeam.name,
      value: `${topScoringTeam.goalsFor} goals`,
      icon: <ArrowUpIcon className="h-5 w-5 text-green-500" />,
      color: "bg-green-50 border-green-200 text-green-800"
    },
    {
      title: "Best Defense",
      team: bestDefenseTeam.name,
      value: `${bestDefenseTeam.goalsAgainst} goals conceded`,
      icon: <ArrowDownIcon className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-50 border-blue-200 text-blue-800"
    },
    {
      title: "Most Wins",
      team: mostWinsTeam.name,
      value: `${mostWinsTeam.wins} wins from ${mostWinsTeam.played} games`,
      icon: <ArrowUpIcon className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-50 border-purple-200 text-purple-800"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <Card key={index} className={`border ${metric.color}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              {metric.icon}
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-xl">{metric.team}</div>
            <div className="text-sm opacity-70">{metric.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
