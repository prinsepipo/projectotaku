import { Routes, Route } from 'react-router';

import LandingPage from './pages/LandingPage';

import './App.css'


function App() {

  return (
    <Routes>
      <Route index element={<LandingPage />} />
    </Routes>
  );
}

export default App
