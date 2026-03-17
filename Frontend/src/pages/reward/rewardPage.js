import { useEffect, useMemo, useState } from "react";
import "./rewardPage.css";

const CURRENT_LEVEL = 12;
const TOTAL_XP = 8420;
const NEXT_LEVEL_PROGRESS = 72;
const NEXT_LEVEL_REMAIN_XP = 580;
const INITIAL_POINTS = 3200;

const INITIAL_WALLET = [
  {
    id: "w-1",
    emoji: "☕",
    name: "아메리카노 1,500원 할인",
    store: "푸른밤 카페",
    expire: "5일 남음",
    urgent: false,
  },
  {
    id: "w-2",
    emoji: "🍜",
    name: "사이드 메뉴 무료",
    store: "마루 국수 성수점",
    expire: "2일 남음",
    urgent: true,
  },
];

const SHOP_ITEMS = [
  {
    id: 1,
    theme: "rose",
    emoji: "☕",
    name: "아메리카노 1,500원 할인",
    store: "푸른밤 카페 성수점",
    expireText: "유효기간 구매일로부터 7일",
    price: 800,
    tags: ["cafe"],
  },
  {
    id: 2,
    theme: "orange",
    emoji: "🍜",
    name: "국물 떡볶이 사이드 무료",
    store: "마루 국수 성수점",
    expireText: "유효기간 구매일로부터 3일",
    price: 600,
    tags: ["food", "limited"],
    limited: {
      label: "🔥 한정 12개",
      remain: "9개 남음",
      stockPercent: 75,
    },
  },
  {
    id: 3,
    theme: "sky",
    emoji: "🧋",
    name: "버블티 음료 교환권",
    store: "성수 버블 라운지 전점",
    expireText: "유효기간 구매일로부터 14일",
    price: 3500,
    tags: ["cafe"],
    shortageHint: "퀘스트 3회 완료 시 구매 가능",
  },
  {
    id: 4,
    theme: "amber",
    emoji: "🎟️",
    name: "전 제휴 매장 5% 상시 할인",
    store: "로컬 퀘스트 전 파트너 매장",
    expireText: "30일 구독권",
    price: null,
    tags: ["cafe", "limited"],
    locked: {
      gradeLabel: "🚩 가이드 전용",
      requiredLevel: 16,
      unlockText: "Lv.16 가이드 달성 시 해금",
    },
  },
  {
    id: 5,
    theme: "emerald",
    emoji: "🍚",
    name: "한강뷰 국밥 공깃밥 무료",
    store: "여의도 한강뷰 국밥집",
    expireText: "유효기간 구매일로부터 14일",
    price: 1200,
    tags: ["food"],
    routeTag: "🏃 러닝 코스 인근",
  },
  {
    id: 6,
    theme: "purple",
    emoji: "👜",
    name: "시즌 1 리미티드 에코백",
    store: "로컬 퀘스트 공식 굿즈",
    expireText: "시즌 한정 · 30개 수량",
    price: null,
    tags: ["limited"],
    locked: {
      gradeLabel: "🎖️ 챌린저 전용",
      requiredLevel: 31,
      unlockText: "Lv.31 챌린저 달성 시 해금",
    },
  },
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

const CATEGORY_TABS = [
  { id: "all", label: "전체" },
  { id: "cafe", label: "☕ 카페" },
  { id: "food", label: "🍜 식당" },
  { id: "limited", label: "🔥 한정" },
];

function formatPoint(value) {
  return `${value.toLocaleString()} P`;
}

function getSortPrice(item) {
  if (typeof item.price === "number") {
    return item.price;
  }
  return Number.MAX_SAFE_INTEGER;
}

function RewardPage() {
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [wallet, setWallet] = useState(INITIAL_WALLET);
  const [category, setCategory] = useState("all");
  const [sortType, setSortType] = useState("default");
  const [pendingItem, setPendingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [xpAnimated, setXpAnimated] = useState(false);
  const [weeklyAnimated, setWeeklyAnimated] = useState(false);
  const [purchasedIds, setPurchasedIds] = useState([]);

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
    const filtered = SHOP_ITEMS.filter((item) => category === "all" || item.tags.includes(category));

    if (sortType === "low") {
      return [...filtered].sort((a, b) => getSortPrice(a) - getSortPrice(b));
    }
    if (sortType === "high") {
      return [...filtered].sort((a, b) => getSortPrice(b) - getSortPrice(a));
    }

    return filtered;
  }, [category, sortType]);

  const canPurchase = (item) => {
    const isLocked = item.locked && CURRENT_LEVEL < item.locked.requiredLevel;
    const isPurchased = purchasedIds.includes(item.id);
    const hasPrice = typeof item.price === "number";
    return !isLocked && !isPurchased && hasPrice && points >= item.price;
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
    if (!pendingItem || typeof pendingItem.price !== "number") return;

    setPoints((prev) => prev - pendingItem.price);
    setPurchasedIds((prev) => (prev.includes(pendingItem.id) ? prev : [...prev, pendingItem.id]));
    setWallet((prev) => [
      ...prev,
      {
        id: `w-${Date.now()}-${pendingItem.id}`,
        emoji: pendingItem.emoji,
        name: pendingItem.name,
        store: pendingItem.store,
        expire: "7일 남음",
        urgent: false,
      },
    ]);

    showToastMessage(`🎉 ${pendingItem.name} 쿠폰이 보관함에 추가됐어요!`);
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
                <p>누적 XP</p>
              </div>

              <div className="reward-level-summary-row">
                <div className="reward-level-summary-left">
                  <strong className="reward-level-number">LV.{CURRENT_LEVEL}</strong>
                  <span className="reward-grade-pill reward-grade-walker">🚶 워커</span>
                </div>
                <strong className="reward-total-xp">{TOTAL_XP.toLocaleString()}</strong>
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

                      <div className={`reward-ticket-side ${coupon.urgent ? "reward-is-urgent" : ""}`}>{coupon.emoji}</div>

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
                  <p>🎟️</p>
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
              <div className="reward-point-chip">
                <span aria-hidden="true">💰</span>
                <strong>{points.toLocaleString()}</strong>
                <small>P 보유</small>
              </div>
            </div>

            <div className="reward-shop-controls">
              <div className="reward-tab-list" role="tablist" aria-label="쿠폰 카테고리">
                {CATEGORY_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={category === tab.id}
                    className={`reward-tab-button ${category === tab.id ? "reward-is-active" : ""}`}
                    onClick={() => setCategory(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <label className="reward-select-wrap">
                <span className="reward-sr-only">정렬 기준</span>
                <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
                  <option value="default">추천순</option>
                  <option value="low">낮은 포인트</option>
                  <option value="high">높은 포인트</option>
                </select>
              </label>
            </div>
          </div>

          {visibleItems.length > 0 ? (
            <div className="reward-shop-grid">
              {visibleItems.map((item) => {
                const isLocked = item.locked && CURRENT_LEVEL < item.locked.requiredLevel;
                const isPurchased = purchasedIds.includes(item.id);
                const shortage = typeof item.price === "number" ? item.price - points : 0;
                const canBuy = canPurchase(item);

                return (
                  <article
                    key={item.id}
                    className={`reward-shop-card reward-shop-card-theme-${item.theme} ${
                      isLocked ? "reward-is-locked" : ""
                    }`}
                  >
                    <div className="reward-shop-stripe" />

                    <div className="reward-shop-card-body">
                      {item.limited ? <span className="reward-limited-badge">{item.limited.label}</span> : null}

                      <div className="reward-shop-card-top">
                        <div className="reward-shop-icon-wrap">{item.emoji}</div>
                        <div className="reward-shop-price-wrap">
                          {typeof item.price === "number" ? (
                            <>
                              <strong>{formatPoint(item.price)}</strong>
                              <p>보유 {formatPoint(points)}</p>
                            </>
                          ) : (
                            <span className="reward-grade-lock-chip">{item.locked?.gradeLabel}</span>
                          )}
                        </div>
                      </div>

                      <h3>{item.name}</h3>
                      <p className="reward-shop-store">{item.store}</p>
                      <p className="reward-shop-expire">{item.expireText}</p>

                      {item.limited ? (
                        <div className="reward-stock-wrap">
                          <div className="reward-stock-bar">
                            <div className="reward-stock-fill" style={{ width: `${item.limited.stockPercent}%` }} />
                          </div>
                          <p>{item.limited.remain}</p>
                        </div>
                      ) : null}

                      {item.shortageHint && shortage > 0 ? (
                        <div className="reward-shortage-hint">⚡ {item.shortageHint}</div>
                      ) : null}

                      {item.routeTag ? <span className="reward-route-tag">{item.routeTag}</span> : null}

                      <button
                        type="button"
                        className={`reward-buy-button ${
                          isPurchased ? "reward-is-complete" : !canBuy ? "reward-is-disabled" : ""
                        }`}
                        onClick={() => openPurchaseModal(item)}
                        disabled={!canBuy}
                      >
                        {isPurchased
                          ? "✓ 구매 완료"
                          : typeof item.price !== "number"
                            ? "등급 잠금"
                            : shortage > 0
                              ? `${shortage.toLocaleString()}P 부족`
                              : `${item.price.toLocaleString()}P로 구매하기`}
                      </button>
                    </div>

                    {isLocked ? (
                      <div className="reward-lock-overlay">
                        <p>🔒</p>
                        <strong>{item.locked?.unlockText}</strong>
                        <span>현재 Lv.{CURRENT_LEVEL} → {item.locked.requiredLevel - CURRENT_LEVEL}레벨 남음</span>
                      </div>
                    ) : null}
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
          <div className="reward-modal-head">
            <div className="reward-modal-emoji">{pendingItem?.emoji ?? "☕"}</div>
            <h3>{pendingItem?.name ?? ""}</h3>
            <p>{pendingItem?.store ?? ""}</p>
          </div>

          <div className="reward-modal-summary">
            <div>
              <span>현재 보유 포인트</span>
              <strong>{formatPoint(points)}</strong>
            </div>
            <div>
              <span>차감 포인트</span>
              <strong className="reward-is-minus">
                {pendingItem?.price ? `- ${formatPoint(pendingItem.price)}` : "-"}
              </strong>
            </div>
            <div className="reward-is-total">
              <span>구매 후 잔액</span>
              <strong>
                {pendingItem?.price ? formatPoint(Math.max(points - pendingItem.price, 0)) : formatPoint(points)}
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