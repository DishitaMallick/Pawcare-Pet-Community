import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PetAdoption from './pages/PetAdoption';
import LostAndFound from './pages/LostAndFound';
import AccidentReporting from './pages/AccidentReporting';
import PetMap from './pages/PetMap';
import PetServices from './pages/PetServices';
import VaccinationBooking from './pages/VaccinationBooking';
import ChatbotPage from './pages/ChatbotPage';
import Login from './pages/Login';
import FoundStatus from './pages/FoundStatus';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'transparent' }}>
        <Navbar />
        <main style={{ flex: 1, padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adopt" element={<PetAdoption />} />
            <Route path="/lost-found" element={<LostAndFound />} />
            <Route path="/found/:id" element={<FoundStatus />} />
            <Route path="/accidents" element={<AccidentReporting />} />
            <Route path="/map" element={<PetMap />} />
            <Route path="/services" element={<PetServices />} />
            <Route path="/vaccination" element={<VaccinationBooking />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
