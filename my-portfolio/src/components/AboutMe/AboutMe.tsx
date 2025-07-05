import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DecryptText from '../DecryptText';
import ASCIIText from '../ASCIIText';
import Dither from '../Dither';
import './AboutMe.css';

const AboutMe: React.FC = () => {
  // Setup page styling and cleanup on component mount/unmount
  useEffect(() => {
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

    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  return (
    <div className="about-me-container" style={{ position: 'relative' }}>
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

      {/* Transparent overlay for global mouse capture - no longer needed with global listener */}

      <Link to="/" className="back-to-terminal-btn">
        ← Terminal
      </Link>

      <div className="about-me-content" style={{ position: 'relative', zIndex: 1 }}>
        <div className="retro-terminal-header">
          <div className="header-buttons">
            <span className="header-button"></span>
            <span className="header-button"></span>
            <span className="header-button"></span>
          </div>
          <div className="terminal-title">about_me.txt</div>
        </div>

        <div className="about-me-body">
          <h1 className="about-me-title">
            <DecryptText 
              text="> Andrei Banu_" 
              animateOn="view"
              sequential={true}
              useOriginalCharsOnly={false}
              revealDirection="start"
              speed={60}
              maxIterations={10}
              className="typewriter-text"
            />
          </h1>

          {/* ASCII Text Display */}
          <div className="ascii-text-section" style={{ 
            height: '500px', 
            width: '100%', 
            margin: '-80px 0',
            position: 'relative'
          }}>
            <ASCIIText
              text='Hey!'
              enableWaves={true}
              asciiFontSize={8}
            />
          </div>

          <div className="about-me-description">
            <p>
              A 15-year-old Romanian high school student at the{' '}
              <em>International Computer High School of Bucharest</em>, with a
              strong focus on cybersecurity, robotics, and autonomous system
              development.
            </p>

            <p>
              My primary focus is offensive and defensive security and tooling. In
              my personal time, I design and develop custom cybersecurity tools,
              including:
            </p>

            <ul className="skills-list">
              <li>
                <span className="highlight">Remote access USB interface</span> for
                Cisco routers, enabling shell-level interaction for diagnostic and
                control purposes.
              </li>
              <li>
                <span className="highlight">Finfo</span> — a self-hosted,
                LLM-driven vulnerability analysis system that uses{' '}
                <span className="highlight">Model Context Protocol (MCP)</span>{' '}
                servers to allow an{' '}
                <span className="highlight">Ollama-based local model</span> to
                interact with:
                <ul>
                  <li>
                    Websites via headless browsers and request-based scanning
                  </li>
                  <li>Local and networked devices</li>
                  <li>Devices registered in my custom ecosystem</li>
                  <li>
                    System-level CLI tools like{' '}
                    <span className="code">netcat</span>,{' '}
                    <span className="code">wpscan</span>, and the{' '}
                    <span className="code">Metasploit Framework</span>
                  </li>
                </ul>
              </li>
            </ul>

            <p>
              Finfo is designed as an intelligent automation layer for dynamic
              analysis, recon, and exploit discovery — with the long-term goal of
              becoming a viable alternative to manual bug bounty hunting and
              traditional penetration testing. Along with my dream of becoming a
              Red Team cybersecurity expert, I want to fully automate the
              vulnerability discovery, analysis and exploitation allowing for
              faster and more detailed cybersecurity reports.
            </p>

            <p>
              I'm also active in{' '}
              <span className="highlight">competitive robotics</span> through{' '}
              <span className="highlight"> FLL (FIRST LEGO League)</span> and{' '}
              <span className="highlight"> FTC (FIRST Tech Challenge)</span>,
              where I specialize in hardware design, mechanical prototyping, and
              the yearly Innovation Project.
            </p>

            <p>
              Beyond cybersecurity and robotics, I enjoy learning new
              technologies and software just for the fun of it. A recent project
              involved developing a{' '}
              <span className="highlight">cross-platform fleet management bot</span>{' '}
              using the{' '}
              <span className="highlight">Telegram Bot API</span> and{' '}
              <span className="highlight">WhatsApp Business API</span>, which
              streamlines vehicle document tracking, incident reporting, and
              driver-car assignment logging for the fleet my father is in charge
              of monitoring.
            </p>

            <p className="closing">
              I'm passionate about reverse engineering, mastering technical
              protocols, and developing tools that combine{' '}
              <span className="highlight">AI, automation, and system-level
              control</span>. My long-term vision is to evolve{' '}
              <span className="highlight">Finfo</span> into a modular and
              extensible platform for applied AI in cybersecurity.
            </p>

            <div className="nav-links">
              <Link to="/" className="terminal-link">
                &lt; Back to Terminal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;