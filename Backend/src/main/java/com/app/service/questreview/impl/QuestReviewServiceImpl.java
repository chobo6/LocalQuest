package com.app.service.questreview.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.questreview.QuestReviewDAO;
import com.app.dto.questreview.QuestReviewDTO;
import com.app.service.questreview.QuestReviewService;

@Service
public class QuestReviewServiceImpl implements QuestReviewService {

    @Autowired
    private QuestReviewDAO dao;

    @Override
    @Transactional
    public int saveQuestReview(QuestReviewDTO questReview) {
        return dao.saveQuestReview(questReview);
    }
}
