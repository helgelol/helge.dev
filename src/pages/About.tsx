import { Title } from '@solidjs/meta';
import { For } from 'solid-js';
import skills from '../lib/Skills';
import './About.css';

export default function About() {
	return (
		<>
			<Title>helge - about</Title>
			<div class="container">
				<main>
					<h1>About</h1>
					<p>
						I'm is a seasoned software developer with over 15 years of experience. <br />
						My journey in the software field spans years of hands-on experience and a rich
						background in Software Development, Containers and Linux in both large enterprises and
						small companies, either as a consultant or employee.
					</p>
					<h2>Skills</h2>
					<For each={Object.entries(skills)}>
						{([section, technologies]) => (
							<ul>
								<li>
									<h4>{section}:</h4>
									<div class="list">
										<For each={technologies}>{(technology) => <div>{technology}</div>}</For>
									</div>
								</li>
							</ul>
						)}
					</For>
				</main>
			</div>
		</>
	);
}
