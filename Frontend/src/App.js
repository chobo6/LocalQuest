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
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/explore" element={<QuestList />} />
        <Route path="/quest-list" element={<QuestList />} />
        <Route path="/quest/:questId" element={<QuestDetail />} />
        <Route path="/quest" element={<MyQuest />} />
        <Route path="/myquest" element={<MyQuest />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
