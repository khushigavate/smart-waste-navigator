import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Search    from './pages/Search';
import Schedule  from './pages/Schedule';
import Reminders from './pages/Reminders';
import Feedback from './pages/Feedback';
import Stats from './pages/Stats';

// Wrapper to inject the route param into Stats
function StatsWrapper() {
  const { id } = useParams();           // grab :id from the URL
  return <Stats facilityId={id} />;     // pass it down as a prop
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<Search />} />
        <Route path="/book"  element={<Schedule />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/stats/:id"   element={<StatsWrapper />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
