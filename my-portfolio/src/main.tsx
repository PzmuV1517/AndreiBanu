import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout.tsx'; // Import the new Layout component
import App from './App.tsx'; // Terminal App
import AboutMe from './AboutMe.tsx';
import MyAchievements from './MyAchievements.tsx';
import Contact from './Contact.tsx';

import './index.css';
import './App.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Use Layout component for all routes */}
        <Route path="/" element={<Layout />}>
          {/* App (Terminal) is the index route within the Layout */}
          <Route index element={<App />} />
          {/* Other pages are also nested within Layout */}
          <Route path="about-me" element={<AboutMe />} />
          <Route path="my-achievements" element={<MyAchievements />} />
          <Route path="contact" element={<Contact />} />
          {/* Add more routes here as needed */}
        </Route>
        {/* You could have routes outside the Layout here if needed */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
