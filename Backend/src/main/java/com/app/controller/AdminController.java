package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.app.dto.quest.QuestDTO;
import com.app.dto.user.User;
import com.app.service.quest.QuestService;
import com.app.service.user.UserService;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
    private UserService userService;
	
	@Autowired
    private QuestService questService;

	// 관리자 메인 페이지
	@GetMapping("")
	public String admin() {
		return "admin/admin";
	}
	
	// 1. 회원 목록 조회 (정렬 및 검색 통합 권장)
	@GetMapping("/users")
	public String getUserList(
	        @RequestParam(value="sort", defaultValue="DESC") String sort,
	        @RequestParam(value="type", required=false) String type,
	        @RequestParam(value="keyword", required=false) String keyword,
	        Model model) {
	    
	    // Service에서 정렬과 검색을 동시에 처리하도록 넘깁니다.
	    List<User> userList = userService.searchUsers(type, keyword, sort);
	    model.addAttribute("userList", userList);
	    
	    return "admin/admin-user"; 
	}

	// 2. 회원 검색 (검색어와 정렬값을 함께 서비스로 전달)
	@GetMapping("/search")
	public String searchUsers(
	        @RequestParam("type") String type, 
	        @RequestParam("keyword") String keyword, 
	        @RequestParam(value="sort", defaultValue="DESC") String sort, // 정렬 파라미터 추가
	        Model model) {
	    
	    // [수정 핵심] 이제 서비스 메서드는 3개의 인자를 받습니다.
	    List<User> searchList = userService.searchUsers(type, keyword, sort);
	    
	    model.addAttribute("userList", searchList);
	    model.addAttribute("searchType", type);
	    model.addAttribute("keyword", keyword);
	    model.addAttribute("sort", sort);
	    
	    return "admin/admin-user";
	}
    
    // 회원정보 상태 변경(관리자, 비니지스, 사용자)
    @PostMapping("/users/updateRole")
    @ResponseBody
    public String updateRole(@RequestParam int userId, @RequestParam String role) {
        // 1. 마스터 관리자 보호 (백엔드 최종 방어)
        if (userId == 1) {
            return "fail";
        }
        
        try {
            // 2. 서비스 호출 결과를 변수에 담습니다.
            boolean isUpdated = userService.changeUserRole(userId, role);
            
            // 3. 실제 업데이트 성공 여부에 따라 응답
            return isUpdated ? "success" : "fail";
        } catch (Exception e) {
            e.printStackTrace(); // 에러 로그 확인용
            return "error";
        }
    }
    
    // 회원정보 상태변경
    @PostMapping("/users/updateStatus")
    @ResponseBody
    public String updateStatus(@RequestParam int userId, @RequestParam String status) {
        // 1. 마스터 관리자 보호 (백엔드 최종 방어)
        if (userId == 1) {
            return "fail";
        }
        
        try {
            // [수정 핵심] 서비스의 파라미터 형식(int, String)에 맞춰서 호출합니다.
            boolean isUpdated = userService.changeUserStatus(userId, status); 
            
            return isUpdated ? "success" : "fail";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
    
    // ================ Quest ================
    
    /**
     * 1. 퀘스트 관리 메인 페이지 (전체 목록 조회)
     */
    @GetMapping("/quests")
    public String questList(Model model) {
        List<QuestDTO> questList = questService.getAllQuests();
        model.addAttribute("questList", questList);
        
        // admin/admin-quest.jsp로 이동
        return "admin/admin-quest";
    }

    /**
     * 2. 퀘스트 상태 변경 (비동기 처리)
     * @param questId 변경할 퀘스트 번호
     * @param status 변경할 상태 ('ACTIVE', 'INACTIVE', 'DELETED')
     */
    @PostMapping("/quests/updateStatus")
    @ResponseBody
    public String updateQuestStatus(@RequestParam int questId, @RequestParam String status) {
        try {
            boolean isUpdated = questService.changeQuestStatus(questId, status);
            return isUpdated ? "success" : "fail";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    // 3. 퀘스트 등록 (관리자용)
    @PostMapping("/quests/register")
    @ResponseBody
    public String registerQuest(QuestDTO quest) { 
        try {
            // 데이터가 잘 넘어오는지 서버 콘솔에서 확인 (디버깅용)
            System.out.println(">>> 퀘스트 등록 요청 데이터: " + quest);
            
            // 필수값이 비어있는지 간단 체크 (서버 측 검증)
            if (quest.getTitle() == null || quest.getTitle().trim().isEmpty()) {
                return "fail:title_empty";
            }

            boolean isRegistered = questService.registerQuest(quest);
            
            // 성공 시 반드시 "success"만 반환하도록 보장
            return isRegistered ? "success" : "fail";
            
        } catch (Exception e) {
            System.err.println("!!! 퀘스트 등록 중 에러 발생 !!!");
            e.printStackTrace();
            return "error";
        }
    }
    
}
