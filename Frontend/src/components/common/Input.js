import React from 'react';
import './Input.css';

/**
 * @param {string} label - 입력창 위에 표시될 이름
 * @param {string} type - input 타입 (text, password, email 등)
 * @param {string} placeholder - 힌트 텍스트
 * @param {string} value - 입력된 값 (State)
 * @param {function} onChange - 값이 바뀔 때 실행될 함수
 * @param {string} error - 에러 메시지 (값이 있으면 빨간색으로 표시)
 * @param {string} name - input의 name 속성
 */
function Input({ 
    label, 
    type = "text", 
    placeholder, 
    value, 
    onChange, 
    error, 
    name,
    ...props 
}) {
    return (
        <div className="lq-input-container">
            {/* 라벨이 전달된 경우에만 출력 */}
            {label && <label className="lq-label">{label}</label>}
            
            <input
                className={`lq-input ${error ? 'is-error' : ''}`}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />

            {/* 에러 메시지가 있을 경우에만 출력 */}
            {error && <span className="lq-error-msg">{error}</span>}
        </div>
    );
}

export default Input;