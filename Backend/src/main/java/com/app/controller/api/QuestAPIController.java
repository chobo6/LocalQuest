package com.app.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.quest.QuestDTO;
import com.app.dto.quest.QuestDetailDTO;
import com.app.service.quest.QuestService;

@RestController
@RequestMapping("/api/quests")
public class QuestAPIController {

    @Autowired
    private QuestService questService;

    @GetMapping
    public ResponseEntity<List<QuestDTO>> getQuestList() {
        return ResponseEntity.ok(questService.getAllQuests());
    }

    @GetMapping("/{questId}")
    public ResponseEntity<?> getQuestDetail(@PathVariable int questId) {
        QuestDetailDTO quest = questService.getQuestDetailById(questId);
        if (quest == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(quest);
    }
}
