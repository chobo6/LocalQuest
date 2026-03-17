import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';
import './Terms.css';

function Terms() {
    const navigate = useNavigate();

    // 체크박스 상태 관리
    const [checks, setChecks] = useState({
        all: false,
        term1: false,
        term2: false,
        term3: false,
    });

    // 전체 동의 핸들러
    const handleAllCheck = (e) => {
        const isChecked = e.target.checked;
        setChecks({
            all: isChecked,
            term1: isChecked,
            term2: isChecked,
            term3: isChecked,
        });
    };

    // 개별 체크 핸들러
    const handleSingleCheck = (name, isChecked) => {
        const updatedChecks = { ...checks, [name]: isChecked };
        setChecks(updatedChecks);

        // 모든 항목이 체크되었는지 확인하여 '전체 동의' 상태 업데이트
        const allChecked = updatedChecks.term1 && updatedChecks.term2 && updatedChecks.term3;
        setChecks(prev => ({ ...prev, [name]: isChecked, all: allChecked }));
    };

    const handleNext = () => {
        if (checks.term1 && checks.term2) {
            navigate('/signup'); // 다음 단계인 정보 입력 페이지로 이동
        } else {
            alert("필수 약관에 동의해주세요.");
        }
    };

    return (
        <div className="terms-container">
            <h2 className="terms-title">이용약관 동의</h2>

            <div className="terms-box">
                <div className="check-item all">
                    <label>
                        <input type="checkbox" checked={checks.all} onChange={handleAllCheck} />
                        <strong>전체 동의합니다.</strong>
                    </label>
                </div>

                <hr />

                <div className="check-item">
                    <label>
                        <input type="checkbox" checked={checks.term1} onChange={(e) => handleSingleCheck('term1', e.target.checked)} />
                        <span>[필수] 이용약관 동의</span>
                    </label>
                    <div className="terms-content">이용약관 내용이 여기에 들어갑니다...</div>
                </div>

                <div className="check-item">
                    <label>
                        <input type="checkbox" checked={checks.term2} onChange={(e) => handleSingleCheck('term2', e.target.checked)} />
                        <span>[필수] 개인정보 수집 및 이용 동의</span>
                    </label>
                    <div className="terms-content">개인정보 수집 내용이 여기에 들어갑니다...</div>
                </div>

                <div className="check-item">
                    <label>
                        <input type="checkbox" checked={checks.term3} onChange={(e) => handleSingleCheck('term3', e.target.checked)} />
                        <span>[선택] 마케팅 정보 수신 동의</span>
                    </label>
                    <div className="terms-content">마케팅 활용 내용이 여기에 들어갑니다...</div>
                </div>
            </div>

            <div className="terms-buttons">
                <Button text="이전" variant="secondary" onClick={() => navigate(-1)} />
                <Button text="다음" variant="primary" onClick={handleNext} />
            </div>
        </div>
    );
}

export default Terms;