import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import SignUp from './pages/auth/signup/SignUp';
import Terms from './pages/auth/signup/Terms';
import MainPage from './pages/main/MainPage';
import MyQuest from './pages/quest/MyQuest/MyQuest';
import QuestDetail from './pages/quest/QuestDetail/QuestDetail';
import QuestList from './pages/quest/QuestList/QuestList';
import CustomerService from './pages/support/CustomerService';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/explore" element={<QuestList />} />
        <Route path="/quest-list" element={<QuestList />} />
        <Route path="/quest/:questId" element={<QuestDetail />} />
        <Route path="/quest" element={<MyQuest />} />
        <Route path="/myquest" element={<MyQuest />} />
        <Route path="/support" element={<CustomerService />} />
      </Routes>
    </Router>
  );
}

export default App;
