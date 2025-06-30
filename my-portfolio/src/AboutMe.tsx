// filepath: /home/ubuntu/AndreiBanu/my-portfolio/src/AboutMe.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutMe.css';

const AboutMe: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = '> Andrei Banu_';
  const typingSpeed = 120; // milliseconds per character

  // On component mount
  useEffect(() => {
    // Force the page to be visible
    document.body.style.backgroundColor = '#121212';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'auto';

    // Cleanup function to restore original styles
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      // Start cursor blinking
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }
  }, [displayedText, fullText]);

  return (
    <div className="about-me-container">
      <Link to="/" className="back-to-terminal-btn">
        ← Terminal
      </Link>

      <div className="about-me-content">
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
            <div className="typewriter-container">
              <span className="typewriter-text">{displayedText}</span>
              {showCursor && <span className="cursor">|</span>}
            </div>
          </h1>

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