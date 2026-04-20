import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Dashboard from './pages/Dashboard';
import CrowdMap from './pages/CrowdMap';
import AIAssistant from './pages/AIAssistant';
import WaitTimes from './pages/WaitTimes';
import FoodOrder from './pages/FoodOrder';
import Navigation from './pages/Navigation';
import Emergency from './pages/Emergency';
import SeatNav from './pages/SeatNav';
import BottomNav from './components/BottomNav';

function Layout({ children }) {
  return (
    <div style={{ 
      maxWidth: 480, 
      margin: '0 auto', 
      minHeight: '100vh', 
      position: 'relative', 
      background: 'var(--bg)',
      boxShadow: '0 0 100px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {children}
      </div>
      <BottomNav />
    </div>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/crowd" element={<Layout><CrowdMap /></Layout>} />
        <Route path="/ai" element={<Layout><AIAssistant /></Layout>} />
        <Route path="/waits" element={<Layout><WaitTimes /></Layout>} />
        <Route path="/food" element={<Layout><FoodOrder /></Layout>} />
        <Route path="/nav" element={<Layout><Navigation /></Layout>} />
        <Route path="/seat" element={<Layout><SeatNav /></Layout>} />
        <Route path="/emergency" element={<Layout><Emergency /></Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
