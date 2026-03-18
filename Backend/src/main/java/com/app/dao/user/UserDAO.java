package com.app.dao.user;

import com.app.dto.user.User;

public interface UserDAO {
	public int saveUser(User user);
	public int countByUserLoginId(String userLoginId);
	public int countByNickname(String nickname);
	public int countByEmail(String email);
	public User findByUserLoginId(String userLoginId);
}
