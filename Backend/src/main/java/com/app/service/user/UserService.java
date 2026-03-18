package com.app.service.user;

import com.app.dto.user.SignUpRequest;
import com.app.dto.user.User;

public interface UserService {
	public int signUp(SignUpRequest request);
}
