package com.app.dao.quest;

import java.util.List;
import java.util.Map;

import com.app.dto.quest.QuestDTO;

public interface QuestDAO {

	// 퀘스트 전체 목록 조회
    List<QuestDTO> selectAllQuests();
    
    // 특정 퀘스트 상세 조회
    QuestDTO selectQuestById(int questId);
    
    // 새 퀘스트 등록
    int insertQuest(QuestDTO quest);
    
    // 퀘스트 정보 수정
    int updateQuest(QuestDTO quest);
    
    // 퀘스트 상태 변경 (ACTIVE, INACTIVE, DELETED)
    int updateQuestStatus(Map<String, Object> params);
}
