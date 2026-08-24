import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DecryptText from '../DecryptText';
import Dither from '../Dither';
import './MyProjects.css';

const MyProjects: React.FC = () => {
  // Force the page to be visible on mount
  useEffect(() => {
    // Force the page to be visible
    document.body.style.backgroundColor = '#121212';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'auto';
    
    // Global mouse move handler to ensure Dither reactivity everywhere
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
    
    // Cleanup function to restore original styles
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="projects-container" style={{ position: 'relative' }}>
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
      
      <div className="projects-content" style={{ position: 'relative', zIndex: 1 }}>
        <div className="retro-terminal-header" style={{ position: 'relative', zIndex: 1 }}>
          <div className="header-buttons">
            <div className="header-button"></div>
            <div className="header-button"></div>
            <div className="header-button"></div>
          </div>
          <div className="terminal-title">projects.txt</div>
        </div>
        
        <div className="projects-body" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="projects-title">
            <DecryptText 
              text="> My Projects & Innovations_" 
              animateOn="view"
              sequential={true}
              useOriginalCharsOnly={false}
              revealDirection="start"
              speed={60}
              maxIterations={10}
              className="typewriter-text"
            />
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
              <li>🛰️ <strong>FerriteWorks – Presence-Fusion Engine</strong>
                <ul>
                  <li>A physical-security situational-awareness core that maintains a probabilistic belief over where people are on a floorplan, fused from cameras, PIR, mmWave radar, door contacts, and access-control readers — rendering that belief with its uncertainty.</li>
                  <li>The same fusion engine runs identically in simulation and real deployment; only the sensor event source changes.</li>
                </ul>
              </li>
              <li>👁️ <strong>Know-It-All – Profiling + Lab Vision System</strong>
                <ul>
                  <li>A profiling platform paired with on-site Raspberry Pi cameras that recognise people, log entries/exits, and surface unknown faces for assignment.</li>
                  <li>FastAPI backend, React/TypeScript frontend, and a Pi agent running YOLOv8 detection, InsightFace face ID, OSNet body Re-ID and SORT tracking.</li>
                </ul>
              </li>
              <li>🧊 <strong>CC-Vibes – Vibe-code ComputerCraft in Minecraft</strong>
                <ul>
                  <li>A Fabric mod that runs a live Claude Code session against your Minecraft world, giving it eyes on the world through an MCP server plus an in-game IDE and HUD.</li>
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
              <li>🖨️ <strong>Sunmi Print Hub</strong>
                <ul>
                  <li>Turns the built-in 58mm thermal printer on a Sunmi V2 Pro into a network print hub reachable four ways: on-device UI, HTTP API, MQTT (with Home Assistant auto-discovery), and an internet WebSocket listener — plus a FastAPI companion server with a pixel-accurate live preview.</li>
                </ul>
              </li>
              <li>🎞️ <strong>StretchDvr – Browser AVI→MP4 Converter</strong>
                <ul>
                  <li>A fully client-side AVI to MP4 converter for DVR footage, running FFmpeg via WebAssembly — no uploads, no server processing. Supports 4:3 preserve or 16:9 stretch, batch queues, and advanced encoding controls.</li>
                </ul>
              </li>
              <li>🧩 <strong>QuizMeAnything – AI Quiz Generator</strong>
                <ul>
                  <li>An AI-powered quiz generator and classroom tool built with React, Firebase, and Google's Gemini API — instant quizzes on any topic, plus a teacher portal for classes, shareable tests, and results tracking.</li>
                </ul>
              </li>
            </ul>

            <h2 className="section-title">🦾 FIRST Tech Challenge Tooling</h2>
            <ul className="projects-list">
              <li>🧭 <strong>Altair – Visual State-Machine Authoring for FTC</strong>
                <ul>
                  <li>A Tauri desktop app (Rust + React) where you draw a hierarchical state machine on a canvas and it compiles to plain, native Java 8 that runs on the robot at full speed — no runtime interpreter.</li>
                  <li>Structure is compiled to native code; tunable values are emitted as live-editable FTC Dashboard <span className="code">@Config</span> fields.</li>
                </ul>
              </li>
              <li>🎯 <strong>Splat – FTC Autonomous Sequence Builder</strong>
                <ul>
                  <li>A Python desktop app for designing autonomous paths on a 144×144" field with drag-and-drop waypoints, bezier curves, and robot-orientation previews — generating Java compatible with the Blob state-machine library.</li>
                </ul>
              </li>
              <li>🫧 <strong>blob – Holonomic Path Follower</strong>
                <ul>
                  <li>A lightweight field-relative mecanum path follower for FTC, used to build the solo 30-ball close auto in the DECODE season. Point-to-point PID driving on a pluggable goBILDA Pinpoint localizer.</li>
                </ul>
              </li>
              <li>📊 <strong>FTC Insight – EPA Analytics Platform</strong>
                <ul>
                  <li>A live-updating analytics platform for FTC using the Expected Points Added (EPA) rating system — team ratings, match predictions, and event analytics. Built with Next.js and FastAPI.</li>
                </ul>
              </li>
              <li>🚀 <strong>Pusher – One-Command FTC Deploy</strong>
                <ul>
                  <li>A single command to build an FTC project and deploy it straight to the robot.</li>
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
              <li>🔥 <strong>FireAware – Crowdsourced Fire-Spotting Platform</strong>
                <ul>
                  <li>Mobile users photograph distant fires; the backend triangulates bearings from multiple sightings and renders confirmed fires on a public map.</li>
                  <li>FastAPI + PostGIS bearing-ray triangulation with a single cross-platform Expo app (web / iOS / Android) using MapLibre GL and device sensors.</li>
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
              <li>🧮 <strong>Topological Arbitrage</strong>
                <ul>
                  <li>A market-neutral strategy on 1-minute crypto data using Topological Data Analysis — a rolling graph-diffusion residual signal from a correlation Laplacian plus persistent-homology regime features, with a risk-scaled allocator and a FastAPI paper-execution bridge.</li>
                </ul>
              </li>
              <li>🤖 <strong>NoIqTrader – Grid Trading Bot</strong>
                <ul>
                  <li>A grid-based trading bot with a backtesting engine, technical indicators, and parameter sweeps for strategy optimization.</li>
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
              <p>
                You can explore the source code and technical details for many of these projects on my{' '}
                <a 
                  href="https://github.com/PzmuV1517" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  GitHub profile
                </a>
                , where I share my ongoing work and collaborate with the developer community.
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