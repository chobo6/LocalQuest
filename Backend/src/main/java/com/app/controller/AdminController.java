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

import com.app.dto.user.User;
import com.app.service.user.UserService;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
    private UserService userService;

	// 관리자 메인 페이지
	@GetMapping("")
	public String admin() {
		return "admin/admin";
	}
	
	// 2. 회원 목록 조회 (비동기로 이 부분만 요청함)
    @GetMapping("/users")
    public String getUserList(Model model) {
        List<User> userList = userService.getAllUsers();
        model.addAttribute("userList", userList);
        
        // 레이아웃 전체가 아닌 admin-user.jsp 조각만 리턴!
        return "admin/admin-user"; 
    }

    // 3. 회원 검색 (비동기 검색 결과)
    @GetMapping("/search")
    public String searchUsers(@RequestParam String type, @RequestParam String keyword, Model model) {
        List<User> searchList = userService.searchUsers(type, keyword);
        model.addAttribute("userList", searchList);
        
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
}
