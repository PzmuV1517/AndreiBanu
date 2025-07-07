import { StrictMode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from './components';
import App from './App.tsx';

import './styles/index.css';
import './styles/App.css';

// Lazy load secondary pages for better performance
const AboutMe = lazy(() => import('./components/AboutMe'));
const MyAchievements = lazy(() => import('./components/MyAchievements'));
const MyProjects = lazy(() => import('./components/MyProjects'));
const MySkills = lazy(() => import('./components/MySkills'));
const Contact = lazy(() => import('./components/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

// Loading component for page transitions
const PageLoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#121212',
    color: '#5beeff',
    fontFamily: '"Space Mono", "Courier New", monospace',
    fontSize: '1.2rem'
  }}>
    Loading...
  </div>
);

// Router configuration with nested routes under Layout
const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <App /> }, // Terminal interface
			{ 
				path: 'about-me', 
				element: (
					<Suspense fallback={<PageLoadingFallback />}>
						<AboutMe />
					</Suspense>
				)
			},
			{ 
				path: 'my-achievements', 
				element: (
					<Suspense fallback={<PageLoadingFallback />}>
						<MyAchievements />
					</Suspense>
				)
			},
			{ 
				path: 'my-projects', 
				element: (
					<Suspense fallback={<PageLoadingFallback />}>
						<MyProjects />
					</Suspense>
				)
			},
			{ 
				path: 'my-skills', 
				element: (
					<Suspense fallback={<PageLoadingFallback />}>
						<MySkills />
					</Suspense>
				)
			},
			{ 
				path: 'contact', 
				element: (
					<Suspense fallback={<PageLoadingFallback />}>
						<Contact />
					</Suspense>
				)
			},
		],
	},
	{
		path: '*',
		element: (
			<Suspense fallback={<PageLoadingFallback />}>
				<NotFound />
			</Suspense>
		),
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
