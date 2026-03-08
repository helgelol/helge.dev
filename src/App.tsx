import { Router, Route } from '@solidjs/router';
import { MetaProvider } from '@solidjs/meta';
import NavBar from './components/NavBar';
import Modal from './components/Modal';
import './App.css';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Blog from './pages/Blog';
import Article from './pages/Article';
import { modalOpened, setModalOpened } from './lib/store';
import { Email } from './lib/Constants';
import { FaRegularCopy } from 'solid-icons/fa';
import Tooltip from './components/Tooltip';
import Button from './components/Button';
import { createSignal } from 'solid-js';

function Layout(props: { children?: any }) {
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
	return (
		<MetaProvider>
			<Router root={Layout}>
				<Route path="/" component={Home} />
				<Route path="/projects" component={Projects} />
				<Route path="/about" component={About} />
				<Route path="/blog" component={Blog} />
				<Route path="/blog/:slug" component={Article} />
			</Router>
		</MetaProvider>
	);
}
