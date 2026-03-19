import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import { questApi } from '../../../api/QuestApi';
import './QuestDetail.css';

const toQuestDetailModel = (quest) => ({
  title: quest.title,
  category: quest.category,
  difficulty: quest.rewardExp >= 300 ? 'Hard' : quest.rewardExp >= 180 ? 'Normal' : 'Easy',
  location: 'Location info coming soon',
  duration: `${Math.max(30, Math.round(quest.rewardExp / 2))} min`,
  reward: `${quest.rewardPoint}P`,
  description: quest.description,
  steps: [
    `Visit a place in the ${quest.category} category`,
    'Complete the on-site mission or check-in',
    `Finish and receive ${quest.rewardPoint}P`,
  ],
});

function QuestDetail() {
  const navigate = useNavigate();
  const { questId } = useParams();
  const [quest, setQuest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestDetail = async () => {
      try {
        setLoading(true);
        const response = await questApi.getQuestDetail(questId);
        setQuest(toQuestDetailModel(response.data));
      } catch (err) {
        setError('Quest not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestDetail();
  }, [questId]);

  return (
    <div className="quest-detail-page">
      <Header />

      <main className="quest-detail-main">
        <button type="button" className="quest-detail-back" onClick={() => navigate('/explore')}>
          Back to list
        </button>

        {loading ? (
          <section className="quest-detail-empty">
            <h1>Loading quest...</h1>
          </section>
        ) : quest ? (
          <section className="quest-detail-card">
            <div className="quest-detail-head">
              <div>
                <span className="quest-detail-category">{quest.category}</span>
                <h1>{quest.title}</h1>
                <p>{quest.description}</p>
              </div>
              <div className="quest-detail-summary">
                <strong>{quest.reward}</strong>
                <span>Reward</span>
              </div>
            </div>

            <div className="quest-detail-meta">
              <article>
                <span>Difficulty</span>
                <strong>{quest.difficulty}</strong>
              </article>
              <article>
                <span>Location</span>
                <strong>{quest.location}</strong>
              </article>
              <article>
                <span>Expected time</span>
                <strong>{quest.duration}</strong>
              </article>
            </div>

            <div className="quest-detail-steps">
              <h2>How it works</h2>
              <ol>
                {quest.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </section>
        ) : (
          <section className="quest-detail-empty">
            <h1>{error || 'Quest not found.'}</h1>
            <p>Please go back and choose another quest.</p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default QuestDetail;
