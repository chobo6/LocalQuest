import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { userApi } from '../../../api/UserApi';
import './SignUp.css';

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        email: '',
        name: '',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
        gender: ''
    });

    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        // [프론트엔드 검증] 비밀번호 재확인
        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: "비밀번호가 일치하지 않습니다." });
            return;
        }

        try {
            // 분리된 함수 호출
            const response = await userApi.signUp(formData);
            alert("성공!");
            navigate('/login');
        } catch (error) {
            alert("실패: " + error.response?.data);
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">회원정보 입력</h2>

            <form className="signup-form" onSubmit={handleSignup}>

                {/* 섹션 1: 계정 정보 (사이트 이용 정보) */}
                <div className="form-section">
                    <h3 className="section-title">계정 정보</h3>
                    <Input label="아이디" name="userId" placeholder="아이디 입력" value={formData.userId} onChange={handleChange} />
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
                </div>

                <div className="section-divider"></div>

                {/* 섹션 2: 개인 정보 */}
                <div className="form-section">
                    <h3 className="section-title">개인 정보</h3>
                    <Input label="이름" name="name" placeholder="이름 입력" value={formData.name} onChange={handleChange} />
                    <Input label="이메일" type="email" name="email" placeholder="example@email.com" value={formData.email} onChange={handleChange} />

                    <div className="signup-field-group">
                        <label className="lq-label">생년월일</label>
                        <div className="birth-dropdowns">
                            <select name="birthYear" value={formData.birthYear} onChange={handleChange} className="lq-select">
                                <option value="">년</option>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                            <select name="birthMonth" value={formData.birthMonth} onChange={handleChange} className="lq-select">
                                <option value="">월</option>
                                {months.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <select name="birthDay" value={formData.birthDay} onChange={handleChange} className="lq-select">
                                <option value="">일</option>
                                {days.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="signup-field-group">
                        <label className="lq-label">성별</label>
                        <div className="gender-box-group">
                            <button
                                type="button"
                                className={`gender-box ${formData.gender === 'M' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, gender: 'M' })}
                            >남성</button>
                            <button
                                type="button"
                                className={`gender-box ${formData.gender === 'F' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, gender: 'F' })}
                            >여성</button>
                        </div>
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