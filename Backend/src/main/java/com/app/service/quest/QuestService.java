package com.app.service.quest;

import java.util.List;

import com.app.dto.quest.QuestDTO;
import com.app.dto.quest.QuestDetailDTO;

public interface QuestService {
    List<QuestDTO> getAllQuests();

    QuestDTO getQuestById(int questId);

    QuestDetailDTO getQuestDetailById(int questId);

    boolean registerQuest(QuestDTO quest);

    boolean modifyQuest(QuestDTO quest);

    boolean changeQuestStatus(int questId, String status);
}
