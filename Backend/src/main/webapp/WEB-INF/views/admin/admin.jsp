<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>LOCALQUEST</title>
    
</head>
<body>
    <div id="admin-root">
        <jsp:include page="../common/header.jsp" />

        <div class="admin-main-wrapper">
        <jsp:include page="./admin-navbar.jsp" />

        <main class="admin-content-area">
            <header class="content-header">
                <h2>대시보드 개요</h2>
            </header>
            
            <section class="dashboard-cards">
                <div class="card">새 문의 <strong>5건</strong></div>
                <div class="card">신규 회원 <strong>12명</strong></div>
                <div class="card">진행 중 퀘스트 <strong>24개</strong></div>
            </section>
        </main>
    </div>

    </div>
</body>
</html>