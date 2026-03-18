package com.app.service.user.impl;

import java.time.DateTimeException;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.mindrot.jbcrypt.BCrypt;

import com.app.dao.user.UserDAO;
import com.app.dto.user.LoginRequest;
import com.app.dto.user.LoginResponse;
import com.app.dto.user.SignUpRequest;
import com.app.dto.user.User;
import com.app.service.user.UserService;
import com.app.service.user.auth.JwtTokenProvider;
import com.app.validator.UserValidator;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserDAO userDAO;

	@Autowired
	private UserValidator userValidator;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Override
	public String validateCheckIdRequest(String userId) {
		return userValidator.validateCheckId(userId);
	}

	@Override
	public String validateCheckNicknameRequest(String nickname) {
		return userValidator.validateCheckNickname(nickname);
	}

	@Override
	public String validateCheckEmailRequest(String email) {
		return userValidator.validateCheckEmail(email);
	}

	@Override
	public String validateSignUpRequest(SignUpRequest request) {
		String validationMessage = userValidator.validateSignUpFields(request);
		if (validationMessage != null) {
			return validationMessage;
		}

		LocalDate birthDate = parseBirthDate(request.getBirthYear(), request.getBirthMonth(), request.getBirthDay());
		validationMessage = userValidator.validateBirthDate(birthDate);
		if (validationMessage != null) {
			return validationMessage;
		}

		normalizeSignUpRequest(request, birthDate);
		return null;
	}

	@Override
	public String validateLoginRequest(LoginRequest request) {
		String validationMessage = userValidator.validateLoginFields(request);
		if (validationMessage != null) {
			return validationMessage;
		}

		request.setUserId(trimToEmpty(request.getUserId()));
		return null;
	}
	
	@Override
	@Transactional
	public int signUp(SignUpRequest request) {
		// validateSignUpRequest를 통과해 정규화된 request를 전달받는 전제
		// 1. DB 저장을 위한 User DTO(Entity 역할을 하는 객체) 생성
        User user = new User();

        // 2. 필드 매핑 (Request -> User)
        String encodedPassword = BCrypt.hashpw(request.getPassword(), BCrypt.gensalt());
        user.setUserLoginId(request.getUserId());
        user.setPassword(encodedPassword);
        user.setName(trimToEmpty(request.getName()));
        user.setEmail(request.getEmail());
        user.setNickname(trimToEmpty(request.getNickname()));
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
	public boolean isUserIdAvailable(String userLoginId) {
		String trimmedUserId = trimToEmpty(userLoginId);
		if (trimmedUserId.isEmpty()) {
			return false;
		}

		return userDAO.countByUserLoginId(trimmedUserId) == 0;
	}

	@Override
	public boolean isNicknameAvailable(String nickname) {
		String trimmedNickname = trimToEmpty(nickname);
		if (trimmedNickname.isEmpty()) {
			return false;
		}

		return userDAO.countByNickname(trimmedNickname) == 0;
	}

	@Override
	public boolean isEmailAvailable(String email) {
		String trimmedEmail = trimToEmpty(email);
		if (trimmedEmail.isEmpty()) {
			return false;
		}

		return userDAO.countByEmail(trimmedEmail) == 0;
	}

	@Override
	public LoginResponse login(LoginRequest request) {
		String userLoginId = trimToEmpty(request.getUserId());
		User user = userDAO.findByUserLoginId(userLoginId);
		if (user == null) {
			return null;
		}

		if (user.getStatus() != null && !"ACTIVE".equalsIgnoreCase(user.getStatus())) {
			return null;
		}

		String rawPassword = request.getPassword() == null ? "" : request.getPassword();
		String encodedPassword = user.getPassword();
		if (encodedPassword == null || encodedPassword.isEmpty()) {
			return null;
		}

		try {
			if (!BCrypt.checkpw(rawPassword, encodedPassword)) {
				return null;
			}
		} catch (IllegalArgumentException e) {
			return null;
		}

		String accessToken = jwtTokenProvider.createAccessToken(user);
		LoginResponse response = new LoginResponse();
		response.setAccessToken(accessToken);
		response.setTokenType("Bearer");
		response.setExpiresIn(jwtTokenProvider.getAccessTokenExpireSeconds());
		response.setUserId(user.getUserId());
		response.setUserLoginId(user.getUserLoginId());
		response.setName(user.getName());
		response.setNickname(user.getNickname());
		response.setRole(user.getRole());
		return response;
	}

	private LocalDate parseBirthDate(String yearText, String monthText, String dayText) {
		int year;
		int month;
		int day;

		try {
			year = Integer.parseInt(trimToEmpty(yearText));
			month = Integer.parseInt(trimToEmpty(monthText));
			day = Integer.parseInt(trimToEmpty(dayText));
		} catch (NumberFormatException e) {
			return null;
		}

		if (year < 1900 || month < 1 || month > 12 || day < 1 || day > 31) {
			return null;
		}

		try {
			return LocalDate.of(year, month, day);
		} catch (DateTimeException e) {
			return null;
		}
	}

	private void normalizeSignUpRequest(SignUpRequest request, LocalDate birthDate) {
		request.setUserId(trimToEmpty(request.getUserId()));
		request.setEmail(trimToEmpty(request.getEmail()));
		request.setName(trimToEmpty(request.getName()));
		request.setNickname(trimToEmpty(request.getNickname()));
		request.setGender(trimToEmpty(request.getGender()).toUpperCase());
		request.setBirthYear(String.valueOf(birthDate.getYear()));
		request.setBirthMonth(String.valueOf(birthDate.getMonthValue()));
		request.setBirthDay(String.valueOf(birthDate.getDayOfMonth()));
	}

	private String trimToEmpty(String value) {
		return value == null ? "" : value.trim();
	}

}
