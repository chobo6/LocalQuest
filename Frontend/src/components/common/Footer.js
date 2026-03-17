import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import '../../styles/Footer.css';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  // --- [1. 페이지 경로 설정] ---
  const paths = {
    explore: "/explore",
    ranking: "/ranking",
    badges: "/badges",
    partner: "/business/partner",
    guide: "/business/guide",
    alliance: "/business/alliance",
    faq: "/support/faq",
    notice: "/support/notice",
    contact: "/support/contact"
  };

  // --- [2. 모달 텍스트 내용] ---
  const termsText = `제 1 조 (목적)
본 약관은 Local Quest(이하 "회사")가 제공하는 지역 기반 미션 수행 및 보상 플랫폼 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제 2 조 (용어의 정의)
1. "서비스"란 회사가 위치 정보를 활용하여 회원에게 제공하는 퀘스트, 장소 리뷰, 포인트 보상 플랫폼을 의미합니다.
2. "퀘스트"란 회사가 지정한 특정 장소에서 수행하는 미션을 의미합니다.
3. "포인트"란 미션 성공 시 지급되는 가상의 데이터를 말하며, 회사가 정한 기준에 따라 사용할 수 있습니다.

제 3 조 (회원의 의무)
1. 회원은 위치 정보 활용에 동의해야 정상적인 서비스 이용이 가능합니다.
2. 타인의 정보를 도용하거나 서비스의 정상적인 운영을 방해하는 행위를 해서는 안 됩니다.
3. 허위 리뷰 작성 및 부정한 방법으로 포인트를 취득할 경우 서비스 이용이 제한될 수 있습니다.

제 4 조 (서비스의 중단)
회사는 시스템 점검, 교체 및 고장 등의 사유가 발생한 경우 서비스 제공을 일시적으로 중단할 수 있으며, 이 경우 사전에 공지합니다.`;

  const privacyText = `Local Quest는 이용자의 개인정보를 중요시하며, 관련 법령을 준수합니다.

1. 개인정보 수집 항목
회사는 회원가입 및 서비스 제공을 위해 아래와 같은 정보를 수집합니다.
- 필수항목: 이메일 주소, 닉네임, 비밀번호
- 서비스 이용 과정에서 생성되는 정보: 접속 로그, 쿠키, 위치 정보(퀘스트 수행 시 필수)

2. 개인정보 수집 및 이용 목적
- 서비스 가입 및 본인 확인
- 위치 기반 퀘스트 제공 및 미션 성공 여부 판별
- 포인트 정산 및 부정 이용 방지

3. 개인정보의 보유 및 이용 기간
회원의 개인정보는 원칙적으로 회원 탈퇴 시 지체 없이 파기합니다. 단, 부정 이용 방지를 위해 필요한 경우 6개월간 보관할 수 있으며, 관련 법령에 의해 보존할 필요가 있는 경우 해당 기간까지 보관합니다.

4. 위치 정보 보호
회사는 이용자의 실시간 위치 정보를 동의 없이 제3자에게 제공하지 않으며, 퀘스트 검증 목적 외에는 무단으로 수집·저장하지 않습니다.`;

  const openModal = (title, body) => {
    setModalTitle(title);
    setModalBody(body);
    setIsModalOpen(true);
  };

  return (
    <div>
      <footer className="footer-main-container">
        <div className="footer-inner-content">
          <div className="footer-brand-section">
            <div className="footer-logo-box">
              <MdLocationOn className="footer-logo-icon" size={24} color="#D93D5E" />
              <span className="footer-logo-text">LOCAL QUEST</span>
            </div>
            <p className="footer-brand-desc">
              지역을 게임처럼 탐험하는<br />
              미션 기반 O2O 로컬 발견 플랫폼
            </p>
          </div>

          <div className="footer-menu-wrapper">
            <div className="footer-menu-col">
              <h4 className="footer-menu-title">서비스</h4>
              <ul className="footer-menu-list">
                <li><Link to={paths.explore} className="footer-link">탐색하기</Link></li>
                <li><Link to={paths.ranking} className="footer-link">랭킹</Link></li>
                <li><Link to={paths.badges} className="footer-link">배지 도감</Link></li>
              </ul>
            </div>
            <div className="footer-menu-col">
              <h4 className="footer-menu-title">비즈니스</h4>
              <ul className="footer-menu-list">
                <li><Link to={paths.partner} className="footer-link">파트너 센터</Link></li>
                <li><Link to={paths.guide} className="footer-link">입점 안내</Link></li>
                <li><Link to={paths.alliance} className="footer-link">제휴 제안</Link></li>
              </ul>
            </div>
            <div className="footer-menu-col">
              <h4 className="footer-menu-title">고객지원</h4>
              <ul className="footer-menu-list">
                <li><Link to={paths.faq} className="footer-link">자주 묻는 질문</Link></li>
                <li><Link to={paths.notice} className="footer-link">공지사항</Link></li>
                <li><Link to={paths.contact} className="footer-link">1:1 문의</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p className="footer-copyright">© 2026 Local Quest. All Rights Reserved.</p>
          <div className="footer-legal-links">
            <span className="footer-legal-item" onClick={() => openModal('이용약관', termsText)}>이용약관</span>
            <span className="footer-legal-item footer-bold" onClick={() => openModal('개인정보처리방침', privacyText)}>개인정보처리방침</span>
          </div>
        </div>
      </footer>

      {/* [모달 영역] */}
      {isModalOpen && (
        <div className="modal-fixed-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-fixed-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-fixed-header">
              <h3>{modalTitle}</h3>
              <button onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-fixed-body">
              {modalBody}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;