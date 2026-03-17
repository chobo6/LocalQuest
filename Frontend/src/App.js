import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <main className="main-content" style={{ minHeight: '80vh' }}> 
          
          <Routes>
            <Route path="/" element={<div>메인 페이지 내용</div>} />
            
          </Routes>
        </main>

        <Footer /> 
      </div>
    </Router>
  );
}

export default App;