package com.app.dao.quest;

import java.util.List;

import com.app.dto.quest.QuestDTO;

public interface QuestDAO {
    public List<QuestDTO> findAll();
    public QuestDTO findById(int questId);
    public int saveQuest(QuestDTO quest);
}
