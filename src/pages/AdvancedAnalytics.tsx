
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import FootballPitch from '@/components/FootballPitch';
import { TeamSelector } from '@/components/TeamSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, Users, Zap, BarChart3, TrendingUp } from 'lucide-react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

// Mock player stats data
const playerPerformanceData = [
  { name: 'Salah', goals: 22, assists: 13, xG: 19.2, xA: 9.8, shots: 112, keyPasses: 67 },
  { name: 'Mane', goals: 16, assists: 9, xG: 14.7, xA: 7.2, shots: 86, keyPasses: 41 },
  { name: 'Firmino', goals: 9, assists: 8, xG: 10.4, xA: 8.9, shots: 72, keyPasses: 58 },
  { name: 'Alexander-Arnold', goals: 2, assists: 12, xG: 1.4, xA: 10.3, shots: 27, keyPasses: 85 },
  { name: 'Robertson', goals: 1, assists: 7, xG: 0.8, xA: 6.2, shots: 14, keyPasses: 62 },
];

// Mock advanced metrics
const teamMetricsData = [
  { name: 'PPDA', value: 7.2, league_avg: 10.5, description: 'Passes allowed per defensive action' },
  { name: 'Field Tilt', value: 65, league_avg: 50, description: 'Territorial dominance percentage' },
  { name: 'Progressive Passes', value: 75.3, league_avg: 58.2, description: 'Passes that move ball forward significantly' },
  { name: 'Defensive Line Height', value: 42.3, league_avg: 35.8, description: 'Average defensive line height in meters' },
  { name: 'Ball Recoveries', value: 68.2, league_avg: 54.3, description: 'Balls recovered per 90 minutes' },
];

// Mock chart data for shot effectiveness
const shotAnalyticsData = [
  { position: 'Central Zone', shots: 124, goals: 18, conversion: 14.5 },
  { position: 'Right Inside', shots: 67, goals: 7, conversion: 10.4 },
  { position: 'Left Inside', shots: 72, goals: 8, conversion: 11.1 },
  { position: 'Right Outside', shots: 43, goals: 2, conversion: 4.7 },
  { position: 'Left Outside', shots: 38, goals: 1, conversion: 2.6 },
];

const AdvancedAnalytics = () => {
  const [selectedTeam, setSelectedTeam] = useState('Liverpool');

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A1128] mb-2">Advanced Football Analytics</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive analysis of team and player performance metrics inspired by cutting-edge football analytics research.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-[#0A1128]" />
            <h2 className="text-xl font-semibold">Performance Insights</h2>
          </div>
          <TeamSelector selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} />
        </div>

        <Tabs defaultValue="team-metrics" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="team-metrics" className="flex items-center gap-1">
              <BarChart3 size={16} />
              <span>Team Metrics</span>
            </TabsTrigger>
            <TabsTrigger value="player-performance" className="flex items-center gap-1">
              <Users size={16} />
              <span>Player Performance</span>
            </TabsTrigger>
            <TabsTrigger value="shot-analytics" className="flex items-center gap-1">
              <Zap size={16} />
              <span>Shot Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="team-metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMetricsData.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{metric.name}</CardTitle>
                    <CardDescription>{metric.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold">{metric.value}</p>
                        <p className="text-sm text-gray-500">League Avg: {metric.league_avg}</p>
                      </div>
                      <div className={`text-sm font-medium px-2 py-1 rounded-full ${metric.value > metric.league_avg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {metric.value > metric.league_avg ? `+${((metric.value - metric.league_avg) / metric.league_avg * 100).toFixed(1)}%` : `${((metric.value - metric.league_avg) / metric.league_avg * 100).toFixed(1)}%`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Tactical Profile</CardTitle>
                <CardDescription>Key tactical metrics compared to league average</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={teamMetricsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name={`${selectedTeam} Value`} fill="#00A6FB" />
                    <Bar dataKey="league_avg" name="League Average" fill="#B3C5D6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="player-performance" className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Player</th>
                    <th className="px-4 py-2 text-left">Goals</th>
                    <th className="px-4 py-2 text-left">xG</th>
                    <th className="px-4 py-2 text-left">G-xG</th>
                    <th className="px-4 py-2 text-left">Assists</th>
                    <th className="px-4 py-2 text-left">xA</th>
                    <th className="px-4 py-2 text-left">A-xA</th>
                    <th className="px-4 py-2 text-left">Shots</th>
                    <th className="px-4 py-2 text-left">Key Passes</th>
                  </tr>
                </thead>
                <tbody>
                  {playerPerformanceData.map((player, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 font-medium">{player.name}</td>
                      <td className="px-4 py-2">{player.goals}</td>
                      <td className="px-4 py-2">{player.xG.toFixed(1)}</td>
                      <td className={`px-4 py-2 ${player.goals > player.xG ? 'text-green-600' : 'text-red-600'}`}>
                        {(player.goals - player.xG).toFixed(1)}
                      </td>
                      <td className="px-4 py-2">{player.assists}</td>
                      <td className="px-4 py-2">{player.xA.toFixed(1)}</td>
                      <td className={`px-4 py-2 ${player.assists > player.xA ? 'text-green-600' : 'text-red-600'}`}>
                        {(player.assists - player.xA).toFixed(1)}
                      </td>
                      <td className="px-4 py-2">{player.shots}</td>
                      <td className="px-4 py-2">{player.keyPasses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Goal Conversion Efficiency</CardTitle>
                <CardDescription>Goals vs Expected Goals (xG) for key players</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={playerPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="goals" name="Actual Goals" fill="#FF6700" />
                    <Bar dataKey="xG" name="Expected Goals (xG)" fill="#00A6FB" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shot-analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shot Conversion by Position</CardTitle>
                  <CardDescription>Analysis of shot effectiveness from different pitch positions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={shotAnalyticsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="position" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="shots" name="Total Shots" fill="#B3C5D6" />
                      <Bar dataKey="goals" name="Goals Scored" fill="#00A6FB" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shot Map</CardTitle>
                  <CardDescription>Visualization of shots and goals by pitch location</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <FootballPitch>
                    {/* Shot markers would go here in a real implementation */}
                    <div className="absolute w-full h-full flex items-center justify-center">
                      <p className="text-white bg-black/50 px-3 py-2 rounded-md">
                        Interactive shot map visualization
                      </p>
                    </div>
                  </FootballPitch>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Efficiency by Zone</CardTitle>
                <CardDescription>Shot to goal conversion rate from different pitch areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Pitch Position</th>
                        <th className="px-4 py-2 text-left">Total Shots</th>
                        <th className="px-4 py-2 text-left">Goals</th>
                        <th className="px-4 py-2 text-left">Conversion Rate</th>
                        <th className="px-4 py-2 text-left">vs. League Avg</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shotAnalyticsData.map((zone, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-2 font-medium">{zone.position}</td>
                          <td className="px-4 py-2">{zone.shots}</td>
                          <td className="px-4 py-2">{zone.goals}</td>
                          <td className="px-4 py-2">{zone.conversion}%</td>
                          <td className={`px-4 py-2 ${zone.conversion > 10 ? 'text-green-600' : 'text-red-600'}`}>
                            {zone.conversion > 10 ? '+' : ''}{(zone.conversion - 10).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info size={18} className="text-[#0A1128]" />
            <h3 className="font-semibold">About Advanced Analytics</h3>
          </div>
          <p className="text-sm text-gray-700 mb-3">
            This module implements advanced football analytics concepts inspired by the methodologies from <a href="https://github.com/eddwebster/football_analytics" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">eddwebster/football_analytics</a> GitHub repository. The visualizations and metrics showcased here are based on cutting-edge research in the field of football data science.
          </p>
          <p className="text-sm text-gray-700">
            Key metrics explained:
          </p>
          <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1 mt-2">
            <li><strong>PPDA (Passes Per Defensive Action)</strong>: Measures pressing intensity - lower values indicate more aggressive pressing</li>
            <li><strong>Field Tilt</strong>: Percentage of possession in the opposing third, indicating territorial dominance</li>
            <li><strong>xG (Expected Goals)</strong>: The probability of a shot resulting in a goal based on historical data</li>
            <li><strong>Progressive Passes</strong>: Passes that move the ball significantly toward the opponent's goal</li>
            <li><strong>Defensive Line Height</strong>: Average position of the defensive line, measured from the team's goal line</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
