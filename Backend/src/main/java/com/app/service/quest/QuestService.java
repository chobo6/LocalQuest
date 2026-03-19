package com.app.service.quest;

import java.util.List;

import com.app.dto.quest.QuestDTO;

public interface QuestService {
    public List<QuestDTO> getQuestList();
    public QuestDTO getQuestById(int questId);
    public int saveQuest(QuestDTO quest);
}
