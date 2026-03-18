import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { clearAuth } from '../../store/authSlice';

function MainPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(clearAuth());
        navigate('/login');
    };

    return (
        <div style={{ maxWidth: '480px', margin: '80px auto', textAlign: 'center' }}>
            <h2>메인 페이지</h2>
            <p>{user?.nickname || user?.name || user?.userLoginId} 님, 로그인되었습니다.</p>
            <Button text="로그아웃" variant="outline" onClick={handleLogout} />
        </div>
    );
}

export default MainPage;
