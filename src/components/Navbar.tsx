
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, Network, BarChart3, ChevronDown, TableIcon, PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Passing Networks', path: '/passing-networks', icon: <Network size={16} className="mr-1" /> },
  { name: 'Expected Threat', path: '/expected-threat', icon: <BarChart3 size={16} className="mr-1" /> },
  { name: 'Tracking Data', path: '/tracking-data', icon: <Activity size={16} className="mr-1" /> },
  { name: 'Advanced Analytics', path: '/advanced-analytics', icon: <PieChart size={16} className="mr-1" /> },
  { name: 'Match Data', path: '/match-data', icon: <TableIcon size={16} className="mr-1" /> }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-[#0A1128] h-8 w-8 rounded-md flex items-center justify-center">
              <Activity size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl text-[#0A1128]">FootballViz</span>
          </Link>
          
          {isMobile ? (
            <Button variant="ghost" onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          ) : (
            <div className="flex space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center",
                    location.pathname === link.path
                      ? "bg-[#0A1128] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMobile && (
          <div
            className={cn(
              "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity",
              isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            )}
            onClick={toggleMenu}
          >
            <div
              className={cn(
                "fixed top-16 right-0 bottom-0 w-64 bg-white z-50 shadow-xl transition-transform transform",
                isOpen ? "translate-x-0" : "translate-x-full"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "px-4 py-3 flex items-center",
                      location.pathname === link.path
                        ? "bg-[#0A1128] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                    onClick={toggleMenu}
                  >
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
