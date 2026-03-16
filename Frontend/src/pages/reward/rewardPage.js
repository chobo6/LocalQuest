import "./rewardPage.css";

const rewardItems = [
  {
    id: 1,
    icon: "☕",
    points: "1,000 P",
    title: "성수동 카페 3,000원 할인권",
    description: "성수 에스프레소 투어 제휴점 어디서나 사용 가능",
    canExchange: true,
  },
  {
    id: 2,
    icon: "🎟️",
    points: "2,500 P",
    title: "로컬 독립서점 도서 교환권",
    description: "종로/성수 지역 독립서점 추천 도서 1권",
    canExchange: true,
  },
  {
    id: 3,
    icon: "👜",
    points: "5,000 P",
    title: "Local Quest 리미티드 에코백",
    description: "시즌 1 탐험가 전용 한정판 에코백",
    canExchange: false,
  },
  {
    id: 4,
    icon: "🧁",
    points: "800 P",
    title: "제로웨이스트 샵 무료 디저트",
    description: "지정된 제로웨이스트 카페 무료 디저트 쿠폰",
    canExchange: true,
  },
];

const rewardRankList = [
  { rank: 1, icon: "🦉", name: "서울수사자", xp: "12,450", level: 28 },
  { rank: 2, icon: "☕", name: "에스빌런", xp: "11,200", level: 24 },
  { rank: 3, icon: "🏃", name: "러닝크루장", xp: "9,800", level: 21 },
];

function RewardPage() {
  return (
    <main className="reward-screen">
      <section className="reward-layout">
        <div className="reward-shop">
          <div className="reward-shop-header">
            <h1 className="reward-shop-title">리워드 상점</h1>
            <div className="reward-shop-filter">
              <button type="button" className="reward-shop-filter-button reward-shop-filter-button-active">
                전체
              </button>
              <button type="button" className="reward-shop-filter-button">
                쿠폰
              </button>
              <button type="button" className="reward-shop-filter-button">
                굿즈
              </button>
            </div>
          </div>

          <div className="reward-shop-grid">
            {rewardItems.map((item) => (
              <article key={item.id} className="reward-shop-card">
                <div className="reward-shop-card-header">
                  <span className="reward-shop-card-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="reward-shop-card-points">{item.points}</span>
                </div>
                <h2 className="reward-shop-card-title">{item.title}</h2>
                <p className="reward-shop-card-description">{item.description}</p>
                <button
                  type="button"
                  disabled={!item.canExchange}
                  className={`reward-shop-card-button ${
                    item.canExchange ? "" : "reward-shop-card-button-disabled"
                  }`}
                >
                  {item.canExchange ? "교환하기" : "포인트 부족"}
                </button>
              </article>
            ))}
          </div>
        </div>

        <aside className="reward-side">
          <section className="reward-growth-card">
            <p className="reward-growth-subtitle">나의 성장 기록</p>
            <div className="reward-growth-stats">
              <div className="reward-growth-stat">
                <strong className="reward-growth-value">LV.12</strong>
                <span className="reward-growth-label">레벨</span>
              </div>
              <div className="reward-growth-divider" />
              <div className="reward-growth-stat">
                <strong className="reward-growth-value">8,420</strong>
                <span className="reward-growth-label">누적 XP</span>
              </div>
            </div>
            <p className="reward-growth-note">
              상위 <span className="reward-growth-highlight">12%</span> 탐험가입니다!
              <br />
              조금만 더 힘내서 TOP 10에 진입하세요.
            </p>
          </section>

          <section className="reward-rank-card">
            <div className="reward-rank-header">
              <h2 className="reward-rank-title">실시간 리더보드</h2>
              <button type="button" className="reward-rank-range">
                이번 주 기준
              </button>
            </div>

            <ul className="reward-rank-list">
              {rewardRankList.map((member) => (
                <li key={member.rank} className="reward-rank-item">
                  <span className={`reward-rank-badge reward-rank-badge-${member.rank}`}>{member.rank}</span>
                  <span className="reward-rank-avatar" aria-hidden="true">
                    {member.icon}
                  </span>
                  <div className="reward-rank-profile">
                    <strong className="reward-rank-name">{member.name}</strong>
                    <span className="reward-rank-xp">{member.xp} XP</span>
                  </div>
                  <span className="reward-rank-level">LV.{member.level}</span>
                </li>
              ))}
            </ul>

            <div className="reward-rank-dots" aria-hidden="true">
              <span className="reward-rank-dot reward-rank-dot-active" />
              <span className="reward-rank-dot" />
              <span className="reward-rank-dot" />
            </div>

            <div className="reward-rank-me">
              <span className="reward-rank-me-badge">42</span>
              <span className="reward-rank-avatar" aria-hidden="true">
                🏃
              </span>
              <div className="reward-rank-profile">
                <strong className="reward-rank-name">김철수 (나)</strong>
                <span className="reward-rank-xp">8,420 XP</span>
              </div>
              <span className="reward-rank-level">LV.12</span>
            </div>

            <button type="button" className="reward-rank-link">
              전체 랭킹 보기
            </button>
          </section>
        </aside>
      </section>
    </main>
  );
}

export default RewardPage;
