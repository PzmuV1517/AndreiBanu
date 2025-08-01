import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DecryptText from '../DecryptText';
import Dither from '../Dither';
import './Contact.css';

const Contact: React.FC = () => {
  // Force the page to be visible on mount
  useEffect(() => {
    // Force the page to be visible
    document.body.style.backgroundColor = '#121212';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'auto';
    
    // Global mouse move handler to ensure Dither reactivity everywhere
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const ditherCanvas = document.querySelector('canvas');
      if (ditherCanvas) {
        const mouseEvent = new MouseEvent('pointermove', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true
        });
        ditherCanvas.dispatchEvent(mouseEvent);
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    
    // Cleanup function to restore original styles
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
      console.log(`${type} copied to clipboard: ${text}`);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="contact-container" style={{ position: 'relative' }}>
      {/* Dither background behind the entire text file window */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: 0,
        pointerEvents: 'none' 
      }}>
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.2}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3.4}
          waveSpeed={0.05}
        />
      </div>

      <Link to="/" className="back-to-terminal-btn">
        ← Terminal
      </Link>
      
      <div className="contact-content" style={{ position: 'relative', zIndex: 1 }}>
        <div className="retro-terminal-header">
          <div className="header-buttons">
            <div className="header-button"></div>
            <div className="header-button"></div>
            <div className="header-button"></div>
          </div>
          <div className="terminal-title">contact.txt</div>
        </div>
        
        <div className="contact-body">
          <h1 className="contact-title">
            <DecryptText 
              text="> Contact Me_" 
              animateOn="view"
              sequential={true}
              useOriginalCharsOnly={false}
              revealDirection="start"
              speed={60}
              maxIterations={10}
              className="typewriter-text"
            />
          </h1>

          <div className="contact-description">
            <p>
              If you're interested in <span className="highlight">collaborating</span>, have a question about one of my projects, 
              or just want to chat about tech, feel free to reach out!
            </p>

            <div className="contact-divider"></div>

            <h2 className="section-title">📧 Email</h2>
            <div className="contact-section">
              <div className="contact-item">
                <span className="contact-label">Primary (Personal):</span>
                <div className="contact-buttons">
                  <button 
                    className="contact-btn email-btn"
                    onClick={() => handleEmailClick('child1.andy@gmail.com')}
                  >
                    📧 child1.andy@gmail.com
                  </button>
                  <button 
                    className="contact-btn copy-btn"
                    onClick={() => copyToClipboard('child1.andy@gmail.com', 'Email')}
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-label">Secondary (Secure):</span>
                <div className="contact-buttons">
                  <button 
                    className="contact-btn email-btn"
                    onClick={() => handleEmailClick('PzmuV1517@proton.me')}
                  >
                    🔒 PzmuV1517@proton.me
                  </button>
                  <button 
                    className="contact-btn copy-btn"
                    onClick={() => copyToClipboard('PzmuV1517@proton.me', 'Email')}
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>

            <h2 className="section-title">📞 Phone</h2>
            <div className="contact-section">
              <div className="contact-item">
                <span className="contact-label">Mobile (WhatsApp, Telegram available):</span>
                <div className="contact-buttons">
                  <button 
                    className="contact-btn phone-btn"
                    onClick={() => handlePhoneClick('+40729987129')}
                  >
                    📞 +40 729 987 129
                  </button>
                  <button 
                    className="contact-btn copy-btn"
                    onClick={() => copyToClipboard('+40729987129', 'Phone')}
                    title="Copy to clipboard"
                  >
                    📋
                  </button>
                  <button 
                    className="contact-btn whatsapp-btn"
                    onClick={() => handleSocialClick('https://wa.me/40729987129')}
                  >
                    💬 WhatsApp
                  </button>
                </div>
              </div>
            </div>

            <h2 className="section-title">💬 Social Media</h2>
            <div className="contact-section">
              <div className="contact-item">
                <span className="contact-label">Discord:</span>
                <div className="contact-buttons">
                  <button 
                    className="contact-btn discord-btn"
                    onClick={() => copyToClipboard('pzmuv1517', 'Discord username')}
                  >
                    🎮 pzmuv1517
                  </button>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-label">Instagram:</span>
                <div className="contact-buttons">
                  <button 
                    className="contact-btn instagram-btn"
                    onClick={() => handleSocialClick('https://instagram.com/andy_loses_at_life')}
                  >
                    📸 @andy_loses_at_life
                  </button>
                </div>
              </div>
            </div>

            <div className="contact-divider"></div>

            <div className="closing">
              <p>
                Feel free to contact me in <em>English</em> or <em>Romanian</em>. I'm usually quick to respond.
              </p>
              <p>
                Whether you're from the <span className="highlight">cybersecurity world</span>, 
                <span className="highlight"> robotics space</span>, or something completely different—I'm always open to cool ideas!
              </p>
            </div>
          </div>

          <div className="nav-links">
            <Link to="/" className="terminal-link">
              ← Back to Terminal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;