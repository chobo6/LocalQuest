import React from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import './MyQuest.css';

const ongoingQuests = [
  {
    id: 1,
    title: '성수 카페 스탬프 투어',
    progress: 67,
    step: '3개 장소 중 2곳 방문 완료',
    reward: '300P',
    dueDate: '2026.03.25'
  },
  {
    id: 2,
    title: '광안리 야경 포토 챌린지',
    progress: 40,
    step: '야경 포인트 사진 1장 업로드 필요',
    reward: '450P',
    dueDate: '2026.03.22'
  }
];

const completedQuests = [
  {
    id: 3,
    title: '대구 근대골목 이야기 수집',
    completedAt: '2026.03.14',
    reward: '350P',
    badge: '스토리 탐험가'
  },
  {
    id: 4,
    title: '전주 한옥마을 로컬 미식 퀘스트',
    completedAt: '2026.03.10',
    reward: '600P',
    badge: '로컬 미식가'
  }
];

const recommendedQuests = [
  '이번 주 새로 열린 퀘스트 4개가 있어요.',
  '진행 중인 퀘스트 2개를 완료하면 추가 보상을 받을 수 있어요.',
  '이번 달 누적 보상은 1,700P입니다.'
];

function MyQuest() {
  return (
    <div className="my-quest-page">
      <Header />

      <main className="my-quest-main">
        <section className="my-quest-hero">
          <div className="my-quest-hero-copy">
            <span className="my-quest-eyebrow">MY QUEST</span>
            <h1>내가 진행 중인 퀘스트와 완료한 기록을 한 번에 관리해보세요.</h1>
            <p>현재 진행 상황과 보상, 완료 이력을 한 화면에서 확인할 수 있도록 구성했습니다.</p>
          </div>

          <div className="my-quest-stat-grid">
            <article>
              <strong>{ongoingQuests.length}</strong>
              <span>진행 중</span>
            </article>
            <article>
              <strong>{completedQuests.length}</strong>
              <span>완료</span>
            </article>
            <article>
              <strong>1,700P</strong>
              <span>이번 달 보상</span>
            </article>
          </div>
        </section>

        <section className="my-quest-content">
          <div className="my-quest-section">
            <div className="my-quest-section-heading">
              <h2>진행 중인 퀘스트</h2>
              <p>마감일 전에 완료해서 보상을 받아보세요.</p>
            </div>

            <div className="my-quest-card-list">
              {ongoingQuests.map((quest) => (
                <article key={quest.id} className="my-quest-card">
                  <div className="my-quest-card-top">
                    <h3>{quest.title}</h3>
                    <span className="my-quest-chip">진행 중</span>
                  </div>
                  <p>{quest.step}</p>
                  <div className="my-quest-progress">
                    <div className="my-quest-progress-bar">
                      <span style={{ width: `${quest.progress}%` }} />
                    </div>
                    <strong>{quest.progress}%</strong>
                  </div>
                  <div className="my-quest-card-meta">
                    <span>보상 {quest.reward}</span>
                    <span>마감 {quest.dueDate}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="my-quest-side-panel">
            <h2>요약</h2>
            <ul>
              {recommendedQuests.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="my-quest-history">
          <div className="my-quest-section-heading">
            <h2>완료한 퀘스트</h2>
            <p>최근 완료한 퀘스트 기록입니다.</p>
          </div>

          <div className="my-quest-history-list">
            {completedQuests.map((quest) => (
              <article key={quest.id} className="my-quest-history-item">
                <div>
                  <h3>{quest.title}</h3>
                  <p>{quest.completedAt} 완료</p>
                </div>
                <div className="my-quest-history-meta">
                  <span>{quest.badge}</span>
                  <strong>{quest.reward}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MyQuest;
