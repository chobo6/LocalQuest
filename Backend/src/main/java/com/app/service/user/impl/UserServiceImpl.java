package com.app.service.user.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.user.UserDAO;
import com.app.dto.user.SignUpRequest;
import com.app.dto.user.User;
import com.app.service.user.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDAO userDAO;
	
	@Override
	@Transactional
	public int signUp(SignUpRequest request) {
		// 1. DB 저장을 위한 User DTO(Entity 역할을 하는 객체) 생성
        User user = new User();

        // 2. 필드 매핑 (Request -> User)
        user.setUserLoginId(request.getUserId());
        user.setPassword(request.getPassword()); // 실무에선 여기서 PasswordEncoder 사용
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setNickname(request.getNickname());
        user.setGender(request.getGender());

        // 3. 생년월일 가공 (YYYY-MM-DD)
        String birth = String.format("%s-%02d-%02d", 
            request.getBirthYear(), 
            Integer.parseInt(request.getBirthMonth()), 
            Integer.parseInt(request.getBirthDay()));
        user.setBirth(birth);

        // 4. 시스템 기본값 세팅
        user.setRole("USER");
        user.setStatus("ACTIVE");
        user.setExp(0);
        user.setPoint(0);

        // 5. DB 저장 실행
		int result = userDAO.saveUser(user);
		return result;
	}

	@Override
    public List<User> getAllUsers() {
        return userDAO.selectAllUsers();
    }

    @Override
    public List<User> searchUsers(String searchType, String keyword) {
        Map<String, Object> searchMap = new HashMap<>();
        searchMap.put("searchType", searchType);
        searchMap.put("keyword", keyword);
        return userDAO.searchUser(searchMap);
    }

    @Override
    public boolean changeUserRole(int userId, String newRole) {
        Map<String, Object> roleMap = new HashMap<>();
        roleMap.put("userId", userId);
        roleMap.put("newRole", newRole);
        
        // 업데이트된 행의 수가 1이면 성공(true) 반환
        return userDAO.updateUserRole(roleMap) == 1;
    }

    @Override
    public boolean changeUserStatus(int userId, String newStatus) {
        Map<String, Object> statusMap = new HashMap<>();
        statusMap.put("userId", userId);
        statusMap.put("newStatus", newStatus);
        
        return userDAO.updateUserStatus(statusMap) == 1;
    }
}
