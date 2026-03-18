package com.app.service.user;

import com.app.dto.user.LoginRequest;
import com.app.dto.user.LoginResponse;
import com.app.dto.user.SignUpRequest;

public interface UserService {
	public int signUp(SignUpRequest request);
	public boolean isUserIdAvailable(String userLoginId);
	public boolean isNicknameAvailable(String nickname);
	public boolean isEmailAvailable(String email);
	public String validateCheckIdRequest(String userId);
	public String validateCheckNicknameRequest(String nickname);
	public String validateCheckEmailRequest(String email);
	public String validateSignUpRequest(SignUpRequest request);
	public String validateLoginRequest(LoginRequest request);
	public LoginResponse login(LoginRequest request);
}
