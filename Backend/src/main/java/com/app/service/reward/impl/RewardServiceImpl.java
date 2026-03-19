package com.app.service.reward.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.reward.RewardDAO;
import com.app.dto.reward.RewardBoxSummary;
import com.app.dto.reward.RewardWalletCoupon;
import com.app.service.reward.RewardService;

@Service
public class RewardServiceImpl implements RewardService {

	@Autowired
	private RewardDAO rewardDAO;

	@Override
	public RewardBoxSummary getRewardBoxSummary(String nickname) {
		RewardBoxSummary summary = rewardDAO.findRewardBoxSummary(nickname);
		if (summary == null) {
			return null;
		}

		int currentLevel = safeInt(summary.getCurrentLevel(), 1);
		int currentLevelMinExp = safeInt(summary.getCurrentLevelMinExp(), Math.max(0, (currentLevel - 1) * 500));
		int nextLevel = safeInt(summary.getNextLevel(), currentLevel + 1);
		int nextLevelMinExp = safeInt(summary.getNextLevelMinExp(), currentLevelMinExp + 500);
		int exp = Math.max(0, safeInt(summary.getExp(), 0));
		int point = Math.max(0, safeInt(summary.getPoint(), 0));

		if (nextLevelMinExp <= currentLevelMinExp) {
			nextLevelMinExp = currentLevelMinExp + 1;
		}

		int sectionExp = Math.max(1, nextLevelMinExp - currentLevelMinExp);
		int progressedExp = Math.max(0, exp - currentLevelMinExp);
		int progressPercent = clamp((int) Math.round((progressedExp * 100.0) / sectionExp), 0, 100);
		int nextLevelRemainXp = Math.max(nextLevelMinExp - exp, 0);

		summary.setCurrentLevel(currentLevel);
		summary.setCurrentLevelMinExp(currentLevelMinExp);
		summary.setNextLevel(nextLevel);
		summary.setNextLevelMinExp(nextLevelMinExp);
		summary.setExp(exp);
		summary.setPoint(point);
		summary.setProgressPercent(progressPercent);
		summary.setNextLevelRemainXp(nextLevelRemainXp);

		Integer nextGradeMinLevel = summary.getNextGradeMinLevel();
		if (nextGradeMinLevel == null) {
			summary.setRemainLevelToNextGrade(0);
		} else {
			summary.setRemainLevelToNextGrade(Math.max(nextGradeMinLevel - currentLevel, 0));
		}

		summary.setRoadmap(rewardDAO.findRewardRoadmap());
		return summary;
	}

	@Override
	public List<RewardWalletCoupon> getRewardWallet(String nickname) {
		if (nickname == null || nickname.trim().isEmpty()) {
			return Collections.emptyList();
		}

		List<RewardWalletCoupon> coupons = rewardDAO.findRewardWallet(nickname.trim());
		if (coupons == null || coupons.isEmpty()) {
			return Collections.emptyList();
		}

		for (RewardWalletCoupon coupon : coupons) {
			Integer daysLeft = coupon.getDaysLeft();
			if (daysLeft == null) {
				coupon.setExpire("만료일 미정");
				coupon.setUrgent(false);
				continue;
			}

			if (daysLeft <= 0) {
				coupon.setExpire("오늘 만료");
			} else {
				coupon.setExpire(daysLeft + "일 남음");
			}
			coupon.setUrgent(daysLeft <= 2);
		}

		return coupons;
	}

	private int safeInt(Integer value, int fallback) {
		return value == null ? fallback : value.intValue();
	}

	private int clamp(int value, int min, int max) {
		return Math.max(min, Math.min(max, value));
	}
}
