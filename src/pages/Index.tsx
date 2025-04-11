
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FootballPitch from '@/components/FootballPitch';
import { ArrowRight, BarChart3, Activity, Network } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#0A1128] to-[#001F54]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Advanced Football Analytics & Visualizations
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Explore interactive tools for analyzing passing networks, expected threat models, and player tracking data.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/passing-networks" 
                  className="inline-flex items-center px-6 py-3 bg-[#00A6FB] hover:bg-[#0288cc] text-white font-medium rounded-lg transition-colors"
                >
                  Get Started
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <a 
                  href="https://karun.in/blog" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-transparent hover:bg-white/10 text-white font-medium rounded-lg border border-white/30 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              <div className="relative">
                <FootballPitch className="shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-full h-full bg-gradient-to-r from-[#FF6700]/20 via-transparent to-[#00A6FB]/20 z-10"></div>
                  </div>
                </FootballPitch>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex items-center">
                    <Activity className="text-[#FF6700] mr-2" />
                    <span className="text-[#0A1128] font-semibold">Data-Driven Insights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#0A1128] mb-12">Interactive Football Analytics Tools</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Passing Networks */}
            <Link to="/passing-networks" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 bg-[#0A1128] flex items-center justify-center relative">
                  <Network size={80} className="text-[#00A6FB]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00A6FB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0A1128] mb-2">Passing Networks</h3>
                  <p className="text-gray-600 mb-4">
                    Visualize team structures and connections between players through interactive passing network diagrams.
                  </p>
                  <div className="flex items-center text-[#00A6FB] font-medium">
                    Explore
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Expected Threat */}
            <Link to="/expected-threat" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 bg-[#0A1128] flex items-center justify-center relative">
                  <BarChart3 size={80} className="text-[#FF6700]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0A1128] mb-2">Expected Threat (xT)</h3>
                  <p className="text-gray-600 mb-4">
                    Analyze pitch zones by their goal probability values using the Expected Threat (xT) framework.
                  </p>
                  <div className="flex items-center text-[#FF6700] font-medium">
                    Explore
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Tracking Data */}
            <Link to="/tracking-data" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-1">
                <div className="h-48 bg-[#0A1128] flex items-center justify-center relative">
                  <Activity size={80} className="text-[#00A6FB]" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00A6FB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0A1128] mb-2">Tracking Data</h3>
                  <p className="text-gray-600 mb-4">
                    Visualize player movements and positional data with server-side rendered tracking visualization.
                  </p>
                  <div className="flex items-center text-[#00A6FB] font-medium">
                    Explore
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 px-4 bg-[#001F54]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-4">
                Inspired by Karun Singh's Football Analytics Work
              </h2>
              <p className="text-gray-300 mb-4">
                This platform implements interactive versions of the football analytics concepts explored by Karun Singh on his blog.
                The visualizations bring to life complex football metrics and make them accessible to analysts, coaches, and fans.
              </p>
              <p className="text-gray-300">
                Dive into the visualizations to better understand the beautiful game through the lens of data and analytics.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-bold text-[#00A6FB] mb-2">98%</div>
                <div className="text-white">Passing accuracy visualization</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-bold text-[#FF6700] mb-2">0.76</div>
                <div className="text-white">Average xT per possession</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-bold text-[#00A6FB] mb-2">12.3</div>
                <div className="text-white">Km average player distance</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-4xl font-bold text-[#FF6700] mb-2">9.2</div>
                <div className="text-white">PPDA (Pressing metric)</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 bg-[#0A1128] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">FootballViz</h3>
              <p className="text-sm text-gray-400">Advanced football analytics visualizations</p>
            </div>
            <div className="flex gap-6">
              <Link to="/passing-networks" className="hover:text-[#00A6FB] transition-colors">Passing Networks</Link>
              <Link to="/expected-threat" className="hover:text-[#00A6FB] transition-colors">Expected Threat</Link>
              <Link to="/tracking-data" className="hover:text-[#00A6FB] transition-colors">Tracking Data</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>Inspired by <a href="https://karun.in/blog" target="_blank" rel="noopener noreferrer" className="text-[#00A6FB] hover:underline">Karun Singh's</a> football analytics work.</p>
            <p className="mt-2">© {new Date().getFullYear()} FootballViz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
