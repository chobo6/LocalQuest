package com.app.dao.userquest.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.userquest.UserQuestDAO;
import com.app.dto.userquest.UserQuestDTO;

@Repository
public class UserQuestDAOImpl implements UserQuestDAO {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public int saveUserQuest(UserQuestDTO userQuest) {
        int result = sqlSessionTemplate.insert("userquest_mapper.saveUserQuest", userQuest);
        return result;
    }
}
