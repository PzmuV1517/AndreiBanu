// filepath: /home/ubuntu/AndreiBanu/my-portfolio/src/AboutMe.tsx
import React from 'react';
import './App.css'; // Reuse existing styles if applicable

const AboutMe: React.FC = () => {
    return (
        <div className="page-content">
            <h1>About Me</h1>
            <p>Welcome to the About Me section. Content coming soon!</p>
            {/* Add a link back to the terminal for now */}
            <a href="/" className="page-link">Return to Terminal</a>
        </div>
    );
};

export default AboutMe;