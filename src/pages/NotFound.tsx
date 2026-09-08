import { Title } from '@solidjs/meta';
// Reuses the centered, full-height `main.home` layout rather than duplicating it.
import './Home.css';

export default function NotFound() {
	return (
		<>
			<Title>helge - not found</Title>
			<main class="home">
				<h1>404</h1>
				<h2>Page not found</h2>
				<a href="/">Back to home &gt;</a>
			</main>
		</>
	);
}
