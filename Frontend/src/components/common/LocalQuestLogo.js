import React from 'react';
import logoIcon from '../../assets/icons/lq-icon.svg';
import './LocalQuestLogo.css';

function LocalQuestLogo({ className = '' }) {
  return (
    <div className={`lq-logo ${className}`.trim()}>
      <img src={logoIcon} alt="LOCAL QUEST" className="lq-logo-icon" />
      <div className="lq-logo-wordmark" aria-label="LOCAL QUEST">
        <span className="lq-logo-local">LOCAL</span>
        <span className="lq-logo-quest">QUEST</span>
      </div>
    </div>
  );
}

export default LocalQuestLogo;
