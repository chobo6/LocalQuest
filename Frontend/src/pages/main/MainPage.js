import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './MainPage.css';

const LOCATION_CONSENT_KEY = 'localquest_location_consent';
const CHEONAN_CENTER = {
  lat: 36.81511,
  lng: 127.11389
};

const hotQuestData = [
  {
    id: 1,
    title: '천안 중앙시장 미식 퀘스트',
    region: '충남 천안',
    description: '중앙시장 먹거리 골목과 상점을 둘러보며 완료하는 미션형 탐험 퀘스트입니다.'
  },
  {
    id: 2,
    title: '불당동 카페거리 감성 퀘스트',
    region: '천안 불당동',
    description: '카페거리 분위기를 따라 이동하며 포인트를 모아가는 천안 로컬 퀘스트입니다.'
  },
  {
    id: 3,
    title: '독립기념관 역사 스탬프 퀘스트',
    region: '천안 목천읍',
    description: '천안 대표 역사 명소를 차례대로 둘러보며 수행하는 기록형 퀘스트입니다.'
  }
];

function MainPage() {
  const mapRef = useRef(null);
  const consentRef = useRef(false);
  const [hasLocationConsent, setHasLocationConsent] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem(LOCATION_CONSENT_KEY) === 'granted';
  });
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showMapDetailModal, setShowMapDetailModal] = useState(false);
  const [selectedMapInfo, setSelectedMapInfo] = useState(null);
  const [pendingMapInfo, setPendingMapInfo] = useState(null);
  const [mapStatus, setMapStatus] = useState('idle');
  const kakaoMapKey = process.env.REACT_APP_KAKAO_MAP_KEY;

  useEffect(() => {
    consentRef.current = hasLocationConsent;
  }, [hasLocationConsent]);

  useEffect(() => {
    if (!kakaoMapKey) {
      setMapStatus('missing-key');
      return undefined;
    }

    let isCancelled = false;

    const initializeMap = () => {
      if (isCancelled || !window.kakao?.maps?.LatLng || !mapRef.current) {
        if (!isCancelled) {
          setMapStatus('error');
        }
        return;
      }

      mapRef.current.innerHTML = '';

      const defaultPosition = new window.kakao.maps.LatLng(
        CHEONAN_CENTER.lat,
        CHEONAN_CENTER.lng
      );
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
        const nextMapInfo = {
          title: '천안 선택 위치',
          address: `위도 ${latlng.getLat().toFixed(5)}, 경도 ${latlng.getLng().toFixed(5)}`,
          summary: '선택한 위치를 기준으로 주변 퀘스트 정보를 연결할 수 있습니다.'
        };

        marker.setPosition(latlng);

        if (!consentRef.current) {
          setPendingMapInfo(nextMapInfo);
          setShowConsentModal(true);
          return;
        }

        setSelectedMapInfo(nextMapInfo);
        setShowMapDetailModal(true);
      });

      setMapStatus('ready');
    };

    const handleScriptError = () => {
      if (!isCancelled) {
        setMapStatus('error');
      }
    };

    const handleSdkReady = () => {
      if (isCancelled) {
        return;
      }

      if (window.kakao?.maps?.LatLng) {
        initializeMap();
        return;
      }

      if (window.kakao?.maps?.load) {
        window.kakao.maps.load(() => {
          if (!isCancelled) {
            initializeMap();
          }
        });
        return;
      }

      handleScriptError();
    };

    if (window.kakao?.maps?.LatLng) {
      initializeMap();
      return () => {
        isCancelled = true;
      };
    }

    if (window.kakao?.maps?.load) {
      window.kakao.maps.load(() => {
        if (!isCancelled) {
          initializeMap();
        }
      });
      return () => {
        isCancelled = true;
      };
    }

    setMapStatus('loading');

    const existingScript = document.querySelector('script[data-kakao-map-sdk="true"]');

    if (existingScript) {
      if (existingScript.getAttribute('data-loaded') === 'true') {
        handleSdkReady();
        return () => {
          isCancelled = true;
        };
      }

      existingScript.addEventListener('load', handleSdkReady);
      existingScript.addEventListener('error', handleScriptError);

      return () => {
        isCancelled = true;
        existingScript.removeEventListener('load', handleSdkReady);
        existingScript.removeEventListener('error', handleScriptError);
      };
    }

    const script = document.createElement('script');
    const handleScriptLoad = () => {
      script.setAttribute('data-loaded', 'true');
      handleSdkReady();
    };

    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&autoload=false`;
    script.async = true;
    script.setAttribute('data-kakao-map-sdk', 'true');
    script.addEventListener('load', handleScriptLoad);
    script.addEventListener('error', handleScriptError);
    document.head.appendChild(script);

    return () => {
      isCancelled = true;
      script.removeEventListener('load', handleScriptLoad);
      script.removeEventListener('error', handleScriptError);
    };
  }, [kakaoMapKey]);

  const handleConsentApprove = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LOCATION_CONSENT_KEY, 'granted');
    }

    setHasLocationConsent(true);
    consentRef.current = true;
    setShowConsentModal(false);

    if (pendingMapInfo) {
      setSelectedMapInfo(pendingMapInfo);
      setShowMapDetailModal(true);
      setPendingMapInfo(null);
    }
  };

  const handleConsentClose = () => {
    setShowConsentModal(false);
    setPendingMapInfo(null);
  };

  return (
    <div className="main-page-shell">
      <div className="main-page">
        <section className="hero-map-section">
          <div className="hero-copy">
            <span className="hero-chip">MISSION BASED O2O PLATFORM</span>
            <h1 className="hero-title">
              <span className="hero-title-line">지루한 일상을</span>
              <span className="hero-title-line accent">게임처럼 즐기는 시간</span>
            </h1>
            <p className="hero-description">
              단순한 방문은 이제 끝입니다. GPS와 QR 인증을 통해 천안 골목을 돌아다니며 퀘스트를 수행하고,
              그 결과를 쌓으면서 당신만의 탐험 지도를 완성해보세요.
            </p>
          </div>

          <div className="map-shell is-consented">
            <div ref={mapRef} className="map-canvas" />
            {mapStatus === 'loading' && (
              <div className="map-overlay-message">카카오 지도를 불러오는 중입니다.</div>
            )}
            {mapStatus === 'missing-key' && (
              <div className="map-overlay-message">
                <code>REACT_APP_KAKAO_MAP_KEY</code> 값이 없어 지도를 표시할 수 없습니다.
              </div>
            )}
            {mapStatus === 'error' && (
              <div className="map-overlay-message">
                지도를 불러오는 중 문제가 발생했습니다. 카카오 콘솔 설정과 키 값을 확인해주세요.
              </div>
            )}
          </div>
        </section>

        <section className="hot-quest-section">
          <div className="section-heading">
            <span className="section-badge">HOT QUEST</span>
            <h2>지금 가장 인기있는 천안 퀘스트</h2>
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
          <div className="partner-banner partner-banner-cta">
            <span className="section-badge">BUSINESS PARTNER</span>
            <h2>우리 매장을 퀘스트 명소로 만들고 싶으신가요?</h2>
            <p>
              Local Quest 파트너로 참여해 매장의 이야기를 홍보해보세요. 오프라인 방문과 마케팅 효과를 직접
              경험해보실 수 있습니다.
            </p>
            <Link to="/business" className="partner-cta-btn">
              비즈니스 상담 요청하기
            </Link>
          </div>
        </section>

        {showConsentModal && (
          <div className="modal-overlay" onClick={handleConsentClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <h3>위치기반서비스 이용 동의</h3>
              <p>
                천안 지역 퀘스트와 연결된 상세 위치를 확인하려면 위치기반서비스 이용 동의가 필요합니다.
              </p>
              <div className="modal-action-row">
                <button type="button" className="modal-secondary-btn" onClick={handleConsentClose}>
                  나중에
                </button>
                <button type="button" className="modal-primary-btn" onClick={handleConsentApprove}>
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
    </div>
  );
}

export default MainPage;
