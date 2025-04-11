
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Calendar, Search, ArrowUpDown, Calendar as CalendarIcon } from 'lucide-react';
import { useMatchData } from '@/context/MatchDataContext';
import { TEAMS } from '@/lib/teams';

const Matches = () => {
  const { matches, isLoading } = useMatchData();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [teamFilter, setTeamFilter] = useState('all');
  const matchesPerPage = 15;

  // Filter and sort matches
  const filteredMatches = matches.filter(match => {
    const matchesSearch = search === '' || 
      match.homeTeam.toLowerCase().includes(search.toLowerCase()) || 
      match.awayTeam.toLowerCase().includes(search.toLowerCase());
      
    const matchesTeam = teamFilter === 'all' || 
      match.homeTeam === teamFilter || 
      match.awayTeam === teamFilter;
      
    return matchesSearch && matchesTeam;
  });

  const sortedMatches = [...filteredMatches].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });

  // Pagination
  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = sortedMatches.slice(indexOfFirstMatch, indexOfLastMatch);
  const totalPages = Math.ceil(sortedMatches.length / matchesPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, teamFilter, sortOrder]);

  // Find team logo by name
  const getTeamLogo = (teamName: string) => {
    const team = TEAMS.find(t => t.name === teamName);
    return team ? team.logoUrl : null;
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A1128] mb-2">Virtual Premier League Matches</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse all match results from our virtual Premier League with detailed scorelines. Filter by team or search for specific matches.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Match Filter Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <Input
                  placeholder="Search teams..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  {TEAMS.map(team => (
                    <SelectItem key={team.id} value={team.name}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <button 
                className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm"
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              >
                <span>Date {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}</span>
                <ArrowUpDown size={16} />
              </button>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1128]"></div>
          </div>
        ) : (
          <>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-32">Date</TableHead>
                      <TableHead>Home Team</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead>Away Team</TableHead>
                      <TableHead className="text-center">Half-Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentMatches.map((match, index) => {
                      const homeWin = match.fullTimeHome > match.fullTimeAway;
                      const awayWin = match.fullTimeHome < match.fullTimeAway;
                      
                      const homeLogoUrl = getTeamLogo(match.homeTeam);
                      const awayLogoUrl = getTeamLogo(match.awayTeam);
                      
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {match.date}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {homeLogoUrl && (
                                <img src={homeLogoUrl} alt={match.homeTeam} className="h-6 w-6 object-contain" />
                              )}
                              <span className={homeWin ? "font-bold" : ""}>{match.homeTeam}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-bold">
                            {match.fullTimeHome} - {match.fullTimeAway}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {awayLogoUrl && (
                                <img src={awayLogoUrl} alt={match.awayTeam} className="h-6 w-6 object-contain" />
                              )}
                              <span className={awayWin ? "font-bold" : ""}>{match.awayTeam}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-gray-500">
                            {match.halfTimeHome} - {match.halfTimeAway}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {filteredMatches.length > matchesPerPage && (
              <Pagination className="mt-8">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious onClick={() => setCurrentPage(p => Math.max(1, p - 1))} />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return pageNum;
                  }).map((page) => (
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
          </>
        )}
        
        <div className="mt-6 text-sm text-gray-500 bg-white p-4 rounded-lg shadow-sm">
          <p>Total matches: {filteredMatches.length} (showing {indexOfFirstMatch + 1}-{Math.min(indexOfLastMatch, filteredMatches.length)} on this page)</p>
        </div>
      </div>
    </div>
  );
};

export default Matches;
