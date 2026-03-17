import { useEffect, useMemo, useState } from "react";
import "./rewardPage.css";

const CURRENT_LEVEL = 12;
const NEXT_LEVEL_PROGRESS = 72;
const NEXT_LEVEL_REMAIN_XP = 580;
const INITIAL_POINTS = 3200;

const INITIAL_WALLET = [
  {
    id: "w-1",
    name: "아메리카노 1,500원 할인",
    store: "푸른밤 카페",
    expire: "5일 남음",
    urgent: false,
  },
  {
    id: "w-2",
    name: "사이드 메뉴 무료",
    store: "마루 국수 성수점",
    expire: "2일 남음",
    urgent: true,
  },
];

// LQ_REWARD_ITEM 테이블 형태의 더미 데이터
const LQ_REWARD_ITEM_MOCK = [
  {
    REWARD_ITEM_ID: 1,
    NAME: "제휴 카페 아메리카노 교환권",
    DESCRIPTION: "제휴 카페에서 즉시 사용할 수 있는 아메리카노 1잔 교환권",
    PRICE_POINT: 1200,
    STOCK: 95,
    STATUS: "ON_SALE",
    CREATED_AT: "2026-03-12",
  },
  {
    REWARD_ITEM_ID: 2,
    NAME: "편의점 모바일 금액권 1,000원",
    DESCRIPTION: "전국 편의점에서 바로 사용하는 모바일 금액권",
    PRICE_POINT: 900,
    STOCK: 130,
    STATUS: "ON_SALE",
    CREATED_AT: "2026-03-14",
  },
  {
    REWARD_ITEM_ID: 3,
    NAME: "로컬 식당 사이드 메뉴 무료 쿠폰",
    DESCRIPTION: "제휴 로컬 식당 방문 시 사이드 메뉴 1종 무료 제공",
    PRICE_POINT: 1500,
    STOCK: 35,
    STATUS: "ON_SALE",
    CREATED_AT: "2026-03-13",
  },
  {
    REWARD_ITEM_ID: 4,
    NAME: "지역 편집샵/독립서점 할인권",
    DESCRIPTION: "천안 지역 편집샵 및 독립서점에서 사용 가능한 10% 할인권",
    PRICE_POINT: 2000,
    STOCK: 0,
    STATUS: "SOLD_OUT",
    CREATED_AT: "2026-03-10",
  },
  {
    REWARD_ITEM_ID: 5,
    NAME: "경험치 2배 부스터 (1시간)",
    DESCRIPTION: "사용 후 1시간 동안 퀘스트 완료 XP 2배 적용",
    PRICE_POINT: 1800,
    STOCK: 60,
    STATUS: "ON_SALE",
    CREATED_AT: "2026-03-15",
  },
  {
    REWARD_ITEM_ID: 6,
    NAME: "한정판 프로필 뱃지",
    DESCRIPTION: "시즌 한정 커스텀 프로필 뱃지 지급",
    PRICE_POINT: 2500,
    STOCK: 20,
    STATUS: "ON_SALE",
    CREATED_AT: "2026-03-11",
  },
];

const STATUS_TABS = [
  { id: "ALL", label: "전체" },
  { id: "ON_SALE", label: "판매중" },
  { id: "SOLD_OUT", label: "품절" },
];

const RANKING_TOP3 = [
  { rank: 1, icon: "🦁", name: "서울숲사자", xp: "12,450 XP", level: "LV.28" },
  { rank: 2, icon: "☕", name: "에소빌런", xp: "11,200 XP", level: "LV.24" },
  { rank: 3, icon: "🏃", name: "러닝크루장", xp: "9,800 XP", level: "LV.21" },
];

const MY_RANK = { rank: 42, icon: "🏃", name: "김철수 (나)", xp: "8,420 XP", level: "LV.12" };

const WEEKLY_STATS = {
  questDone: 5,
  gainXp: 620,
  usedCoupon: 3,
  topPercent: 12,
  weeklyProgress: 88,
};

function formatPoint(value) {
  return `${value.toLocaleString()} P`;
}

function getRewardTheme(rewardItemId) {
  const themes = ["rose", "orange", "sky", "emerald", "amber", "purple"];
  return themes[(rewardItemId - 1) % themes.length];
}

function isOnSaleItem(item) {
  return item.STATUS === "ON_SALE" && item.STOCK > 0;
}

function getStockPercent(stock) {
  return Math.min(100, Math.max(6, stock));
}

function RewardPage() {
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [wallet, setWallet] = useState(INITIAL_WALLET);
  const [rewardItems, setRewardItems] = useState(LQ_REWARD_ITEM_MOCK);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortType, setSortType] = useState("latest");
  const [pendingItem, setPendingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [xpAnimated, setXpAnimated] = useState(false);
  const [weeklyAnimated, setWeeklyAnimated] = useState(false);

  useEffect(() => {
    const xpTimer = window.setTimeout(() => setXpAnimated(true), 400);
    const weeklyTimer = window.setTimeout(() => setWeeklyAnimated(true), 450);
    return () => {
      window.clearTimeout(xpTimer);
      window.clearTimeout(weeklyTimer);
    };
  }, []);

  useEffect(() => {
    if (!showToast) return undefined;
    const timer = window.setTimeout(() => setShowToast(false), 3000);
    return () => window.clearTimeout(timer);
  }, [showToast]);

  const visibleItems = useMemo(() => {
    const filtered = rewardItems.filter((item) => {
      if (statusFilter === "ALL") {
        return item.STATUS !== "HIDDEN";
      }
      return item.STATUS === statusFilter;
    });

    if (sortType === "low") {
      return [...filtered].sort((a, b) => a.PRICE_POINT - b.PRICE_POINT);
    }
    if (sortType === "high") {
      return [...filtered].sort((a, b) => b.PRICE_POINT - a.PRICE_POINT);
    }

    return [...filtered].sort((a, b) => new Date(b.CREATED_AT) - new Date(a.CREATED_AT));
  }, [rewardItems, statusFilter, sortType]);

  const canPurchase = (item) => {
    return isOnSaleItem(item) && points >= item.PRICE_POINT;
  };

  const openPurchaseModal = (item) => {
    if (!canPurchase(item)) return;
    setPendingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPendingItem(null);
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const confirmPurchase = () => {
    if (!pendingItem) return;

    setPoints((prev) => prev - pendingItem.PRICE_POINT);
    setRewardItems((prev) =>
      prev.map((item) => {
        if (item.REWARD_ITEM_ID !== pendingItem.REWARD_ITEM_ID) {
          return item;
        }
        const nextStock = Math.max(item.STOCK - 1, 0);
        return {
          ...item,
          STOCK: nextStock,
          STATUS: nextStock > 0 ? "ON_SALE" : "SOLD_OUT",
        };
      }),
    );

    setWallet((prev) => [
      ...prev,
      {
        id: `w-${Date.now()}-${pendingItem.REWARD_ITEM_ID}`,
        name: pendingItem.NAME,
        store: "리워드 상점 교환",
        expire: "7일 남음",
        urgent: false,
      },
    ]);

    showToastMessage(`🎉 ${pendingItem.NAME} 교환이 완료됐어요!`);
    closeModal();
  };

  return (
    <div className="reward-page">
      <header className="reward-header">
        <div className="reward-header-inner">
          <div className="reward-brand-wrap">
            <div className="reward-brand-logo">📍</div>
            <span className="reward-brand-text">Local Quest</span>
          </div>

          <nav className="reward-nav" aria-label="상단 내비게이션">
            <button type="button" className="reward-nav-link">탐색 및 지도</button>
            <button type="button" className="reward-nav-link">내 퀘스트</button>
            <button type="button" className="reward-nav-link reward-is-active">성장 및 보상</button>
            <button type="button" className="reward-nav-link">마이페이지</button>
          </nav>

          <div className="reward-header-actions">
            <button type="button" className="reward-icon-button" aria-label="알림">
              🔔
              <span className="reward-dot" aria-hidden="true" />
            </button>
            <div className="reward-profile-mini" aria-hidden="true">🏃</div>
          </div>
        </div>
      </header>

      <main className="reward-main">
        <section className="reward-page-title-block">
          <h1 className="reward-page-title">성장 & 보상</h1>
          <p className="reward-page-subtitle">퀘스트를 완료하고 혜택을 받아보세요</p>
        </section>

        <section className="reward-top-grid">
          <div className="reward-left-column">
            <article className="reward-card reward-level-card">
              <div className="reward-level-label-row">
                <p>나의 등급</p>
                <p>보유 포인트</p>
              </div>

              <div className="reward-level-summary-row">
                <div className="reward-level-summary-left">
                  <strong className="reward-level-number">LV.{CURRENT_LEVEL}</strong>
                  <span className="reward-grade-pill reward-grade-walker">🚶 워커</span>
                </div>
                <strong className="reward-total-xp">{points.toLocaleString()}P</strong>
              </div>

              <div>
                <div className="reward-level-progress-head">
                  <span>다음 레벨까지</span>
                  <span>{NEXT_LEVEL_REMAIN_XP.toLocaleString()} XP 남음</span>
                </div>
                <div className="reward-xp-bar">
                  <div className="reward-xp-fill" style={{ width: xpAnimated ? `${NEXT_LEVEL_PROGRESS}%` : "0%" }} />
                </div>
                <div className="reward-level-progress-foot">
                  <span>LV.12</span>
                  <span>{NEXT_LEVEL_PROGRESS}% 달성</span>
                  <span>LV.13</span>
                </div>
              </div>

              <div className="reward-roadmap-wrap">
                <p className="reward-roadmap-title">등급 로드맵</p>
                <div className="reward-roadmap-track">
                  <div className="reward-roadmap-node">
                    <div className="reward-roadmap-badge reward-is-done">✓</div>
                    <p>비기너</p>
                    <span>Lv.1~5</span>
                  </div>

                  <div className="reward-roadmap-line reward-is-done" />

                  <div className="reward-roadmap-node">
                    <div className="reward-roadmap-badge reward-is-current">🚶</div>
                    <p className="reward-is-current-text">워커 (현재)</p>
                    <span>Lv.6~15</span>
                  </div>

                  <div className="reward-roadmap-line" />

                  <div className="reward-roadmap-node reward-is-future">
                    <div className="reward-roadmap-badge">🚩</div>
                    <p>가이드</p>
                    <span>Lv.16~30</span>
                  </div>

                  <div className="reward-roadmap-line" />

                  <div className="reward-roadmap-node reward-is-future">
                    <div className="reward-roadmap-badge">🎖️</div>
                    <p>챌린저</p>
                    <span>Lv.31~50</span>
                  </div>

                  <div className="reward-roadmap-line" />

                  <div className="reward-roadmap-node reward-is-future reward-is-legend">
                    <div className="reward-roadmap-badge">👑</div>
                    <p>레전드</p>
                    <span>Lv.51+</span>
                  </div>
                </div>
              </div>

              <div className="reward-guide-benefit-box">
                <span className="reward-guide-benefit-emoji" aria-hidden="true">🚩</span>
                <div className="reward-guide-benefit-content">
                  <p>가이드 (Lv.16) 달성 시 혜택</p>
                  <strong>리워드 상점 <span>5% 상시 할인</span> 쿠폰 자동 지급</strong>
                </div>
                <div className="reward-guide-benefit-count">
                  <p>남은 레벨</p>
                  <strong>4</strong>
                </div>
              </div>
            </article>

            <article className="reward-card reward-wallet-card">
              <div className="reward-wallet-head">
                <h2>내 쿠폰 보관함</h2>
                <span>{wallet.length}개 보유</span>
              </div>

              {wallet.length > 0 ? (
                <div className="reward-wallet-grid">
                  {wallet.map((coupon) => (
                    <article key={coupon.id} className="reward-ticket">
                      <span className="reward-ticket-notch reward-is-top" aria-hidden="true" />
                      <span className="reward-ticket-notch reward-is-bottom" aria-hidden="true" />

                      <div className={`reward-ticket-side ${coupon.urgent ? "reward-is-urgent" : ""}`}>쿠폰</div>

                      <div className="reward-ticket-content">
                        <div className="reward-ticket-title-row">
                          <h3>{coupon.name}</h3>
                          <span className={coupon.urgent ? "reward-is-urgent" : ""}>{coupon.expire}</span>
                        </div>
                        <p>{coupon.store}</p>
                        <button type="button" className="reward-ticket-use-button">바로 사용</button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="reward-wallet-empty">
                  <div className="reward-wallet-empty-label">쿠폰함</div>
                  <strong>보유한 쿠폰이 없어요</strong>
                  <span>상점에서 구매해보세요</span>
                </div>
              )}
            </article>
          </div>

          <div className="reward-right-column">
            <article className="reward-card reward-weekly-card">
              <p className="reward-weekly-title">이번 주 활동</p>
              <div className="reward-weekly-grid">
                <div>
                  <strong>{WEEKLY_STATS.questDone}</strong>
                  <p>퀘스트 완료</p>
                </div>
                <div className="reward-is-center">
                  <strong className="reward-is-primary">{WEEKLY_STATS.gainXp}</strong>
                  <p>획득 XP</p>
                </div>
                <div>
                  <strong>{WEEKLY_STATS.usedCoupon}</strong>
                  <p>사용 쿠폰</p>
                </div>
              </div>

              <div>
                <p className="reward-weekly-caption">
                  상위 <span>{WEEKLY_STATS.topPercent}%</span> 탐험가입니다 🎉
                </p>
                <div className="reward-xp-bar">
                  <div
                    className="reward-weekly-fill"
                    style={{ width: weeklyAnimated ? `${WEEKLY_STATS.weeklyProgress}%` : "0%" }}
                  />
                </div>
                <p className="reward-weekly-foot">주간 목표 {WEEKLY_STATS.weeklyProgress}% 달성</p>
              </div>
            </article>

            <article className="reward-card reward-rank-card">
              <div className="reward-rank-head">
                <h2>실시간 랭킹</h2>
                <span>이번 주</span>
              </div>

              <div className="reward-rank-list">
                {RANKING_TOP3.map((row) => (
                  <div key={row.rank} className="reward-rank-row">
                    <span className={`reward-rank-num reward-rank-${row.rank}`}>{row.rank}</span>
                    <span className="reward-rank-avatar" aria-hidden="true">{row.icon}</span>
                    <div className="reward-rank-user">
                      <strong>{row.name}</strong>
                      <p>{row.xp}</p>
                    </div>
                    <span className="reward-rank-level">{row.level}</span>
                  </div>
                ))}

                <div className="reward-rank-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>

                <div className="reward-rank-row reward-is-me">
                  <span className="reward-rank-num reward-is-me">{MY_RANK.rank}</span>
                  <span className="reward-rank-avatar" aria-hidden="true">{MY_RANK.icon}</span>
                  <div className="reward-rank-user">
                    <strong>{MY_RANK.name}</strong>
                    <p>{MY_RANK.xp}</p>
                  </div>
                  <span className="reward-rank-level">{MY_RANK.level}</span>
                </div>
              </div>

              <button type="button" className="reward-rank-link">전체 랭킹 보기 →</button>
            </article>
          </div>
        </section>

        <section className="reward-shop-section">
          <div className="reward-shop-head">
            <div className="reward-shop-title-wrap">
              <h2>쿠폰 상점</h2>
            </div>

            <div className="reward-shop-controls">
              <div className="reward-tab-list" role="tablist" aria-label="리워드 상태 필터">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={statusFilter === tab.id}
                    className={`reward-tab-button ${statusFilter === tab.id ? "reward-is-active" : ""}`}
                    onClick={() => setStatusFilter(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <label className="reward-select-wrap">
                <span className="reward-sr-only">정렬 기준</span>
                <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                  <option value="latest">최신 등록순</option>
                  <option value="low">낮은 포인트</option>
                  <option value="high">높은 포인트</option>
                </select>
              </label>
            </div>
          </div>

          {visibleItems.length > 0 ? (
            <div className="reward-shop-grid">
              {visibleItems.map((item) => {
                const shortage = item.PRICE_POINT - points;
                const canBuy = canPurchase(item);
                const stockPercent = getStockPercent(item.STOCK);
                const itemTheme = getRewardTheme(item.REWARD_ITEM_ID);

                return (
                  <article
                    key={item.REWARD_ITEM_ID}
                    className={`reward-shop-card reward-shop-card-theme-${itemTheme} ${
                      item.STATUS !== "ON_SALE" ? "reward-is-locked" : ""
                    }`}
                  >
                    <div className="reward-shop-stripe" />

                    <div className="reward-shop-card-body">
                      {item.STATUS === "SOLD_OUT" ? <span className="reward-limited-badge">품절</span> : null}

                      <div className="reward-shop-card-top reward-is-single">
                        <div className="reward-shop-price-wrap">
                          <strong>{formatPoint(item.PRICE_POINT)}</strong>
                          <p>재고 {item.STOCK.toLocaleString()}개</p>
                        </div>
                      </div>

                      <h3>{item.NAME}</h3>
                      <p className="reward-shop-store">등록일 {item.CREATED_AT}</p>
                      <p className="reward-shop-expire">{item.DESCRIPTION || "상품 설명이 준비 중입니다."}</p>

                      <div className="reward-stock-wrap">
                        <div className="reward-stock-bar">
                          <div className="reward-stock-fill" style={{ width: `${stockPercent}%` }} />
                        </div>
                        <p>
                          {item.STATUS === "ON_SALE"
                            ? `판매중 · 재고 ${item.STOCK.toLocaleString()}개`
                            : item.STATUS === "SOLD_OUT"
                              ? "품절"
                              : "비공개"}
                        </p>
                      </div>

                      {shortage > 0 && item.STATUS === "ON_SALE" ? (
                        <div className="reward-shortage-hint">⚡ {shortage.toLocaleString()}P가 더 필요해요</div>
                      ) : null}

                      <button
                        type="button"
                        className={`reward-buy-button ${
                          !canBuy ? "reward-is-disabled" : ""
                        }`}
                        onClick={() => openPurchaseModal(item)}
                        disabled={!canBuy}
                      >
                        {item.STATUS === "HIDDEN"
                          ? "비공개 상품"
                          : item.STATUS === "SOLD_OUT" || item.STOCK <= 0
                            ? "품절"
                            : shortage > 0
                              ? `${shortage.toLocaleString()}P 부족`
                              : "교환하기"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="reward-empty-state">
              <p>🔍</p>
              <strong>해당 카테고리 쿠폰이 없어요</strong>
            </div>
          )}
        </section>
      </main>

      <div className={`reward-modal-overlay ${isModalOpen ? "reward-is-open" : ""}`} onClick={closeModal}>
        <section className="reward-modal-box" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
          <div className="reward-modal-head reward-no-emoji">
            <h3>{pendingItem?.NAME ?? ""}</h3>
            <p>{pendingItem ? `재고 ${pendingItem.STOCK.toLocaleString()}개` : ""}</p>
          </div>

          <div className="reward-modal-summary">
            <div>
              <span>현재 보유 포인트</span>
              <strong>{formatPoint(points)}</strong>
            </div>
            <div>
              <span>차감 포인트</span>
              <strong className="reward-is-minus">
                {pendingItem ? `- ${formatPoint(pendingItem.PRICE_POINT)}` : "-"}
              </strong>
            </div>
            <div className="reward-is-total">
              <span>구매 후 잔액</span>
              <strong>
                {pendingItem ? formatPoint(Math.max(points - pendingItem.PRICE_POINT, 0)) : formatPoint(points)}
              </strong>
            </div>
          </div>

          <p className="reward-modal-caption">구매한 쿠폰은 보관함에서 바로 사용 가능합니다</p>

          <div className="reward-modal-actions">
            <button type="button" className="reward-modal-button reward-is-cancel" onClick={closeModal}>취소</button>
            <button type="button" className="reward-modal-button reward-is-confirm" onClick={confirmPurchase}>구매 확정</button>
          </div>
        </section>
      </div>

      <div className={`reward-toast ${showToast ? "reward-is-show" : ""}`}>{toastMessage}</div>
    </div>
  );
}

export default RewardPage;
