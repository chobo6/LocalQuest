<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>LOCALQUEST ADMIN</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        // 전역 경로 변수 (JSP 어디서든 사용 가능)
        const ctx = "${pageContext.request.contextPath}";

        /**
         * 콘텐츠 로더
         */
        function loadAdminContent(url, element) {
            $('.admin-content-area').empty(); 
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                success: function(response) {
                    $('.admin-content-area').html(response);
                    if (element) {
                        $('.admin-nav-item a').removeClass('active');
                        $(element).addClass('active');
                    }
                },
                error: function(xhr) {
                    console.error("로드 실패:", xhr.status);
                }
            });
        }

        /**
         * [통합] 회원 권한 변경 함수
         */
        function updateRole(userId, newRole) {
            if (userId === 1) {
                alert("마스터 관리자는 변경할 수 없습니다.");
                return;
            }

            if (!confirm("권한을 변경하시겠습니까?")) {
                loadAdminContent(ctx + '/admin/users');
                return;
            }

            $.ajax({
                url: ctx + '/admin/users/updateRole',
                type: 'POST',
                data: { userId: userId, role: newRole },
                success: function(res) {
                    if (res.trim() === "success") {
                        alert("권한이 변경되었습니다.");
                    } else {
                        alert("변경 실패");
                        loadAdminContent(ctx + '/admin/users');
                    }
                },
                error: function(xhr) {
                    alert("서버 통신 에러 (코드: " + xhr.status + ")");
                }
            });
        }
        
        let currentSortOrder = 'DESC'; // 기본 정렬 상태 (최신순)

        /**
         * 회원 검색 함수
         */
        function searchUser() {
            const type = $('#searchType').val();
            const keyword = $('#keyword').val();
            
            // 검색 시에도 contextPath(ctx) 활용
            const url = ctx + "/admin/search?type=" + type + "&keyword=" + encodeURIComponent(keyword);
            loadAdminContent(url);
        }

        /**
         * 회원번호 정렬 함수 (클라이언트 사이드 혹은 서버 사이드 선택 가능)
         * 여기서는 가장 깔끔한 '서버 재요청' 방식을 추천합니다.
         */
        function sortUserList() {
            currentSortOrder = (currentSortOrder === 'DESC') ? 'ASC' : 'DESC';
            const type = $('#searchType').val();
            const keyword = $('#keyword').val();
            
            // 검색 조건 유지하면서 정렬만 변경해서 다시 로드
            const url = ctx + "/admin/users?sort=" + currentSortOrder + "&type=" + type + "&keyword=" + keyword;
            loadAdminContent(url);
        }
    </script>
</head>
<body>
    <div id="admin-root">
        <jsp:include page="../common/header.jsp" />
        <div class="header-relative-space"></div>
        <div class="admin-main-wrapper">
            <jsp:include page="./admin-navbar.jsp" />
            <main class="admin-content-area"></main>
        </div>
    </div>
    <script>
        $(document).ready(function() {
            loadAdminContent(ctx + "/admin/users");
            $('.admin-nav-item a').first().addClass('active');
        });
    </script>
</body>
</html>