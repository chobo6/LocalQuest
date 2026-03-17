import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

function Signup() {
    const navigate = useNavigate();

    // 회원가입 폼 상태 관리
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        email: '',
        name: '',
        birthDate: '',
        gender: ''
    });

    // 에러 메시지 상태 관리
    const [errors, setErrors] = useState({});

    // 입력 값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        
        // 간단한 유효성 검사 예시
        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: "비밀번호가 일치하지 않습니다." });
            return;
        }

        console.log("회원가입 데이터:", formData);
        alert("회원가입이 완료되었습니다!");
        navigate('/login');
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">회원정보 입력</h2>
            
            <form className="signup-form" onSubmit={handleSignup}>
                <Input label="아이디" name="userId" placeholder="아이디 입력" value={formData.userId} onChange={handleChange} />
                
                <Input label="이름" name="name" placeholder="이름 입력" value={formData.name} onChange={handleChange} />

                <Input label="비밀번호" type="password" name="password" placeholder="비밀번호 입력" value={formData.password} onChange={handleChange} />
                
                <Input 
                    label="비밀번호 확인" 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="비밀번호 재입력" 
                    value={formData.confirmPassword} 
                    onChange={handleChange}
                    error={errors.confirmPassword}
                />

                <Input label="닉네임" name="nickname" placeholder="사용할 닉네임" value={formData.nickname} onChange={handleChange} />
                
                <Input label="이메일" type="email" name="email" placeholder="example@mail.com" value={formData.email} onChange={handleChange} />

                <Input label="생년월일" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />

                <div className="gender-section">
                    <label className="lq-label">성별</label>
                    <div className="gender-options">
                        <label className="gender-item">
                            <input type="radio" name="gender" value="male" onChange={handleChange} /> 남성
                        </label>
                        <label className="gender-item">
                            <input type="radio" name="gender" value="female" onChange={handleChange} /> 여성
                        </label>
                    </div>
                </div>

                <div className="signup-buttons">
                    <Button text="가입하기" type="submit" variant="primary" />
                    <Button text="취소" variant="outline" onClick={() => navigate(-1)} />
                </div>
            </form>
        </div>
    );
}

export default Signup;