import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import SignUp from './pages/auth/signup/SignUp';
import Terms from './pages/auth/signup/Terms';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/terms" element={<Terms />} />
        {/* 기본 경로 설정 */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
