import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DecryptText from '../DecryptText';
import Dither from '../Dither';
import './MyAchievements.css';

const MyAchievements: React.FC = () => {
  // Global mouse event listener for Dither reactivity
  useEffect(() => {
    // Cache the canvas node and coalesce to one synthetic dispatch per frame,
    // instead of a querySelector + event dispatch on every mousemove.
    let cachedCanvas: HTMLCanvasElement | null = null;
    let rafId = 0;
    let pending: { x: number; y: number } | null = null;
    const flush = () => {
      rafId = 0;
      if (!pending) return;
      if (!cachedCanvas || !cachedCanvas.isConnected) {
        cachedCanvas = document.querySelector('canvas');
      }
      cachedCanvas?.dispatchEvent(new MouseEvent('pointermove', {
        clientX: pending.x,
        clientY: pending.y,
        bubbles: true,
      }));
      pending = null;
    };
    const handleGlobalMouseMove = (e: MouseEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!rafId) rafId = requestAnimationFrame(flush);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
  return (
    <div className="achievements-container" style={{ position: 'relative' }}>
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
      
      <div className="achievements-content" style={{ position: 'relative', zIndex: 1 }}>
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
            <DecryptText 
              text="> My Achievements & Awards_" 
              animateOn="view"
              sequential={true}
              useOriginalCharsOnly={false}
              revealDirection="start"
              speed={60}
              maxIterations={10}
              className="typewriter-text"
            />
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

            <h2 className="section-title">🦾 FIRST Tech Challenge (FTC)</h2>
            <ul className="achievements-list">
              <li>🥉 <strong>FTC DECODE – Da Vinci Division, 3rd Place</strong></li>
              <li>🥈 <strong>MTI – 2nd Place (Alliance Partner)</strong></li>
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