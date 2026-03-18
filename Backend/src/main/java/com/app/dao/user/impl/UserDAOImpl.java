package com.app.dao.user.impl;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.app.dao.user.UserDAO;
import com.app.dto.user.User;

@Repository
public class UserDAOImpl implements UserDAO {

	@Autowired
	private SqlSessionTemplate sqlSessionTemplate;

	@Override
	public int saveUser(User user) {
		int result = sqlSessionTemplate.insert("user_mapper.saveUser", user);
		return result;
	}

	@Override
	public int countByUserLoginId(String userLoginId) {
		Integer count = sqlSessionTemplate.selectOne("user_mapper.countByUserLoginId", userLoginId);
		return count == null ? 0 : count;
	}

	@Override
	public int countByNickname(String nickname) {
		Integer count = sqlSessionTemplate.selectOne("user_mapper.countByNickname", nickname);
		return count == null ? 0 : count;
	}

	@Override
	public int countByEmail(String email) {
		Integer count = sqlSessionTemplate.selectOne("user_mapper.countByEmail", email);
		return count == null ? 0 : count;
	}

	@Override
	public User findByUserLoginId(String userLoginId) {
		return sqlSessionTemplate.selectOne("user_mapper.findByUserLoginId", userLoginId);
	}

}
