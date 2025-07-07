import React, { useState, useEffect } from 'react';
import { useDeviceDetection } from '../../hooks/useDeviceDetection';
import './MobileTerminalEnhancements.css';

interface MobileTerminalHelpProps {
  isVisible: boolean;
  onClose: () => void;
}

const MobileTerminalHelp: React.FC<MobileTerminalHelpProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="mobile-help-overlay">
      <div className="mobile-help-content">
        <button className="mobile-help-close" onClick={onClose}>
          ×
        </button>
        <h3>📱 Mobile Terminal Guide</h3>
        
        <div className="mobile-disclaimer">
          <div className="disclaimer-header">
            ⚠️ <strong>DISCLAIMER</strong> ⚠️
          </div>
          <div className="disclaimer-text">
            <p>
              Hey there! 👋 Just a heads up - this portfolio is optimized for <strong>PC/Desktop</strong> experience. 
              The mobile terminal version is... well, let's be honest here... pretty <strong>scuffed</strong>! 😅
            </p>
            <p>
              For the full, buttery-smooth experience with all the fancy animations and proper terminal vibes, 
              grab your laptop! 💻✨ But hey, if you're stuck on mobile, these tips below will help you survive! 📱
            </p>
          </div>
        </div>
        
        <div className="mobile-help-tips">
          <div className="tip">
            <span className="tip-icon">💡</span>
            <span>Tap the terminal to start typing commands</span>
          </div>
          <div className="tip">
            <span className="tip-icon">⌨️</span>
            <span>Try commands like: <code>help</code>, <code>about</code>, <code>projects</code></span>
          </div>
          <div className="tip">
            <span className="tip-icon">🔍</span>
            <span>Use the Menu button (top-right) for easy navigation</span>
          </div>
          <div className="tip">
            <span className="tip-icon">📋</span>
            <span>Long-press text to copy on mobile</span>
          </div>
        </div>
        <button className="mobile-help-got-it" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
};

interface MobileTerminalEnhancementsProps {
  children: React.ReactNode;
}

const MobileTerminalEnhancements: React.FC<MobileTerminalEnhancementsProps> = ({ children }) => {
  const { isMobile } = useDeviceDetection();
  const [showHelp, setShowHelp] = useState(false);
  const [hasShownHelp, setHasShownHelp] = useState(false);

  useEffect(() => {
    // Show help automatically on first mobile visit (only once per session)
    if (isMobile && !hasShownHelp) {
      const hasSeenHelpInSession = sessionStorage.getItem('mobileTerminalHelpShownThisSession');
      if (!hasSeenHelpInSession) {
        // Show after a short delay to let the page load
        setTimeout(() => {
          setShowHelp(true);
          setHasShownHelp(true);
          sessionStorage.setItem('mobileTerminalHelpShownThisSession', 'true');
        }, 1500);
      } else {
        setHasShownHelp(true);
      }
    }
  }, [isMobile, hasShownHelp]);

  const handleCloseHelp = () => {
    setShowHelp(false);
  };

  const handleShowHelp = () => {
    setShowHelp(true);
  };

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className="mobile-terminal-container">
      {children}
      
      {/* Mobile help button */}
      <button 
        className="mobile-help-button"
        onClick={handleShowHelp}
        aria-label="Show mobile terminal help"
      >
        ?
      </button>
      
      {/* Mobile help overlay */}
      <MobileTerminalHelp 
        isVisible={showHelp} 
        onClose={handleCloseHelp} 
      />
    </div>
  );
};

export default MobileTerminalEnhancements;
