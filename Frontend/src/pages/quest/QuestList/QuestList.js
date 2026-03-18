import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import QuestCard from '../../../components/quest/QuestCard';
import './QuestList.css';

const questList = [
  {
    id: 1,
    title: '성수 카페 스탬프 투어',
    description: '성수동의 감성 카페 3곳을 방문하고 각 공간의 대표 메뉴를 기록해보세요.',
    category: '탐방형',
    difficulty: 'Easy',
    location: '서울 성수동',
    duration: '약 1시간 30분',
    reward: '300P'
  },
  {
    id: 2,
    title: '광안리 야경 포토 챌린지',
    description: '광안대교가 보이는 포인트에서 미션 사진을 촬영하고 인증을 완료해보세요.',
    category: '인증형',
    difficulty: 'Normal',
    location: '부산 광안리',
    duration: '약 40분',
    reward: '450P'
  },
  {
    id: 3,
    title: '전주 한옥마을 로컬 미식 퀘스트',
    description: '전주 대표 먹거리 2가지를 맛보고 가장 인상 깊은 메뉴를 리뷰로 남겨보세요.',
    category: '미식형',
    difficulty: 'Normal',
    location: '전주 한옥마을',
    duration: '약 2시간',
    reward: '600P'
  },
  {
    id: 4,
    title: '제주 해안 산책 완주',
    description: '추천 해안 코스를 따라 걸으며 지정된 체크포인트를 모두 통과해보세요.',
    category: '액티비티',
    difficulty: 'Hard',
    location: '제주 애월',
    duration: '약 3시간',
    reward: '900P'
  },
  {
    id: 5,
    title: '대구 근대골목 이야기 수집',
    description: '근대골목 주요 스팟을 방문하고 현장 안내문에서 답을 찾아 퀴즈를 풀어보세요.',
    category: '스토리형',
    difficulty: 'Easy',
    location: '대구 중구',
    duration: '약 1시간',
    reward: '350P'
  },
  {
    id: 6,
    title: '강릉 바다열차 데이 미션',
    description: '바다열차 주변 명소를 돌며 지정된 키워드를 모아 오늘의 퀘스트를 완성해보세요.',
    category: '여행형',
    difficulty: 'Hard',
    location: '강릉 정동진',
    duration: '약 2시간 30분',
    reward: '800P'
  }
];

const filterOptions = ['전체', ...new Set(questList.map((quest) => quest.category))];

function QuestList() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('전체');

  const filteredQuestList =
    selectedFilter === '전체'
      ? questList
      : questList.filter((quest) => quest.category === selectedFilter);

  return (
    <div className="quest-list-page">
      <Header />

      <main className="quest-list-main">
        <section className="quest-list-hero">
          <div className="quest-list-hero-copy">
            <span className="quest-list-eyebrow">QUEST BOARD</span>
            <h1>지금 도전할 수 있는 로컬 퀘스트를 한눈에 확인해보세요.</h1>
            <p>
              지역을 탐험하고, 인증하고, 보상을 받는 미션형 콘텐츠를 한곳에 모았습니다.
            </p>
          </div>

          <div className="quest-list-summary-card">
            <strong>{filteredQuestList.length}</strong>
            <span>진행 가능한 퀘스트</span>
            <p>탐방형, 인증형, 미식형, 액티비티 등 다양한 미션을 둘러보세요.</p>
          </div>
        </section>

        <section className="quest-list-toolbar">
          <div>
            <h2>{selectedFilter === '전체' ? '전체 퀘스트' : `${selectedFilter} 퀘스트`}</h2>
            <p>데이터에 있는 카테고리를 기준으로 목록을 바로 필터링할 수 있어요.</p>
          </div>
          <div className="quest-list-filters">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                type="button"
                className={selectedFilter === filter ? 'active' : ''}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="quest-list-grid">
          {filteredQuestList.length > 0 ? (
            filteredQuestList.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onClick={() => navigate(`/quest/${quest.id}`)}
              />
            ))
          ) : (
            <div className="quest-list-empty">
              <h3>선택한 카테고리의 퀘스트가 아직 없어요.</h3>
              <p>다른 필터를 눌러서 더 많은 퀘스트를 확인해보세요.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default QuestList;
