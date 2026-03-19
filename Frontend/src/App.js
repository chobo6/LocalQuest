import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/auth/login/Login';
import SignUp from './pages/auth/signup/SignUp';
import Terms from './pages/auth/signup/Terms';
import MainPage from './pages/main/MainPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
        <Header />
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/main" replace /> : <Login />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/main"
          element={isAuthenticated ? <MainPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/main" : "/login"} replace />}
        />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
