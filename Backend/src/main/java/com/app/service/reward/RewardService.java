package com.app.service.reward;

import java.util.List;

import com.app.dto.reward.RewardBoxSummary;
import com.app.dto.reward.RewardWalletCoupon;

public interface RewardService {

	RewardBoxSummary getRewardBoxSummary(String nickname);

	List<RewardWalletCoupon> getRewardWallet(String nickname);
}
