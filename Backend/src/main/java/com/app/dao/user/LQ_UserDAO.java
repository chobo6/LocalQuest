package com.app.dao.user;

import java.util.List;
import java.util.Map;

import com.app.dto.LQ_UserDTO;

public interface LQ_UserDAO {

	// 1. 전체 회원 목록 조회
    public List<LQ_UserDTO> selectAllUsers();

    // 2. 회원 검색 (아이디, 닉네임 등)
    public List<LQ_UserDTO> searchUser(Map<String, Object> searchMap);

    // 3. 회원 권한(ROLE) 변경
    public int updateUserRole(Map<String, Object> roleMap);

    // 4. 회원 상태(STATUS) 변경 (정지/탈퇴)
    public int updateUserStatus(Map<String, Object> statusMap);
}
