package com.app.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.user.SignUpRequest;
import com.app.service.user.UserService;

@RestController
@RequestMapping("/api/users")
public class UserAPIController {
	@Autowired
	private UserService userService;
	
	@PostMapping("/signup")
	public ResponseEntity<?> signUp(@RequestBody SignUpRequest request) {
	    // 1. 유효성 검사 (예: 비밀번호 일치 여부)
	    if (!request.getPassword().equals(request.getConfirmPassword())) {
	        return ResponseEntity.badRequest().body("비밀번호가 일치하지 않습니다.");
	    }

	    userService.signUp(request);
	    return ResponseEntity.ok("회원가입 성공");
	}
}
