import { StrictMode, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout, LoadingSpinner } from './components';
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
const PageLoadingFallback = ({ message = "Loading page..." }: { message?: string }) => (
  <LoadingSpinner message={message} variant="terminal" size="medium" />
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
					<Suspense fallback={<PageLoadingFallback message="cat about_me.txt" />}>
						<AboutMe />
					</Suspense>
				)
			},
			{ 
				path: 'my-achievements', 
				element: (
					<Suspense fallback={<PageLoadingFallback message="cat achievements.txt" />}>
						<MyAchievements />
					</Suspense>
				)
			},
			{ 
				path: 'my-projects', 
				element: (
					<Suspense fallback={<PageLoadingFallback message="cat projects.txt" />}>
						<MyProjects />
					</Suspense>
				)
			},
			{ 
				path: 'my-skills', 
				element: (
					<Suspense fallback={<PageLoadingFallback message="cat skills.txt" />}>
						<MySkills />
					</Suspense>
				)
			},
			{ 
				path: 'contact', 
				element: (
					<Suspense fallback={<PageLoadingFallback message="cat contact.txt" />}>
						<Contact />
					</Suspense>
				)
			},
		],
	},
	{
		path: '*',
		element: (
			<Suspense fallback={<PageLoadingFallback message="ls /dev/null" />}>
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
