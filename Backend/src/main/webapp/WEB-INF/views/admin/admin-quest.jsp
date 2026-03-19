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

<div id="questModal" class="adm-q-modal">
    <div class="adm-q-modal-content">
        <div class="adm-q-modal-header">
            <h3><i class="fas fa-plus-circle"></i> 새 퀘스트 등록</h3>
            <span class="close-modal" onclick="closeQuestModal()">&times;</span>
        </div>
        <form id="questForm">
            <div class="modal-body">
                <div class="input-group">
                    <label>퀘스트 제목</label>
                    <input type="text" name="title" placeholder="퀘스트 제목을 입력하세요" required>
                </div>
                <div class="input-group">
                    <label>카테고리</label>
                    <select name="category">
                        <option value="DAILY">DAILY</option>
                        <option value="MAIN">MAIN</option>
                        <option value="SUB">SUB</option>
                        <option value="EVENT">EVENT</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>보상 경험치(EXP)</label>
                    <input type="number" name="rewardExp" value="0" min="0">
                </div>
                <div class="input-group">
                    <label>보상 포인트(PT)</label>
                    <input type="number" name="rewardPoint" value="0" min="0">
                </div>
                <div class="input-group">
                    <label>설명</label>
                    <textarea name="description" rows="4" placeholder="퀘스트 상세 내용을 입력하세요" required></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-cancel" onclick="closeQuestModal()">취소</button>
                <button type="button" class="btn-submit" onclick="submitQuest()">등록하기</button>
            </div>
        </form>
    </div>
</div>