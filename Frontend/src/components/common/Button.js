import React from 'react';
import './Button.css';

/**
 * @param {string} text - 버튼에 표시할 문구
 * @param {function} onClick - 버튼 클릭 시 실행할 함수
 * @param {string} type - 버튼 타입 (button, submit, reset)
 * @param {string} variant - 디자인 타입 (primary, secondary, outline, danger)
 * @param {boolean} disabled - 비활성화 여부
 * @param {string} className - 추가적인 커스텀 클래스
 */
function Button({ 
    text, 
    onClick, 
    type = "button", 
    variant = "primary", 
    disabled = false,
    className = "",
    ...props 
}) {
    return (
        <button
            type={type}
            className={`lq-button ${variant} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {text}
        </button>
    );
}

export default Button;