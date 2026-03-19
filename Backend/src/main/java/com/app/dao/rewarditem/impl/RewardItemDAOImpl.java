package com.app.dao.rewarditem.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.rewarditem.RewardItemDAO;
import com.app.dto.rewarditem.RewardItemDTO;

@Repository
public class RewardItemDAOImpl implements RewardItemDAO {

    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    @Override
    public int saveRewardItem(RewardItemDTO rewardItem) {
        int result = sqlSessionTemplate.insert("rewarditem_mapper.saveRewardItem", rewardItem);
        return result;
    }
}
