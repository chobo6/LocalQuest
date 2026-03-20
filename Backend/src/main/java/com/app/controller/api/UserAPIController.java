package com.app.controller.api;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.app.dto.user.FindPasswordRequest;
import com.app.dto.user.FindUserIdRequest;
import com.app.dto.user.LoginRequest;
import com.app.dto.user.LoginResponse;
import com.app.dto.user.SignUpRequest;
import com.app.service.user.UserService;
import com.app.validator.UserValidator;

@RestController
@RequestMapping("/api/users")
public class UserAPIController {
	@Autowired
	private UserService userService;

	@Autowired
	private UserValidator userValidator;

	@GetMapping("/check-id/{userId}")
	public ResponseEntity<?> checkId(@PathVariable String userId) {
		String validationMessage = userValidator.validateCheckId(userId);
		if (validationMessage != null) {
			return ResponseEntity.badRequest().body(Collections.singletonMap("message", validationMessage));
		}

		boolean available = userService.isUserIdAvailable(userId);
		return ResponseEntity.ok(Collections.singletonMap("available", available));
	}

	@GetMapping("/check-nickname")
	public ResponseEntity<?> checkNickname(@RequestParam String nickname) {
		String validationMessage = userValidator.validateCheckNickname(nickname);
		if (validationMessage != null) {
			return ResponseEntity.badRequest().body(Collections.singletonMap("message", validationMessage));
		}

		boolean available = userService.isNicknameAvailable(nickname);
		return ResponseEntity.ok(Collections.singletonMap("available", available));
	}

	@GetMapping("/check-email")
	public ResponseEntity<?> checkEmail(@RequestParam String email) {
		String validationMessage = userValidator.validateCheckEmail(email);
		if (validationMessage != null) {
			return ResponseEntity.badRequest().body(Collections.singletonMap("message", validationMessage));
		}

		boolean available = userService.isEmailAvailable(email);
		return ResponseEntity.ok(Collections.singletonMap("available", available));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> signUp(@RequestBody SignUpRequest request) {
		String validationMessage = userValidator.validateSignUpRequest(request);
		if (validationMessage != null) {
			return ResponseEntity.badRequest().body(validationMessage);
		}

		try {
			userService.signUp(request);
			return ResponseEntity.ok("회원가입 성공");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		String validationMessage = userValidator.validateLoginFields(request);
		if (validationMessage != null) {
			return ResponseEntity.badRequest().body(validationMessage);
		}
		userValidator.normalizeLoginRequest(request);

		LoginResponse response = userService.login(request);
		if (response == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디 또는 비밀번호가 올바르지 않습니다.");
		}

		return ResponseEntity.ok(response);
	}

	@PostMapping("/find-id")
	public ResponseEntity<?> findId(@RequestBody FindUserIdRequest request) {
		String validationMessage = userValidator.validateFindUserIdRequest(request);
		if (validationMessage != null) {
			return ResponseEntity.badRequest().body(Collections.singletonMap("message", validationMessage));
		}
		userValidator.normalizeFindUserIdRequest(request);

		try {
			String userLoginId = userService.findUserLoginId(request);
			return ResponseEntity.ok(Collections.singletonMap("userLoginId", userLoginId));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(Collections.singletonMap("message", "아이디 찾기 처리 중 오류가 발생했습니다."));
		}
	}

	@PostMapping("/find-password")
	public ResponseEntity<?> findPassword(@RequestBody FindPasswordRequest request) {
		String validationMessage = userValidator.validateFindPasswordRequest(request);
		if (validationMessage != null) {
			return ResponseEntity.badRequest().body(Collections.singletonMap("message", validationMessage));
		}
		userValidator.normalizeFindPasswordRequest(request);

		try {
			userService.sendTemporaryPasswordByEmail(request);
			return ResponseEntity.ok(Collections.singletonMap("message", "입력한 이메일로 임시 비밀번호를 전송했습니다."));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", e.getMessage()));
		} catch (IllegalStateException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(Collections.singletonMap("message", e.getMessage()));
		}
	}

	@GetMapping("/oauth/{provider}/start")
	public ResponseEntity<?> startSocialLogin(@PathVariable String provider) {
		try {
			String authorizationUrl = userService.getSocialAuthorizationUrl(provider);
			HttpHeaders headers = new HttpHeaders();
			headers.add(HttpHeaders.LOCATION, authorizationUrl);
			return new ResponseEntity<>(headers, HttpStatus.FOUND);
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(Collections.singletonMap("message", e.getMessage()));
		} catch (IllegalStateException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(Collections.singletonMap("message", e.getMessage()));
		}
	}

	@GetMapping("/oauth/{provider}/callback")
	public ResponseEntity<?> socialLoginCallback(
		@PathVariable String provider,
		@RequestParam(required = false) String code,
		@RequestParam(required = false) String state,
		@RequestParam(required = false) String error
	) {
		String frontendRedirect = userService.getSocialFrontendRedirectUri();

		if (error != null && !error.trim().isEmpty()) {
			String redirectUrl = UriComponentsBuilder
				.fromUriString(frontendRedirect)
				.queryParam("error", "소셜 로그인 인증이 취소되었거나 실패했습니다.")
				.build()
				.encode()
				.toUriString();

			HttpHeaders headers = new HttpHeaders();
			headers.add(HttpHeaders.LOCATION, redirectUrl);
			return new ResponseEntity<>(headers, HttpStatus.FOUND);
		}

		if (code == null || code.trim().isEmpty()) {
			String redirectUrl = UriComponentsBuilder
				.fromUriString(frontendRedirect)
				.queryParam("error", "소셜 로그인 인가 코드가 누락되었습니다.")
				.build()
				.encode()
				.toUriString();

			HttpHeaders headers = new HttpHeaders();
			headers.add(HttpHeaders.LOCATION, redirectUrl);
			return new ResponseEntity<>(headers, HttpStatus.FOUND);
		}

		try {
			LoginResponse response = userService.loginWithSocialCode(provider, code, state);
			String redirectUrl = buildSocialSuccessRedirectUrl(frontendRedirect, response);

			HttpHeaders headers = new HttpHeaders();
			headers.add(HttpHeaders.LOCATION, redirectUrl);
			return new ResponseEntity<>(headers, HttpStatus.FOUND);
		} catch (IllegalArgumentException e) {
			String redirectUrl = UriComponentsBuilder
				.fromUriString(frontendRedirect)
				.queryParam("error", e.getMessage())
				.build()
				.encode()
				.toUriString();
			HttpHeaders headers = new HttpHeaders();
			headers.add(HttpHeaders.LOCATION, redirectUrl);
			return new ResponseEntity<>(headers, HttpStatus.FOUND);
		} catch (IllegalStateException e) {
			String redirectUrl = UriComponentsBuilder
				.fromUriString(frontendRedirect)
				.queryParam("error", e.getMessage())
				.build()
				.encode()
				.toUriString();
			HttpHeaders headers = new HttpHeaders();
			headers.add(HttpHeaders.LOCATION, redirectUrl);
			return new ResponseEntity<>(headers, HttpStatus.FOUND);
		}
	}

	private String buildSocialSuccessRedirectUrl(String frontendRedirect, LoginResponse response) {
		String fragment = UriComponentsBuilder
			.newInstance()
			.queryParam("accessToken", response.getAccessToken())
			.queryParam("expiresIn", response.getExpiresIn())
			.queryParam("userId", response.getUserId())
			.queryParam("userLoginId", response.getUserLoginId())
			.queryParam("name", response.getName())
			.queryParam("nickname", response.getNickname())
			.queryParam("role", response.getRole())
			.build()
			.encode()
			.getQuery();

		if (fragment == null || fragment.trim().isEmpty()) {
			return frontendRedirect;
		}

		return frontendRedirect + "#" + fragment;
	}
}
