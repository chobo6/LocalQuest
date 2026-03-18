package com.app.controller.api;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.user.LoginRequest;
import com.app.dto.user.LoginResponse;
import com.app.dto.user.SignUpRequest;
import com.app.service.user.UserService;

@RestController
@RequestMapping("/api/users")
public class UserAPIController {
	@Autowired
	private UserService userService;

	@GetMapping("/check-id/{userId}")
	public ResponseEntity<?> checkId(@PathVariable String userId) {
		String validationMessage = userService.validateCheckIdRequest(userId);
		if (validationMessage != null) {
			return ResponseEntity.badRequest().body(Collections.singletonMap("message", validationMessage));
		}

		boolean available = userService.isUserIdAvailable(userId);
		return ResponseEntity.ok(Collections.singletonMap("available", available));
	}

	@GetMapping("/check-nickname")
	public ResponseEntity<?> checkNickname(@RequestParam String nickname) {
		String validationMessage = userService.validateCheckNicknameRequest(nickname);
		if (validationMessage != null) {
			return ResponseEntity.badRequest().body(Collections.singletonMap("message", validationMessage));
		}

		boolean available = userService.isNicknameAvailable(nickname);
		return ResponseEntity.ok(Collections.singletonMap("available", available));
	}

	@GetMapping("/check-email")
	public ResponseEntity<?> checkEmail(@RequestParam String email) {
		String validationMessage = userService.validateCheckEmailRequest(email);
		if (validationMessage != null) {
			return ResponseEntity.badRequest().body(Collections.singletonMap("message", validationMessage));
		}

		boolean available = userService.isEmailAvailable(email);
		return ResponseEntity.ok(Collections.singletonMap("available", available));
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> signUp(@RequestBody SignUpRequest request) {
		String validationMessage = userService.validateSignUpRequest(request);
		if (validationMessage != null) {
			return ResponseEntity.badRequest().body(validationMessage);
		}

	    if (!userService.isUserIdAvailable(request.getUserId())) {
	    	return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용 중인 아이디입니다.");
	    }

	    if (!userService.isNicknameAvailable(request.getNickname())) {
	    	return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용 중인 닉네임입니다.");
	    }

	    if (!userService.isEmailAvailable(request.getEmail())) {
	    	return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용 중인 이메일입니다.");
	    }

	    userService.signUp(request);
	    return ResponseEntity.ok("회원가입 성공");
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		String validationMessage = userService.validateLoginRequest(request);
		if (validationMessage != null) {
			return ResponseEntity.badRequest().body(validationMessage);
		}

		LoginResponse response = userService.login(request);
		if (response == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 올바르지 않습니다.");
		}

		return ResponseEntity.ok(response);
	}
}
