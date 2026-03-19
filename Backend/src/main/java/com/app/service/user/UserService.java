package com.app.service.user;

import java.util.List;

import com.app.dto.user.LoginRequest;
import com.app.dto.user.LoginResponse;
import com.app.dto.user.SignUpRequest;
import com.app.dto.user.User;

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
	
	// 1. 전체 회원 목록 가져오기
    public List<User> getAllUsers();

    // 2. 조건별 회원 검색하기 (아이디/닉네임 등)
    List<User> searchUsers(String type, String keyword, String sort);
    
    // 3. 회원 권한 변경하기 (USER/BUSINESS/ADMIN)
    public boolean changeUserRole(int userId, String newRole);

    // 4. 회원 상태 변경하기 (정지/탈퇴 등)
    public boolean changeUserStatus(int userId, String newStatus);
}
