import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './App.css';

// Session storage key
const BOOT_COMPLETED_KEY = 'portfolioBootCompleted';

const navPages = [
    { name: 'Terminal', path: '/' },
    { name: 'About Me', path: '/about-me' },
    { name: 'My Achievements', path: '/my-achievements' },
    { name: 'Contact', path: '/contact' },
];

const Layout: React.FC = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState<boolean>(() => {
        return sessionStorage.getItem(BOOT_COMPLETED_KEY) === 'true';
    });
    const [isCrtEffectActive, setIsCrtEffectActive] = useState<boolean>(false);

    const location = useLocation();
    const isTerminalPage = location.pathname === '/';

    useEffect(() => {
        const activateCrt = () => setIsCrtEffectActive(true);

        if (sessionStorage.getItem(BOOT_COMPLETED_KEY) === 'true') {
            activateCrt();
        } else {
            window.addEventListener('bootInitiated', activateCrt);
        }

        return () => {
            window.removeEventListener('bootInitiated', activateCrt);
        };
    }, []);

    useEffect(() => {
        const showButton = () => {
            if (sessionStorage.getItem(BOOT_COMPLETED_KEY) === 'true' && !isButtonVisible) {
                setTimeout(() => setIsButtonVisible(true), 50);
            }
        };

        if (!isButtonVisible) {
            window.addEventListener('portfolioBootFinished', showButton);
        }
        showButton();

        return () => {
            window.removeEventListener('portfolioBootFinished', showButton);
        };
    }, [isButtonVisible]);

    const toggleOverlay = () => setIsOverlayOpen(!isOverlayOpen);
    const closeOverlay = () => setIsOverlayOpen(false);

    const buttonClasses = [
        'easy-mode-button',
        isButtonVisible ? 'visible' : ''
    ].filter(Boolean).join(' ');

    const containerClasses = [
        'site-container',
        isTerminalPage && isCrtEffectActive ? 'crt' : ''
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses}>
            <button
                className={buttonClasses}
                onClick={toggleOverlay}
                aria-label="Toggle Easy Navigation Mode"
                title="Easy Navigation Mode"
                disabled={!isButtonVisible}
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
            <Outlet />
        </div>
    );
};

export default Layout;