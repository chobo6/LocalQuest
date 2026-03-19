package com.app.dto.quest;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class QuestDTO {
    private int questId;
    private String title;
    private String description;
    private String category;
    private int rewardExp;
    private int rewardPoint;
    private String status;
    private LocalDateTime createdAt;
}
