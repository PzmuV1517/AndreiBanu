// filepath: /home/ubuntu/AndreiBanu/my-portfolio/src/MyAchievements.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyAchievements.css';

const MyAchievements: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "> My Achievements & Awards_";

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
    <div className="achievements-container">
      <div className="achievements-content">
        <div className="retro-terminal-header">
          <div className="header-buttons">
            <div className="header-button"></div>
            <div className="header-button"></div>
            <div className="header-button"></div>
          </div>
          <div className="terminal-title">achievements.txt</div>
        </div>
        
        <div className="achievements-body">
          <h1 className="achievements-title">
            <div className="typewriter-container">
              <span className="typewriter-text">{displayedText}</span>
              <span className={`cursor ${showCursor ? '' : 'blink'}`}></span>
            </div>
          </h1>

          <div className="achievements-description">
            <p>
              Welcome to my <span className="highlight">achievements portfolio</span>! 
              Here's a comprehensive overview of my accomplishments across various domains.
            </p>

            <h2 className="section-title">🏆 International Competitions</h2>
            <ul className="achievements-list">
              <li>🥇 <strong>Infomatrix Hackathon 2024 – 1st Place (International)</strong></li>
              <li>🥇 <strong>FLL Open Greece – 1st Place Award</strong></li>
              <li>🥈 <strong>FLL Open Greece – Robot Game, 2nd Place Award</strong></li>
            </ul>

            <h2 className="section-title">🤖 National & Regional Robotics</h2>
            <ul className="achievements-list">
              <li>🥇 <strong>FLL Romania – 1st Place National Award</strong></li>
              <li>🥇 <strong>FLL Romania – 1st Place Regional Award</strong></li>
              <li>🤖 <strong>WRO Romania – National Participant (2022–2023)</strong></li>
            </ul>

            <h2 className="section-title">🧠 Academic & Intellectual Recognition</h2>
            <ul className="achievements-list">
              <li>🧠 <strong>MEN MENSIS MENSA Member since age 10</strong></li>
            </ul>

            <h2 className="section-title">🎙️ Public Speaking & Leadership</h2>
            <ul className="achievements-list">
              <li>🎤 <strong>Organizer, ESU Public Speaking Competition</strong>
                <ul>
                  <li>2022–2023, 2023–2024, 2024–2025</li>
                </ul>
              </li>
              <li>🤝 <strong>Volunteer, ESU Public Speaking Competition</strong>
                <ul>
                  <li>2022–2023, 2023–2024, 2024–2025</li>
                </ul>
              </li>
            </ul>

            <h2 className="section-title">🚀 Community Involvement & Hackathons</h2>
            <ul className="achievements-list">
              <li>🛠️ <strong>Organizer, QuantumRobotics KickOff Hackathon 2025</strong></li>
              <li>🌟 <strong>Gala Lumina – Two-Time Laureate</strong></li>
            </ul>

            <div className="closing">
              <p>
                These achievements reflect my <em>dedication</em> to continuous learning, 
                innovation, and community engagement across multiple disciplines.
              </p>
              <p>
                Each award represents not just personal success, but also the collaborative 
                efforts with amazing teams and mentors who have supported my journey.
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

export default MyAchievements;