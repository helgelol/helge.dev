import { Title } from '@solidjs/meta';
import { For } from 'solid-js';
import projects from '../lib/Projects';
import './Projects.css';

export default function Projects() {
	return (
		<>
			<Title>helge - projects</Title>
			<div class="projectContainer">
				<div class="projects">
					<h1>Projects</h1>
					<p class="note">
						Most projects delivered to customers, or developed and used inhouse are ineglible to be
						listed here, as they are protected under their respective NDA's.
					</p>
					<For each={projects}>
						{(project) => (
							<div class="project">
								<div class="header">
									<h2>{project.title}</h2>
									<div class="techsContainer">
										Tech:
										<div class="techs">
											<For each={project.technologies}>{(tech) => <div>{tech}</div>}</For>
										</div>
									</div>
								</div>
								<p>{project.description}</p>
								<a href={project.url} target="_blank" rel="noopener noreferrer">
									<div class="button">Project url -&gt;</div>
								</a>
							</div>
						)}
					</For>
				</div>
			</div>
		</>
	);
}
