package com.app.service.userquest.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.userquest.UserQuestDAO;
import com.app.dto.userquest.UserQuestDTO;
import com.app.service.userquest.UserQuestService;

@Service
public class UserQuestServiceImpl implements UserQuestService {

    @Autowired
    private UserQuestDAO dao;

    @Override
    @Transactional
    public int saveUserQuest(UserQuestDTO userQuest) {
        return dao.saveUserQuest(userQuest);
    }
}
