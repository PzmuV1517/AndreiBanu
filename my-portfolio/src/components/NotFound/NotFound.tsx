import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FuzzyText from '../404Backgrounds/FuzzyText';
import Aurora from '../404Backgrounds/Aurora';
import Ballpit from '../404Backgrounds/Ballpit';
import Beams from '../404Backgrounds/Beams';
import Iridescence from '../404Backgrounds/Iridescence';
import Particles from '../404Backgrounds/Particles';
import Silk from '../404Backgrounds/Silk';
import Squares from '../404Backgrounds/Squares';
import Threads from '../404Backgrounds/Threads';
import './NotFound.css';
import '../../styles/App.css';

// Navigation structure for the portfolio
const navPages = [
  { name: 'Terminal', path: '/' },
  { name: 'About Me', path: '/about-me' },
  { name: 'My Achievements', path: '/my-achievements' },
  { name: 'My Projects', path: '/my-projects' },
  { name: 'My Skills', path: '/my-skills' },
  { name: 'Contact', path: '/contact' },
];

// Background components array (excluding FuzzyText) with specific configurations
const backgroundComponents = [
  { 
    name: 'Aurora', 
    component: Aurora,
    props: {
      colorStops: ["#3A29FF", "#FF94B4", "#FF3232"],
      blend: 0.5,
      amplitude: 1.0,
      speed: 0.5
    }
  },
  { 
    name: 'Ballpit', 
    component: Ballpit,
    props: {
      count: 200,
      gravity: 0.7,
      friction: 0.8,
      wallBounce: 0.95,
      followCursor: true
    }
  },
  { 
    name: 'Beams', 
    component: Beams,
    props: {
      beamWidth: 2,
      beamHeight: 15,
      beamNumber: 12,
      lightColor: "#ffffff",
      speed: 2,
      noiseIntensity: 1.75,
      scale: 0.2,
      rotation: 0
    }
  },
  { 
    name: 'Iridescence', 
    component: Iridescence,
    props: {
      color: [0.8, 0.4, 1.0] as [number, number, number],
      mouseReact: true,
      amplitude: 0.3,
      speed: 1.5
    }
  },
  { 
    name: 'Particles', 
    component: Particles,
    props: {
      particleColors: ['#ffffff', '#ffffff'],
      particleCount: 200,
      particleSpread: 10,
      speed: 0.1,
      particleBaseSize: 100,
      moveParticlesOnHover: true,
      alphaParticles: false,
      disableRotation: false
    }
  },
  { 
    name: 'Silk', 
    component: Silk,
    props: {
      speed: 5,
      scale: 1,
      color: "#7B7481",
      noiseIntensity: 1.5,
      rotation: 0
    }
  },
  { 
    name: 'Squares', 
    component: Squares,
    props: {
      speed: 0.5,
      squareSize: 40,
      direction: 'diagonal' as const,
      borderColor: '#fff',
      hoverFillColor: '#222'
    }
  },
  { 
    name: 'Threads', 
    component: Threads,
    props: {
      amplitude: 1,
      distance: 0.2,
      enableMouseInteraction: true
    }
  },
] as const;

const NotFound: React.FC = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(0);

  useEffect(() => {
    // Randomly select a background component on mount
    const randomIndex = Math.floor(Math.random() * backgroundComponents.length);
    setSelectedBackground(randomIndex);
  }, []);

  const toggleOverlay = () => setIsOverlayOpen(!isOverlayOpen);
  const closeOverlay = () => setIsOverlayOpen(false);

  const BackgroundComponent = backgroundComponents[selectedBackground].component;
  const backgroundProps = backgroundComponents[selectedBackground].props;

  return (
    <div className="not-found-container">
      {/* Random Background */}
      <div className="background-wrapper">
        <BackgroundComponent {...(backgroundProps as any)} />
      </div>

      {/* Menu Button */}
      <button
        className="easy-mode-button visible"
        onClick={toggleOverlay}
        aria-label="Toggle Easy Navigation Mode"
        title="Easy Navigation Mode"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width="24"
          height="24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <span className="button-text">Menu</span>
      </button>

      {/* Navigation Overlay */}
      {isOverlayOpen && (
        <div className="overlay" onClick={closeOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <button className="overlay-close-button" onClick={closeOverlay} aria-label="Close Easy Navigation">
              &times;
            </button>
            <h2>Easy Navigation</h2>
            <nav className="overlay-nav-list">
              {navPages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="overlay-nav-link"
                  onClick={closeOverlay}
                >
                  {page.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
      
      <div className="not-found-box">
        <div className="fuzzy-text-large">
          <FuzzyText
            fontSize="clamp(3rem, 8vw, 8rem)"
            fontWeight={900}
            color="#fff"
            baseIntensity={0.2}
            hoverIntensity={0.6}
            enableHover={true}
          >
            404
          </FuzzyText>
        </div>
        <div className="fuzzy-text-small">
          <FuzzyText
            fontSize="clamp(1.2rem, 3vw, 3rem)"
            fontWeight={600}
            color="#fff"
            baseIntensity={0.15}
            hoverIntensity={0.4}
            enableHover={true}
          >
            not found
          </FuzzyText>
        </div>
        <div className="fun-fact">
          <p className="fun-fact-text">
            <span className="fun-fact-label">Fun Fact:</span> This is background number {selectedBackground + 1} of the possible {backgroundComponents.length}, refresh the page for the chance to see another one :)
          </p>
        </div>
        <div className="return-to-terminal">
          <Link to="/" className="terminal-link">
            ← Return to Terminal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
