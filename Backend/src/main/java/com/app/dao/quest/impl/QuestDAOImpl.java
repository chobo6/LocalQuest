package com.app.dao.quest.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.quest.QuestDAO;
import com.app.dto.quest.QuestDTO;

@Repository
public class QuestDAOImpl implements QuestDAO {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public List<QuestDTO> findAll() {
        return sqlSessionTemplate.selectList("quest_mapper.findAll");
    }

    @Override
    public QuestDTO findById(int questId) {
        return sqlSessionTemplate.selectOne("quest_mapper.findById", questId);
    }

    @Override
    public int saveQuest(QuestDTO quest) {
        int result = sqlSessionTemplate.insert("quest_mapper.saveQuest", quest);
        return result;
    }
}
