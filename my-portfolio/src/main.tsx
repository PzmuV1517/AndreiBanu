import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';

// Placeholder components
const Home = () => <h1>Home</h1>;
const AboutMe = () => <h1>About Me</h1>;
const MyAchievements = () => <h1>My Achievements</h1>;
const Contact = () => <h1>Contact</h1>;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about-me" element={<AboutMe />} />
          <Route path="my-achievements" element={<MyAchievements />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
