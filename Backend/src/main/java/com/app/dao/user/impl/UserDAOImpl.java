package com.app.dao.user.impl;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.user.UserDAO;
import com.app.dto.user.User;

@Repository
public class UserDAOImpl implements UserDAO {

	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;
	
//    private static final String NAMESPACE = "com.app.dao.user.UserDAO";

	@Override
	public int saveUser(User user) {
		int result = sqlSessionTemplate.insert("user_mapper.saveUser", user);
		return result;
	}

    @Override
    public List<User> selectAllUsers() {
        return sqlSessionTemplate.selectList("user_mapper.selectAllUsers");
    }

    @Override
    public List<User> searchUser(Map<String, Object> searchMap) {
        return sqlSessionTemplate.selectList("user_mapper.searchUser", searchMap);
    }

    @Override
    public int updateUserRole(Map<String, Object> roleMap) {
        return sqlSessionTemplate.update("user_mapper.updateUserRole", roleMap);
    }

    @Override
    public int updateUserStatus(Map<String, Object> statusMap) {
        return sqlSessionTemplate.update("user_mapper.updateUserStatus", statusMap);
    }

}
