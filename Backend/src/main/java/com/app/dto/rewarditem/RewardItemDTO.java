package com.app.dto.rewarditem;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RewardItemDTO {
    private int rewardItemId;
    private String name;
    private String description;
    private int pricePoint;
    private int stock;
    private String status;
    private LocalDateTime createdAt;
}
