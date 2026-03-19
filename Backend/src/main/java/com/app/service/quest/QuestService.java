package com.app.service.quest;

import java.util.List;
import java.util.Map;

import com.app.dto.quest.QuestDTO;

public interface QuestService {

	// 퀘스트 전체 목록 가져오기
    List<QuestDTO> getAllQuests();
    
    // 특정 퀘스트 정보 가져오기
    QuestDTO getQuestById(int questId);
    
    // 새로운 퀘스트 등록하기
    boolean registerQuest(QuestDTO quest);
    
    // 퀘스트 수정하기
    public boolean updateQuest(QuestDTO quest);
    
    // 퀘스트 상태 변경하기 (활성화/비활성화/삭제)
    boolean changeQuestStatus(int questId, String status);
    
    // 퀘스트 검색/필터
    public List<QuestDTO> getSearchQuests(Map<String, Object> params);
}
