import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyProjects.css';

const MyProjects: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "> My Projects & Innovations_";

  // Force the page to be visible on mount
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

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 100);
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
    <div className="projects-container">
      <Link to="/" className="back-to-terminal-btn">
        ← Terminal
      </Link>
      
      <div className="projects-content">
        <div className="retro-terminal-header">
          <div className="header-buttons">
            <div className="header-button"></div>
            <div className="header-button"></div>
            <div className="header-button"></div>
          </div>
          <div className="terminal-title">projects.txt</div>
        </div>
        
        <div className="projects-body">
          <h1 className="projects-title">
            <div className="typewriter-container">
              <span className="typewriter-text">{displayedText}</span>
              <span className={`cursor ${showCursor ? '' : 'blink'}`}></span>
            </div>
          </h1>

          <div className="projects-description">
            <p>
              Welcome to my <span className="highlight">project portfolio</span>! 
              Here's a showcase of my innovative solutions across various technical domains.
            </p>

            <h2 className="section-title">🛡️ Cybersecurity & AI</h2>
            <ul className="projects-list">
              <li>🔐 <strong>Finfo – LLM-based Vulnerability Analysis Platform</strong>
                <ul>
                  <li>A self-hosted AI tool designed to automate recon, dynamic analysis, and exploit discovery.</li>
                  <li>Features include multi-MCP (Model Context Protocol) servers allowing a local Ollama LLM to interface with:</li>
                  <li>- Websites (headless + HTTP scanning)</li>
                  <li>- Local system tools like <span className="code">netcat</span>, <span className="code">wpscan</span>, and <span className="code">Metasploit</span></li>
                  <li>- Devices and services across a local ecosystem</li>
                  <li><em>Goal:</em> Build a viable alternative to manual bug bounty work and traditional pentesting workflows.</li>
                </ul>
              </li>
            </ul>

            <h2 className="section-title">🛠️ Practical Tools & Personal Projects</h2>
            <ul className="projects-list">
              <li>🎵 <strong>Anti-Manele Raspberry Pi Device</strong>
                <ul>
                  <li>A Raspberry Pi–powered jammer that detects and disables nearby Bluetooth speakers playing Romanian "manele" music using a targeted denial-of-service strategy.</li>
                </ul>
              </li>
              <li>🚗 <strong>Car Fleet Assistant Bot</strong>
                <ul>
                  <li>Telegram and WhatsApp Business API–based tool to support my father's car fleet business. Features:</li>
                  <li>- Document management</li>
                  <li>- Incident reporting</li>
                  <li>- Driver-car assignment tracking</li>
                </ul>
              </li>
            </ul>

            <h2 className="section-title">🚁 Autonomous Systems & Robotics</h2>
            <ul className="projects-list">
              <li>🌊 <strong>AI-Powered Autonomous Water Rescue Drone</strong>
                <ul>
                  <li>Designed for lifeguard deployment with computer vision, GPS coordination, and autonomous navigation for water rescue operations.</li>
                </ul>
              </li>
              <li>📱 <strong>Lifeguard Android App</strong>
                <ul>
                  <li>A real-time interface for the rescue drone, allowing lifeguards to control and receive telemetry from the drone via a mobile device.</li>
                </ul>
              </li>
            </ul>

            <h2 className="section-title">🧠 Augmented Reality</h2>
            <ul className="projects-list">
              <li>👓 <strong>Juniper – AR Daily Assistant for Brilliant Labs Glasses</strong>
                <ul>
                  <li>An app built for Brilliant Labs' AR glasses designed for daily productivity: time, weather, notifications, and personal assistant functions.</li>
                </ul>
              </li>
            </ul>

            <h2 className="section-title">💰 Finance & Automation</h2>
            <ul className="projects-list">
              <li>📈 <strong>Crypto Trading Bot (Coinbase API)</strong>
                <ul>
                  <li>A rules-based crypto trading algorithm that interacts with live market data via the Coinbase API. Supports real-time trading decisions, stop-loss handling, and logging.</li>
                </ul>
              </li>
            </ul>

            <div className="closing">
              <p>
                These projects showcase my <em>passion</em> for solving real-world problems through 
                innovative technology solutions across multiple disciplines.
              </p>
              <p>
                Each project represents a unique challenge that pushed me to learn new technologies 
                and develop creative approaches to complex problems.
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

export default MyProjects;