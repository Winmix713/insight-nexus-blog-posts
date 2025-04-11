
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import PassingNetworks from '@/pages/PassingNetworks';
import ExpectedThreat from '@/pages/ExpectedThreat';
import TrackingData from '@/pages/TrackingData';
import AdvancedAnalytics from '@/pages/AdvancedAnalytics';
import MatchData from '@/pages/MatchData';
import Matches from '@/pages/Matches';
import Teams from '@/pages/Teams';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import { MatchDataProvider } from '@/context/MatchDataContext';
import './App.css';

function App() {
  return (
    <MatchDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/passing-networks" element={<PassingNetworks />} />
          <Route path="/expected-threat" element={<ExpectedThreat />} />
          <Route path="/tracking-data" element={<TrackingData />} />
          <Route path="/advanced-analytics" element={<AdvancedAnalytics />} />
          <Route path="/match-data" element={<MatchData />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </MatchDataProvider>
  );
}

export default App;
