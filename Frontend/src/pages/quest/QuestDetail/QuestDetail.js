import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import './QuestDetail.css';

const questMap = {
  1: {
    title: '성수 카페 스탬프 투어',
    category: '탐방형',
    difficulty: 'Easy',
    location: '서울 성수동',
    duration: '약 1시간 30분',
    reward: '300P',
    description: '성수동의 감성 카페 3곳을 방문하고 각 공간의 대표 메뉴를 기록해보세요.',
    steps: ['추천 카페 3곳 방문', '매장별 대표 메뉴 확인', '미션 인증 정보 제출']
  },
  2: {
    title: '광안리 야경 포토 챌린지',
    category: '인증형',
    difficulty: 'Normal',
    location: '부산 광안리',
    duration: '약 40분',
    reward: '450P',
    description: '광안대교가 보이는 포인트에서 미션 사진을 촬영하고 인증을 완료해보세요.',
    steps: ['포토 스팟 도착', '야경 사진 촬영', '인증 사진 업로드']
  },
  3: {
    title: '전주 한옥마을 로컬 미식 퀘스트',
    category: '미식형',
    difficulty: 'Normal',
    location: '전주 한옥마을',
    duration: '약 2시간',
    reward: '600P',
    description: '전주 대표 먹거리 2가지를 맛보고 가장 인상 깊은 메뉴를 리뷰로 남겨보세요.',
    steps: ['추천 먹거리 2종 체험', '사진 기록 남기기', '후기 작성']
  },
  4: {
    title: '제주 해안 산책 완주',
    category: '액티비티',
    difficulty: 'Hard',
    location: '제주 애월',
    duration: '약 3시간',
    reward: '900P',
    description: '추천 해안 코스를 따라 걸으며 지정된 체크포인트를 모두 통과해보세요.',
    steps: ['시작 지점 체크인', '중간 체크포인트 인증', '완주 인증 완료']
  },
  5: {
    title: '대구 근대골목 이야기 수집',
    category: '스토리형',
    difficulty: 'Easy',
    location: '대구 중구',
    duration: '약 1시간',
    reward: '350P',
    description: '근대골목 주요 스팟을 방문하고 현장 안내문에서 답을 찾아 퀴즈를 풀어보세요.',
    steps: ['주요 스팟 방문', '현장 퀴즈 풀이', '답안 제출']
  },
  6: {
    title: '강릉 바다열차 데이 미션',
    category: '여행형',
    difficulty: 'Hard',
    location: '강릉 정동진',
    duration: '약 2시간 30분',
    reward: '800P',
    description: '바다열차 주변 명소를 돌며 지정된 키워드를 모아 오늘의 퀘스트를 완성해보세요.',
    steps: ['정동진 도착', '주변 명소 키워드 수집', '퀘스트 완성 제출']
  }
};

function QuestDetail() {
  const navigate = useNavigate();
  const { questId } = useParams();
  const quest = questMap[questId];

  return (
    <div className="quest-detail-page">
      <Header />

      <main className="quest-detail-main">
        <button type="button" className="quest-detail-back" onClick={() => navigate('/explore')}>
          목록으로 돌아가기
        </button>

        {quest ? (
          <section className="quest-detail-card">
            <div className="quest-detail-head">
              <div>
                <span className="quest-detail-category">{quest.category}</span>
                <h1>{quest.title}</h1>
                <p>{quest.description}</p>
              </div>
              <div className="quest-detail-summary">
                <strong>{quest.reward}</strong>
                <span>보상</span>
              </div>
            </div>

            <div className="quest-detail-meta">
              <article>
                <span>난이도</span>
                <strong>{quest.difficulty}</strong>
              </article>
              <article>
                <span>지역</span>
                <strong>{quest.location}</strong>
              </article>
              <article>
                <span>예상 시간</span>
                <strong>{quest.duration}</strong>
              </article>
            </div>

            <div className="quest-detail-steps">
              <h2>진행 방법</h2>
              <ol>
                {quest.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </section>
        ) : (
          <section className="quest-detail-empty">
            <h1>퀘스트를 찾을 수 없습니다.</h1>
            <p>목록으로 돌아가서 다시 선택해주세요.</p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default QuestDetail;
