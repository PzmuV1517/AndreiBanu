import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout, AboutMe, MyAchievements, MyProjects, MySkills, Contact } from './components'; // Import components
import App from './App.tsx'; // Terminal App

import './styles/index.css';
import './styles/App.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <App /> },
			{ path: 'about-me', element: <AboutMe /> },
			{ path: 'my-achievements', element: <MyAchievements /> },
			{ path: 'my-projects', element: <MyProjects /> },
			{ path: 'my-skills', element: <MySkills /> }, // Add this route
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
