package com.app.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LQ_UserDTO {

	private int userId;
    private String userLoginId;
    private String name;
    private String email;
    private String password;
    private String nickname;
    private Date birth;
    private String gender;
    private String role;
    private int exp;
    private int point;
    private String status;
    private Date createdAt;
    
}
