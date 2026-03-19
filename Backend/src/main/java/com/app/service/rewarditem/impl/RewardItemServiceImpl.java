package com.app.service.rewarditem.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.rewarditem.RewardItemDAO;
import com.app.dto.rewarditem.RewardItemDTO;
import com.app.service.rewarditem.RewardItemService;

@Service
public class RewardItemServiceImpl implements RewardItemService {

    @Autowired
    private RewardItemDAO dao;

    @Override
    @Transactional
    public int saveRewardItem(RewardItemDTO rewardItem) {
        return dao.saveRewardItem(rewardItem);
    }
}
