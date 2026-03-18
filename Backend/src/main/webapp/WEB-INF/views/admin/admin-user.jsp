<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="path" value="${pageContext.request.contextPath}" />
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
<link rel="stylesheet" href="${path}/css/admin-user.css">

<div class="adm-u-container">
	<div class="adm-u-header">
		<h2 class="adm-u-title">
			<i class="fas fa-users-cog"></i> 회원 관리
		</h2>
		<div class="adm-u-search-group">
			<select id="searchType" class="adm-u-select">
				<option value="loginId">아이디</option>
				<option value="nickname">닉네임</option>
			</select> <input type="text" id="keyword" class="adm-u-input"
				placeholder="검색어를 입력하세요">
			<button onclick="searchUser()" class="adm-u-btn-search">검색</button>
		</div>
	</div>

	<table class="adm-u-table">
		<thead>
			<tr>
				<th>번호</th>
				<th>아이디</th>
				<th>이름</th>
				<th>닉네임</th>
				<th>권한</th>
				<th>상태</th>
				<th>가입일</th>
				<th>설정</th>
			</tr>
		</thead>
		<tbody id="userTableBody">
			<c:forEach var="user" items="${userList}">
				<tr class="adm-u-row">
					<td>${user.userId}</td>
					<td class="adm-u-bold">${user.userLoginId}</td>
					<td>${user.name}</td>
					<td>${user.nickname}</td>
					<td>
						<%-- admin-user.jsp 내 select 태그 --%> 
						<select
						class="adm-u-table-select"
						onchange="updateRole(${user.userId}, this.value)"
						${user.userId == 1 ? 'disabled' : ''}>
							<%-- 1번이면 작동 안 함 --%>
							<option value="USER" ${user.role == 'USER' ? 'selected' : ''}>일반</option>
							<option value="BUSINESS"
								${user.role == 'BUSINESS' ? 'selected' : ''}>비즈니스</option>
							<option value="ADMIN" ${user.role == 'ADMIN' ? 'selected' : ''}>관리자</option>
					</select> <c:if test="${user.userId == 1}">
							<small style="display: block; color: #7239ea; font-size: 10px;">Master</small>
						</c:if>
					</td>
					<td><span class="adm-u-badge ${user.status}">${user.status}</span>
					</td>
					<td class="adm-u-date">${user.createdAt}</td>
					<td>
						<button class="adm-u-btn-stop"
							onclick="updateStatus(${user.userId}, 'WITHDRAWN')">정지</button>
					</td>
				</tr>
			</c:forEach>
		</tbody>
	</table>
</div>