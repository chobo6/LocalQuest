import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CustomerService from './pages/support/CustomerService'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* 모든 페이지에서 공통으로 보이는 헤더 */}
        <Header />
        
        {/* 실제 페이지 내용이 갈아끼워지는 영역 */}
        <main className="main-content" style={{ minHeight: '80vh' }}> 
          <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<div>메인 페이지 내용 (지도가 들어갈 자리)</div>} />
            
            {/* 통합 고객센터 페이지 (공지/FAQ/1:1문의) */}
            <Route path="/support" element={<CustomerService />} />
            
            {/* 나중에 추가될 다른 페이지들 (예: 랭킹, 마이페이지 등) */}
          </Routes>
        </main>

        {/* 모든 페이지에서 공통으로 보이는 푸터 */}
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;