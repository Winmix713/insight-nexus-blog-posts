
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MatchResult, fetchMatchResultsFromCSV, getMatchDataUrls, calculateTeamStats } from '@/lib/csvUtils';
import { useToast } from '@/components/ui/use-toast';

interface MatchDataContextProps {
  isLoading: boolean;
  matches: MatchResult[];
  teamStats: any[];
  error: string | null;
}

const MatchDataContext = createContext<MatchDataContextProps>({
  isLoading: true,
  matches: [],
  teamStats: [],
  error: null,
});

export const useMatchData = () => useContext(MatchDataContext);

export const MatchDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [teamStats, setTeamStats] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const urls = getMatchDataUrls();
        const results = await Promise.all(
          urls.map(url => fetchMatchResultsFromCSV(url))
        );
        
        // Flatten the array of arrays
        const allMatches = results.flat();
        setMatches(allMatches);
        
        // Calculate team statistics
        const stats = calculateTeamStats(allMatches);
        setTeamStats(stats);
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch match data:', err);
        setError('Failed to load match data. Please try again later.');
        toast({
          title: "Error loading data",
          description: "There was a problem loading the match data.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [toast]);

  return (
    <MatchDataContext.Provider value={{ isLoading, matches, teamStats, error }}>
      {children}
    </MatchDataContext.Provider>
  );
};
