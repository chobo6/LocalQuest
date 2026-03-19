import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import QuestCard from '../../../components/quest/QuestCard';
import { questApi } from '../../../api/QuestApi';
import './QuestList.css';

const toQuestCardModel = (quest) => ({
  id: quest.questId,
  title: quest.title,
  description: quest.description,
  category: quest.category,
  difficulty: quest.rewardExp >= 300 ? 'Hard' : quest.rewardExp >= 180 ? 'Normal' : 'Easy',
  location: 'Location info coming soon',
  duration: `${Math.max(30, Math.round(quest.rewardExp / 2))} min`,
  reward: `${quest.rewardPoint}P`,
  status: quest.status,
});

function QuestList() {
  const navigate = useNavigate();
  const [questList, setQuestList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestList = async () => {
      try {
        setLoading(true);
        const response = await questApi.getQuestList();
        setQuestList((response.data || []).map(toQuestCardModel));
      } catch (err) {
        setError('Failed to load quest list.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestList();
  }, []);

  const filterOptions = ['All', ...new Set(questList.map((quest) => quest.category))];
  const filteredQuestList =
    selectedFilter === 'All'
      ? questList
      : questList.filter((quest) => quest.category === selectedFilter);

  return (
    <div className="quest-list-page">
      <Header />

      <main className="quest-list-main">
        <section className="quest-list-hero">
          <div className="quest-list-hero-copy">
            <span className="quest-list-eyebrow">QUEST BOARD</span>
            <h1>Browse local quests available right now.</h1>
            <p>Each item is loaded from the backend JSON that matches the quest DTO shape.</p>
          </div>

          <div className="quest-list-summary-card">
            <strong>{filteredQuestList.length}</strong>
            <span>Available quests</span>
            <p>Filter by category and open a detail page backed by the same API contract.</p>
          </div>
        </section>

        <section className="quest-list-toolbar">
          <div>
            <h2>{selectedFilter === 'All' ? 'All Quests' : `${selectedFilter} Quests`}</h2>
            <p>Categories are generated from backend data.</p>
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
          {loading ? (
            <div className="quest-list-empty">
              <h3>Loading quests...</h3>
            </div>
          ) : error ? (
            <div className="quest-list-empty">
              <h3>{error}</h3>
            </div>
          ) : filteredQuestList.length > 0 ? (
            filteredQuestList.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onClick={() => navigate(`/quest/${quest.id}`)}
              />
            ))
          ) : (
            <div className="quest-list-empty">
              <h3>No quests found for this category.</h3>
              <p>Try another filter.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default QuestList;
