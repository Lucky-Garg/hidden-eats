import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AddStallForm from './components/AddStallForm';
import StallDetail from './components/StallDetail';
import StallList from './components/StallList';
import MyReviews from './components/MyReviews';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-peach-100">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/add-stall" element={<AddStallForm />} />
            <Route path="/stall/:id" element={<StallDetail />} />
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="/search" element={<StallList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
