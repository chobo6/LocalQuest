package com.app.service.quest.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.quest.QuestDAO;
import com.app.dto.quest.QuestDTO;
import com.app.service.quest.QuestService;

@Service
public class QuestServiceImpl implements QuestService {

    @Autowired
    private QuestDAO dao;

    @Override
    public List<QuestDTO> getQuestList() {
        return dao.findAll();
    }

    @Override
    public QuestDTO getQuestById(int questId) {
        return dao.findById(questId);
    }

    @Override
    @Transactional
    public int saveQuest(QuestDTO quest) {
        return dao.saveQuest(quest);
    }
}
