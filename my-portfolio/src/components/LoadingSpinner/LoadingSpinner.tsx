import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'terminal' | 'minimal';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  size = 'medium',
  variant = 'terminal' 
}) => {
  if (variant === 'minimal') {
    return (
      <div className={`loading-container loading-${size}`}>
        <div className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
        <div className="loading-message">{message}</div>
      </div>
    );
  }

  return (
    <div className={`loading-container loading-${size}`}>
      <div className="terminal-loading">
        <div className="loading-header">
          <div className="loading-header-buttons">
            <span className="loading-header-button"></span>
            <span className="loading-header-button"></span>
            <span className="loading-header-button"></span>
          </div>
          <div className="loading-title">system.log</div>
        </div>
        <div className="loading-content">
          <div className="loading-line">
            <span className="loading-prompt">guest@PortfolioOS:~$</span>
            <span className="loading-command">{message}</span>
          </div>
          <div className="loading-line">
            <span className="loading-output">
              <span className="loading-cursor"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
