<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<c:set var="path" value="${pageContext.request.contextPath}" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
<link rel="stylesheet" href="${path}/css/admin-quest.css">

<div class="adm-q-container">
    <div class="adm-q-header">
        <h2 class="adm-q-title"><i class="fas fa-scroll"></i> 퀘스트 관리</h2>
        <button class="adm-q-btn-add" onclick="openQuestModal()">
            <i class="fas fa-plus"></i> 새 퀘스트 등록
        </button>
    </div>

    <div class="adm-q-grid">
        <c:forEach var="quest" items="${questList}">
            <div class="adm-q-card ${quest.status}">
                <div class="adm-q-card-header">
                    <span class="adm-q-category">${quest.category}</span>
                    <span class="adm-q-status-badge">${quest.status}</span>
                </div>
                
                <div class="adm-q-card-body">
                    <h3 class="adm-q-card-title">${quest.title}</h3>
                    <p class="adm-q-card-desc">${quest.description}</p>
                </div>
                
                <div class="adm-q-reward">
                    <div class="reward-item">
                        <i class="fas fa-star exp-icon"></i> <span>${quest.rewardExp} EXP</span>
                    </div>
                    <div class="reward-item">
                        <i class="fas fa-coins point-icon"></i> <span>${quest.rewardPoint} PT</span>
                    </div>
                    <div class="reward-item">
                        <i class="fas fa-clock"></i>
                        <span>
                            <c:choose>
                                <c:when test="${not empty quest.timeLimit}">${quest.timeLimit}분</c:when>
                                <c:otherwise>제한 없음</c:otherwise>
                            </c:choose>
                        </span>
                    </div>
                </div>

                <div class="adm-q-card-footer">
                    <c:choose>
                        <c:when test="${quest.status == 'ACTIVE'}">
                            <button class="btn-q-stop" onclick="updateQuestStatus(${quest.questId}, 'INACTIVE')">비활성화</button>
                        </c:when>
                        <c:otherwise>
                            <button class="btn-q-start" onclick="updateQuestStatus(${quest.questId}, 'ACTIVE')">활성화</button>
                        </c:otherwise>
                    </c:choose>
                    <button class="btn-q-delete" onclick="updateQuestStatus(${quest.questId}, 'DELETED')">삭제</button>
                </div>
            </div>
        </c:forEach>
    </div>
</div>
