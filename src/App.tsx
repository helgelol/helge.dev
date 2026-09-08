import { createRouter } from '@solidjs/router';
import NavBar from './components/NavBar';
import Modal from './components/Modal';
import './App.css';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Blog from './pages/Blog';
import Article from './pages/Article';
import NotFound from './pages/NotFound';
import { Email } from './lib/Constants';
import { FaRegularCopy } from 'solid-icons/fa';
import Tooltip from './components/Tooltip';
import Button from './components/Button';
import { createSignal, ParentProps } from 'solid-js';

const Router = createRouter({
	routes: [
		{ path: '/', component: Home },
		{ path: '/projects', component: Projects },
		{ path: '/about', component: About },
		{ path: '/blog', component: Blog },
		{ path: '/blog/:slug', component: Article },
		{ path: '*404', component: NotFound }
	]
});

function Layout(props: ParentProps) {
	const [copied, setCopied] = createSignal(false);

	const copy = () => {
		window.navigator.clipboard.writeText(Email);
	};

	const handleCopy = () => {
		setCopied(true);
		copy();
		window.setTimeout(() => setCopied(false), 500);
	};

	return (
		<>
			<Modal>
				<div class="modalContainer">
					<h1>Email:</h1>
					<div>
						<p>{Email}</p>
						&nbsp;
						<div class="tooltip">
							<Tooltip tooltip={copied() ? 'Copied' : 'Copy'}>
								<div
									id="clipboard"
									role="button"
									tabindex={0}
									onKeyPress={handleCopy}
									onClick={handleCopy}
								>
									<div>
										<FaRegularCopy />
									</div>
								</div>
							</Tooltip>
						</div>
					</div>
					<Button>Send Email</Button>
				</div>
			</Modal>
			<NavBar />
			{props.children}
			<footer>
				made with <a href="https://www.solidjs.com/">solidjs</a> ❤️
			</footer>
		</>
	);
}

export default function App() {
	return <Router>{(routeProps) => <Layout>{routeProps.children}</Layout>}</Router>;
}
