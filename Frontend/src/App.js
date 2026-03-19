import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/auth/login/Login';
import SignUp from './pages/auth/signup/SignUp';
import Terms from './pages/auth/signup/Terms';
import MainPage from './pages/main/MainPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function AppRoutes({ isAuthenticated }) {
  const location = useLocation();
  const hideLayoutPaths = ['/login', '/signup', '/terms'];
  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Header />}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/main" replace /> : <Login />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/terms" element={<Terms />} />
        <Route
          path="/main"
          element={<MainPage />}
        />
        <Route
          path="/"
          element={<Navigate to="/main" replace />}
        />
      </Routes>
      {!shouldHideLayout && <Footer />}
    </>
  );
}

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <AppRoutes isAuthenticated={isAuthenticated} />
    </Router>
  );
}

export default App;
