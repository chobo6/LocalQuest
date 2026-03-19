import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CustomerService from './pages/support/CustomerService';
import MainPage from './pages/main/MainPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <Header />

        <main className="app-content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/support" element={<CustomerService />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;