import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import SignUp from './pages/auth/signup/SignUp';
import Terms from './pages/auth/signup/Terms';
import QuestList from './pages/quest/QuestList/QuestList';
import MyQuest from './pages/quest/MyQuest/MyQuest';
import QuestDetail from './pages/quest/QuestDetail/QuestDetail';

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
