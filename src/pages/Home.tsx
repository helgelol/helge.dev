import { Title } from '@solidjs/meta';
import { FaBrandsLinkedin, FaBrandsGithub, FaRegularEnvelope } from 'solid-icons/fa';
import { setModalOpened } from '../lib/store';
import './Home.css';

export default function Home() {
	return (
		<>
			<Title>helge - main</Title>
			<main class="home">
				<h1>Helge Falch</h1>
				<h2>Software Developer</h2>
				<div class="icons">
					<div
						role="button"
						tabindex={0}
						onKeyPress={() => setModalOpened(true)}
						onClick={() => setModalOpened(true)}
					>
						<div class="icon">
							<FaRegularEnvelope />
						</div>
					</div>
					<a
						href="https://github.com/helgelol"
						aria-label="GitHub"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div class="icon">
							<FaBrandsGithub />
						</div>
					</a>
					<a
						href="https://www.linkedin.com/in/helgelol/"
						aria-label="Linkedin"
						target="_blank"
						rel="noopener noreferrer"
					>
						<div class="icon">
							<FaBrandsLinkedin />
						</div>
					</a>
				</div>
			</main>
		</>
	);
}
