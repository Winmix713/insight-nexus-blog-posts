
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Shield, Users } from 'lucide-react';
import { TEAMS } from '@/lib/teams';

const Teams = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 8;

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
          <h1 className="text-3xl font-bold text-[#0A1128] mb-2">Team Profiles</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore detailed profiles, stats, and information about each team in the league.
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
          {currentTeams.map((team) => (
            <Card key={team.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-[#0A1128]" />
                  {team.name}
                </CardTitle>
                <CardDescription>
                  Premier League
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
              <CardFooter className="bg-gray-50 flex justify-between">
                <div className="flex items-center text-sm">
                  <Users size={16} className="mr-2 text-gray-500" />
                  <span>ID: {team.id}</span>
                </div>
                {team.weight && (
                  <div className="text-sm font-medium">
                    Weight: {team.weight}
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
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
