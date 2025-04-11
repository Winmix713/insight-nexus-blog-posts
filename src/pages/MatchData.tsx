
import React from 'react';
import Navbar from '@/components/Navbar';
import { MatchResultsTable, LeagueTable, TeamPerformanceMetrics } from '@/components/MatchResults';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, TableIcon } from 'lucide-react';
import { BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Bar, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useMatchData } from '@/context/MatchDataContext';

const MatchData = () => {
  const { teamStats, matches, isLoading } = useMatchData();
  
  // Prepare data for visualizations
  const topTeamsData = !isLoading && teamStats.length > 0 
    ? teamStats.slice(0, 8).map(team => ({
        name: team.name,
        points: team.points,
        goalDifference: team.goalDifference,
        wins: team.wins
      }))
    : [];
    
  // Count goals by team
  const goalsByTeam = !isLoading && teamStats.length > 0
    ? teamStats.slice(0, 10).map(team => ({
        name: team.name,
        goalsFor: team.goalsFor,
        goalsAgainst: team.goalsAgainst
      }))
    : [];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A1128] mb-2">Virtual Premier League Analysis</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive analysis of our virtual Premier League match results including team performance, league standings, and match statistics based on historical data.
          </p>
        </div>
        
        <TeamPerformanceMetrics />
        
        <Tabs defaultValue="league-table" className="w-full mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="league-table" className="flex items-center gap-1">
              <TableIcon size={16} />
              <span>League Table</span>
            </TabsTrigger>
            <TabsTrigger value="match-results" className="flex items-center gap-1">
              <TableIcon size={16} />
              <span>Match Results</span>
            </TabsTrigger>
            <TabsTrigger value="visualizations" className="flex items-center gap-1">
              <BarChart size={16} />
              <span>Visualizations</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="league-table">
            <LeagueTable />
          </TabsContent>
          
          <TabsContent value="match-results">
            <MatchResultsTable />
          </TabsContent>
          
          <TabsContent value="visualizations">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Teams by Points</CardTitle>
                  <CardDescription>
                    League performance of top 8 teams
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart
                      data={topTeamsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={70} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="points" name="Points" fill="#00A6FB" />
                      <Bar dataKey="wins" name="Wins" fill="#FF6700" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Goals For vs Against</CardTitle>
                  <CardDescription>
                    Goal scoring and conceding comparison
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart
                      data={goalsByTeam}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={70} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="goalsFor" name="Goals For" fill="#4CAF50" />
                      <Bar dataKey="goalsAgainst" name="Goals Against" fill="#F44336" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-3">
            <LineChart size={18} className="text-[#0A1128]" />
            <h3 className="font-semibold">About Virtual Premier League</h3>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            This analysis is based on virtual Premier League match data from our historical database. The visualizations showcase team performance, league standings, and match statistics to provide comprehensive insights into our virtual league.
          </p>
          <p className="text-sm text-gray-700">
            The data includes half-time and full-time scores for each match, allowing for analysis of team performance throughout matches, scoring patterns, and league progression, focusing entirely on results rather than individual player statistics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchData;
