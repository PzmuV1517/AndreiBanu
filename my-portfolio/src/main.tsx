import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout, AboutMe, MyAchievements, MyProjects, MySkills, Contact, NotFound } from './components';
import App from './App.tsx';

import './styles/index.css';
import './styles/App.css';

// Router configuration with nested routes under Layout
const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <App /> }, // Terminal interface
			{ path: 'about-me', element: <AboutMe /> },
			{ path: 'my-achievements', element: <MyAchievements /> },
			{ path: 'my-projects', element: <MyProjects /> },
			{ path: 'my-skills', element: <MySkills /> },
			{ path: 'contact', element: <Contact /> },
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
