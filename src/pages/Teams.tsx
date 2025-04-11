
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Shield, Users, Trophy, BarChart3 } from 'lucide-react';
import { TEAMS } from '@/lib/teams';
import { useMatchData } from '@/context/MatchDataContext';

const Teams = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 8;
  const { teamStats } = useMatchData();

  // Get team stats from the match data
  const getTeamStats = (teamName: string) => {
    return teamStats.find(stats => stats.name === teamName) || null;
  };

  const filteredTeams = TEAMS.filter(team => 
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);
  const totalPages = Math.ceil(filteredTeams.length / teamsPerPage);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A1128] mb-2">Virtual Premier League Teams</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our virtual Premier League teams and their statistics based on match results.
          </p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
          <Input
            placeholder="Search teams..."
            className="pl-10"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentTeams.map((team) => {
            const stats = getTeamStats(team.name);
            
            return (
              <Card key={team.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5 text-[#0A1128]" />
                    {team.name}
                  </CardTitle>
                  <CardDescription>
                    Virtual Premier League
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-4">
                  <div className="h-32 w-32 relative">
                    <img 
                      src={team.logoUrl} 
                      alt={`${team.name} logo`}
                      className="object-contain w-full h-full"
                      onError={(e) => {
                        e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
                      }}
                    />
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 flex justify-between flex-col p-4">
                  <div className="flex justify-between w-full mb-2">
                    <div className="flex items-center text-sm">
                      <Users size={16} className="mr-2 text-gray-500" />
                      <span>ID: {team.id}</span>
                    </div>
                    {team.weight && (
                      <div className="text-sm font-medium">
                        Weight: {team.weight}
                      </div>
                    )}
                  </div>
                  
                  {stats && (
                    <div className="grid grid-cols-3 gap-2 w-full mt-2">
                      <div className="flex flex-col items-center bg-blue-50 p-2 rounded">
                        <Trophy size={14} className="text-blue-600" />
                        <span className="text-xs text-gray-600">Points</span>
                        <span className="font-bold">{stats.points}</span>
                      </div>
                      <div className="flex flex-col items-center bg-green-50 p-2 rounded">
                        <BarChart3 size={14} className="text-green-600" />
                        <span className="text-xs text-gray-600">GF</span>
                        <span className="font-bold">{stats.goalsFor}</span>
                      </div>
                      <div className="flex flex-col items-center bg-red-50 p-2 rounded">
                        <BarChart3 size={14} className="text-red-600" />
                        <span className="text-xs text-gray-600">GA</span>
                        <span className="font-bold">{stats.goalsAgainst}</span>
                      </div>
                    </div>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {filteredTeams.length > teamsPerPage && (
          <Pagination className="mt-8">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage(p => Math.max(1, p - 1))} />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default Teams;
