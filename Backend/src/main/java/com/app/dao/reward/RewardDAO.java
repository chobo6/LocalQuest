package com.app.dao.reward;

import java.util.List;

import com.app.dto.reward.RewardBoxSummary;
import com.app.dto.reward.RewardRoadmapItem;
import com.app.dto.reward.RewardWalletCoupon;

public interface RewardDAO {

	RewardBoxSummary findRewardBoxSummary(String nickname);

	List<RewardRoadmapItem> findRewardRoadmap();

	List<RewardWalletCoupon> findRewardWallet(String nickname);
}
