package com.app.dto.user;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class User {
	private int userId;
	private String userLoginId;
	private String name;
	private String email;
	private String password;
	private String nickname;
	private String birth;
	private String gender;
	private String role;
	private int exp;
	private int point;
	private String status;
	private LocalDateTime createAt;
}
