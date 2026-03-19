package com.app.dao.quest.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.quest.QuestDAO;
import com.app.dto.quest.QuestDTO;

@Repository
public class QuestDAOImpl implements QuestDAO{

	@Autowired
	SqlSessionTemplate sqlSessionTemplate;
	
	// 매퍼 파일의 namespace와 일치해야 합니다.
    private static final String NAMESPACE = "quest_mapper";

    @Override
    public List<QuestDTO> selectAllQuests() {
        return sqlSessionTemplate.selectList(NAMESPACE + ".selectAllQuests");
    }

    @Override
    public QuestDTO selectQuestById(int questId) {
        return sqlSessionTemplate.selectOne(NAMESPACE + ".selectQuestById", questId);
    }

    @Override
    public int insertQuest(QuestDTO quest) {
        return sqlSessionTemplate.insert(NAMESPACE + ".insertQuest", quest);
    }

    @Override
    public int updateQuest(QuestDTO quest) {
        return sqlSessionTemplate.update(NAMESPACE + ".updateQuest", quest);
    }

    @Override
    public int updateQuestStatus(Map<String, Object> params) {
        return sqlSessionTemplate.update(NAMESPACE + ".updateQuestStatus", params);
    }
    
    @Override
    public List<QuestDTO> selectSearchQuests(Map<String, Object> params) {
        return sqlSessionTemplate.selectList(NAMESPACE + ".selectSearchQuests", params);
    }
}
