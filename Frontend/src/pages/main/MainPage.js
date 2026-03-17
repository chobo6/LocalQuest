import { useEffect, useRef, useState } from 'react';

const hotQuestData = [
  {
    id: 1,
    title: '성수 카페 퀘스트',
    region: '서울 성수',
    description: '요즘 가장 많이 방문하는 감성 카페 지역 미션'
  },
  {
    id: 2,
    title: '전주 야시장 퀘스트',
    region: '전북 전주',
    description: '야시장 인기 먹거리와 골목 탐방 미션'
  },
  {
    id: 3,
    title: '부산 바다 스팟 퀘스트',
    region: '부산 광안리',
    description: '바다 근처 인기 장소를 중심으로 즐기는 미션'
  }
];

const mockLoginUser = {
  isLoggedIn: true,
  memberName: '홍길동'
};

function MainPage() {
  const mapRef = useRef(null);
  const kakaoMapRef = useRef(null);
  const kakaoMarkerRef = useRef(null);
  const [hasLocationConsent, setHasLocationConsent] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showMapDetailModal, setShowMapDetailModal] = useState(false);
  const [selectedMapInfo, setSelectedMapInfo] = useState(null);
  const [mapStatus, setMapStatus] = useState('idle');
  const kakaoMapKey = process.env.REACT_APP_KAKAO_MAP_KEY;

  useEffect(() => {
    if (!mockLoginUser.isLoggedIn || !hasLocationConsent) {
      return;
    }

    if (!kakaoMapKey) {
      setMapStatus('missing-key');
      return;
    }

    const initializeMap = () => {
      if (!window.kakao?.maps || !mapRef.current) {
        setMapStatus('error');
        return;
      }

      const defaultPosition = new window.kakao.maps.LatLng(37.54474, 127.0557);
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: defaultPosition,
        level: 4
      });

      const marker = new window.kakao.maps.Marker({
        position: defaultPosition
      });

      marker.setMap(map);

      window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
        const latlng = mouseEvent.latLng;

        marker.setPosition(latlng);
        setSelectedMapInfo({
          title: '선택한 퀘스트 위치',
          address: `위도 ${latlng.getLat().toFixed(5)}, 경도 ${latlng.getLng().toFixed(5)}`,
          summary: '해당 좌표 기준으로 퀘스트 상세 모달이 열리도록 연결할 수 있습니다.'
        });
        setShowMapDetailModal(true);
      });

      kakaoMapRef.current = map;
      kakaoMarkerRef.current = marker;
      setMapStatus('ready');
    };

    if (window.kakao?.maps) {
      window.kakao.maps.load(initializeMap);
      return;
    }

    setMapStatus('loading');

    const existingScript = document.querySelector(
      'script[data-kakao-map-sdk="true"]'
    );

    if (existingScript) {
      existingScript.addEventListener('load', initializeMap);
      return () => {
        existingScript.removeEventListener('load', initializeMap);
      };
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`;
    script.async = true;
    script.setAttribute('data-kakao-map-sdk', 'true');
    script.addEventListener('load', () => {
      window.kakao.maps.load(initializeMap);
    });
    script.addEventListener('error', () => {
      setMapStatus('error');
    });
    document.head.appendChild(script);

    return () => {
      script.removeEventListener('error', () => {
        setMapStatus('error');
      });
    };
  }, [hasLocationConsent, kakaoMapKey]);

  const handleMapClick = () => {
    if (!mockLoginUser.isLoggedIn) {
      window.alert('지도 기반 기능은 로그인 후 이용할 수 있습니다.');
      return;
    }

    if (!hasLocationConsent) {
      setShowConsentModal(true);
      return;
    }

    if (mapStatus !== 'ready') {
      window.alert('지도를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleConsentApprove = () => {
    setHasLocationConsent(true);
    setShowConsentModal(false);
  };

  return (
    <div className="main-page">
      <section className="hero-map-section">
        <div className="section-heading">
          <span className="section-badge">LOCAL MAP</span>
          <h1>지도로 지역 퀘스트를 발견해보세요</h1>
          <p>카카오지도 API가 연결되면 실제 위치 기반 퀘스트 탐색이 가능한 메인 영역입니다.</p>
        </div>

        <div
          className={`map-shell ${hasLocationConsent ? 'is-consented' : ''}`}
          onClick={!hasLocationConsent ? handleMapClick : undefined}
          role={!hasLocationConsent ? 'button' : undefined}
          tabIndex={!hasLocationConsent ? 0 : undefined}
          onKeyDown={
            !hasLocationConsent
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleMapClick();
                  }
                }
              : undefined
          }
        >
          {hasLocationConsent ? (
            <>
              <div ref={mapRef} className="map-canvas" />
              {mapStatus === 'loading' && (
                <div className="map-overlay-message">카카오지도를 불러오는 중입니다.</div>
              )}
              {mapStatus === 'missing-key' && (
                <div className="map-overlay-message">
                  `REACT_APP_KAKAO_MAP_KEY` 환경변수를 넣으면 실제 지도가 표시됩니다.
                </div>
              )}
              {mapStatus === 'error' && (
                <div className="map-overlay-message">
                  지도 로드 중 문제가 발생했습니다. 앱키와 네트워크 상태를 확인해주세요.
                </div>
              )}
            </>
          ) : (
            <button type="button" className="map-placeholder" onClick={handleMapClick}>
              <strong>지도 영역</strong>
              <span>카카오지도 API 연결 예정</span>
              <span>로그인 사용자는 위치기반서비스 동의 후 지도 기능을 사용할 수 있습니다.</span>
            </button>
          )}
        </div>
      </section>

      <section className="hot-quest-section">
        <div className="section-heading">
          <span className="section-badge">HOT QUEST</span>
          <h2>지금 가장 핫한 지역 퀘스트</h2>
        </div>

        <div className="quest-card-grid">
          {hotQuestData.map((quest) => (
            <article className="quest-card" key={quest.id}>
              <span className="quest-region">{quest.region}</span>
              <h3>{quest.title}</h3>
              <p>{quest.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="partner-banner-section">
        <div className="partner-banner">
          <span className="section-badge">BUSINESS PARTNER</span>
          <h2>비즈니스 파트너 신청</h2>
          <p>지역 상권과 함께하는 파트너십으로 새로운 방문 경험을 만들어보세요.</p>
        </div>
      </section>

      {showConsentModal && (
        <div className="modal-overlay" onClick={() => setShowConsentModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>위치기반서비스 이용 동의</h3>
            <p>
              로그인한 회원이 지도 기반 퀘스트를 이용하려면 위치 정보 수집 및 이용에 대한
              동의가 필요합니다.
            </p>
            <div className="modal-action-row">
              <button
                type="button"
                className="modal-secondary-btn"
                onClick={() => setShowConsentModal(false)}
              >
                나중에
              </button>
              <button
                type="button"
                className="modal-primary-btn"
                onClick={handleConsentApprove}
              >
                동의하고 계속하기
              </button>
            </div>
          </div>
        </div>
      )}

      {showMapDetailModal && selectedMapInfo && (
        <div className="modal-overlay" onClick={() => setShowMapDetailModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedMapInfo.title}</h3>
            <p className="modal-map-address">{selectedMapInfo.address}</p>
            <p>{selectedMapInfo.summary}</p>
            <div className="modal-action-row">
              <button
                type="button"
                className="modal-primary-btn"
                onClick={() => setShowMapDetailModal(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
