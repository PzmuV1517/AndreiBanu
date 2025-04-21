// filepath: /home/ubuntu/AndreiBanu/my-portfolio/src/MyAchievements.tsx
import React from 'react';
import './App.css'; // Reuse existing styles if applicable

const MyAchievements: React.FC = () => {
    return (
        <div className="page-content">
            <h1>My Achievements</h1>
            <p>Details about my achievements will be listed here.</p>
            {/* Add a link back to the terminal for now */}
            <a href="/" className="page-link">Return to Terminal</a>
        </div>
    );
};

export default MyAchievements;