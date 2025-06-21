import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './Layout.tsx'; // Import the new Layout component
import App from './App.tsx'; // Terminal App
import AboutMe from './AboutMe.tsx';
import MyAchievements from './MyAchievements.tsx';
import Contact from './Contact.tsx';

import './index.css';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'about-me', element: <AboutMe /> },
      { path: 'my-achievements', element: <MyAchievements /> },
      { path: 'contact', element: <Contact /> },
      // Add more routes here as needed
    ],
  },
  // You could have routes outside the Layout here if needed
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
