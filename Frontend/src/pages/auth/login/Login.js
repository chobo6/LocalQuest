import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Login.css';
import Button from '../../../components/common/Button'; // 경로 확인 필요
import Input from '../../../components/common/Input';   // 경로 확인 필요
import { userApi } from '../../../api/UserApi';
import { setAuth } from '../../../store/authSlice';

function Login() {
    // 1. 입력값을 저장할 상태(State) 생성
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 2. 로그인 버튼 클릭 시 실행될 함수
    const handleLogin = async (e) => {
        e.preventDefault();

        const trimmedUserId = userId.trim();
        if (!trimmedUserId || !password) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await userApi.login({
                userId: trimmedUserId,
                password
            });

            const data = response.data;
            dispatch(setAuth({
                accessToken: data.accessToken,
                expiresIn: data.expiresIn,
                user: {
                    userId: data.userId,
                    userLoginId: data.userLoginId,
                    name: data.name,
                    nickname: data.nickname,
                    role: data.role
                }
            }));

            navigate('/main');
        } catch (error) {
            const errorMessage = error.response?.data || "로그인에 실패했습니다.";
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
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
                <Button
                    text={isSubmitting ? "로그인 중..." : "로그인"}
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                />
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
