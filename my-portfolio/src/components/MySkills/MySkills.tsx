import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MySkills.css';

const MySkills: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "> My Skills & Technologies_";

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
    <div className="skills-container">
      <Link to="/" className="back-to-terminal-btn">
        ← Terminal
      </Link>
      
      <div className="skills-content">
        <div className="retro-terminal-header">
          <div className="header-buttons">
            <div className="header-button"></div>
            <div className="header-button"></div>
            <div className="header-button"></div>
          </div>
          <div className="terminal-title">skills.txt</div>
        </div>
        
        <div className="skills-body">
          <h1 className="skills-title">
            <div className="typewriter-container">
              <span className="typewriter-text">{displayedText}</span>
              <span className={`cursor ${showCursor ? '' : 'blink'}`}></span>
            </div>
          </h1>

          <div className="skills-description">
            <p>
              Welcome to my <span className="highlight">technical skills overview</span>! 
              Here's a comprehensive breakdown of the technologies and tools I work with.
            </p>

            <h2 className="section-title">🧑‍💻 Programming Languages</h2>
            <ul className="skills-list">
              <li>C, C++, C#</li>
              <li>Python, Bash, Lua</li>
              <li>Java, JavaScript, TypeScript</li>
              <li>HTML5, CSS, SQL</li>
            </ul>

            <h2 className="section-title">⚙️ Frameworks & Libraries</h2>
            <ul className="skills-list">
              <li>.NET, Node.js, React, React Native, Next.js</li>
              <li>Tailwind CSS, Vite</li>
              <li>TensorFlow, PyTorch, NumPy, SciPy</li>
            </ul>

            <h2 className="section-title">🧰 Tools & Platforms</h2>
            <ul className="skills-list">
              <li>Git, GitHub, Docker</li>
              <li>NPM, Unity, Unreal Engine</li>
              <li>Windows Terminal, Raspberry Pi</li>
              <li>Arduino, Home Assistant</li>
            </ul>

            <h2 className="section-title">🧠 AI & Data Science</h2>
            <ul className="skills-list">
              <li>TensorFlow, PyTorch, NumPy, SciPy</li>
              <li>LLMs via <span className="code">Ollama</span> & <span className="code">MCP</span> integration</li>
              <li>Basic model fine-tuning and prompt orchestration</li>
              <li>AI-enhanced robotics & autonomous systems</li>
            </ul>

            <h2 className="section-title">🌐 Cloud & Infrastructure</h2>
            <ul className="skills-list">
              <li>AWS, Microsoft Azure, Google Cloud, Firebase</li>
              <li>Apache, Nginx</li>
              <li>Oracle, MySQL, PostgreSQL, SQLite</li>
            </ul>

            <h2 className="section-title">🧑‍🎨 Design & Media</h2>
            <ul className="skills-list">
              <li>Adobe Photoshop, Illustrator, After Effects, Lightroom</li>
              <li>GIMP, Canva</li>
            </ul>

            <h2 className="section-title">🕵️‍♂️ Cybersecurity & Networking</h2>
            <ul className="skills-list">
              <li>Cisco networking (custom router shell tools)</li>
              <li>Penetration testing tools: <span className="code">Netcat</span>, <span className="code">WPScan</span>, <span className="code">Metasploit</span></li>
              <li>Vulnerability analysis automation (custom LLM tools)</li>
            </ul>

            <h2 className="section-title">📱 APIs & Automation</h2>
            <ul className="skills-list">
              <li>Telegram Bot API, WhatsApp Business API</li>
              <li>Coinbase API (Crypto trading bot)</li>
              <li>Integration of mobile and backend systems (e.g., drone control apps)</li>
            </ul>

            <h2 className="section-title">🚀 Robotics & IoT</h2>
            <ul className="skills-list">
              <li>FTC & FLL robotics: hardware, manufacturing, design</li>
              <li>Autonomous rescue drones (vision + navigation)</li>
              <li>Bluetooth DoS tools on Raspberry Pi</li>
            </ul>

            <h2 className="section-title">💼 Project Management & Productivity</h2>
            <ul className="skills-list">
              <li>Trello, WordPress, Steam, Itch.io</li>
            </ul>

            <div className="closing">
              <p>
                📌 <em>These are technologies and platforms I've used in personal, academic, or competitive projects, often combining multiple stacks into integrated systems.</em>
              </p>
              <p>
                My approach to learning new technologies is <em>hands-on and project-driven</em>, 
                allowing me to quickly adapt and integrate diverse tools into cohesive solutions.
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

export default MySkills;