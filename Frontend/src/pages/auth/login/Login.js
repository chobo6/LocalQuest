import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Button from '../../../components/common/Button'; // 경로 확인 필요
import Input from '../../../components/common/Input';   // 경로 확인 필요

function Login() {
    // 1. 입력값을 저장할 상태(State) 생성
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // 2. 로그인 버튼 클릭 시 실행될 함수
    const handleLogin = (e) => {
        e.preventDefault();
        console.log("로그인 시도:", { userId, password });
        // 여기에 백엔드 API 호출 로직이 들어갑니다.
    };

    return (
        <div className="login-container">
            <h2 className='login-title'>LocalQuest</h2>

            <form className="login-form" onSubmit={handleLogin}>
                {/* 공통 Input 컴포넌트 적용 */}
                <Input
                    placeholder="아이디"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="login-options">
                    <label className="remember-login-id">
                        <input type="checkbox" />
                        아이디 저장
                    </label>
                </div>

                {/* 공통 Button 컴포넌트 적용 (Primary 스타일) */}
                <Button text="로그인" type="submit" variant="primary" />
            </form>

            <div className="login-find">
                <button type="button">아이디 찾기</button>
                <button type="button">비밀번호 찾기</button>
                <button type="button" onClick={() => navigate('/terms')}>
                    회원가입
                </button>
            </div>

            <div className="social-login">
                <p>소셜 로그인</p>
                {/* 공통 Button 컴포넌트 재사용 (Secondary 스타일) */}
                <Button text="Google로 로그인" variant="google" />
                <Button text="Naver로 로그인" variant="naver" />
            </div>
        </div>
    );
}

export default Login;