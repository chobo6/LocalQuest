package com.app.dao.questreview.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.questreview.QuestReviewDAO;
import com.app.dto.questreview.QuestReviewDTO;

@Repository
public class QuestReviewDAOImpl implements QuestReviewDAO {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public int saveQuestReview(QuestReviewDTO questReview) {
        int result = sqlSessionTemplate.insert("questreview_mapper.saveQuestReview", questReview);
        return result;
    }
}
