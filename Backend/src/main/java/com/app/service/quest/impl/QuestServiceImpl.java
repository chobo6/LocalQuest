package com.app.service.quest.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.quest.QuestDAO;
import com.app.dto.quest.QuestDTO;
import com.app.service.quest.QuestService;

@Service
public class QuestServiceImpl implements QuestService{

	@Autowired
    private QuestDAO questDAO;

    @Override
    public List<QuestDTO> getAllQuests() {
        return questDAO.selectAllQuests();
    }

    @Override
    public QuestDTO getQuestById(int questId) {
        return questDAO.selectQuestById(questId);
    }

    @Override
    public boolean registerQuest(QuestDTO quest) {
        // 등록 성공 시 1이 반환되므로 비교 연산으로 결과 반환
        return questDAO.insertQuest(quest) == 1;
    }

    @Override
    public boolean changeQuestStatus(int questId, String status) {
        // DAO에 넘길 파라미터 조립 (Map 활용)
        Map<String, Object> params = new HashMap<>();
        params.put("questId", questId);
        params.put("status", status); // 'ACTIVE', 'INACTIVE', 'DELETED'
        
        return questDAO.updateQuestStatus(params) == 1;
    }
    
    @Override
    public boolean updateQuest(QuestDTO quest) {
        return questDAO.updateQuest(quest) > 0;
    }
}
