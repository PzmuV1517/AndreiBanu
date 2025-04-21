// filepath: /home/ubuntu/AndreiBanu/my-portfolio/src/Contact.tsx
import React from 'react';
import './App.css'; // Reuse existing styles if applicable

const Contact: React.FC = () => {
    return (
        <div className="page-content">
            <h1>Contact</h1>
            <p>Contact information will be available here soon.</p>
            {/* Add a link back to the terminal for now */}
            <a href="/" className="page-link">Return to Terminal</a>
        </div>
    );
};

export default Contact;