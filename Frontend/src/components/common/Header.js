import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import './Header.css';

const Header = () => {
  const [userRole, setUserRole] = useState('GUEST');

  return (
    <div>
      <header className="header-main-container">
        {/* 상단 섹션: 로고 & 유틸 버튼 */}
        <div className="header-top-section">
          <div className="header-inner"> {/* 중앙 정렬을 위한 이너 박스 추가 */}
            <Link to="/" className="header-logo-link">
              <div className="header-logo-wrapper">
                <MdLocationOn className="header-logo-icon" size={28} color="#D93D5E" />
                <span className="header-logo-text">LOCAL QUEST</span>
              </div>
            </Link>

            <div className="header-utility-btns">
              {userRole === 'GUEST' ? (
                <>
                  <button className="header-auth-btn" onClick={() => setUserRole('USER')}>로그인</button>
                  <button className="header-signup-btn">회원가입</button>
                </>
              ) : (
                <>
                  <span className="header-user-info">[{userRole}]님</span>
                  <button className="header-auth-btn" onClick={() => setUserRole('GUEST')}>로그아웃</button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 하단 섹션: 네비게이션 바 */}
        <nav className="header-nav-bar">
          <div className="header-inner"> {/* 중앙 정렬을 위한 이너 박스 추가 */}
            <ul className="header-nav-list">
              <li className="header-nav-item">
                <Link to="/explore" className="header-nav-link">퀘스트 목록</Link>
              </li>
              <li className="header-nav-item">
                <Link to="/quest" className="header-nav-link">내 퀘스트</Link>
              </li>
              <li className="header-nav-item">
                <Link to="/reward" className="header-nav-link">성장 및 보상</Link>
              </li>

              {userRole === 'BUSINESS' && (
                <li className="header-nav-item">
                  <Link to="/business" className="header-nav-link">비즈니스</Link>
                </li>
              )}

              {userRole === 'ADMIN' && (
                <li className="header-nav-item">
                  <Link to="/admin" className="header-nav-link">관리자 페이지</Link>
                </li>
              )}

              {userRole !== 'GUEST' && (
                <li className="header-nav-item">
                  <Link to="/mypage" className="header-nav-link">마이페이지</Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <div className="header-relative-space"> </div>

    </div>
  );
};

export default Header;