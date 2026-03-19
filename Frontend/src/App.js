import React from 'react';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import SignUp from './pages/auth/signup/SignUp';
import Terms from './pages/auth/signup/Terms';
import MainPage from './pages/main/MainPage';
import MyQuest from './pages/quest/MyQuest/MyQuest';
import QuestDetail from './pages/quest/QuestDetail/QuestDetail';
import QuestList from './pages/quest/QuestList/QuestList';
import CustomerService from './pages/support/CustomerService';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function AppLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/terms" element={<Terms />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/explore" element={<QuestList />} />
          <Route path="/quest-list" element={<QuestList />} />
          <Route path="/quest/:questId" element={<QuestDetail />} />
          <Route path="/quest" element={<MyQuest />} />
          <Route path="/myquest" element={<MyQuest />} />
          <Route path="/support" element={<CustomerService />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
