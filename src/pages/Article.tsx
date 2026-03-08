import { Title } from '@solidjs/meta';
import { Show, createResource } from 'solid-js';
import { useParams } from '@solidjs/router';
import { FaSolidExternalLinkAlt } from 'solid-icons/fa';
import { ArticleEndPoint } from '../lib/Constants';
import './Article.css';

export default function Article() {
	const params = useParams();

	const [article] = createResource(
		() => params.slug,
		async (slug) => {
			const res = await fetch(`${ArticleEndPoint}/${slug}`);
			return res.ok ? res.json() : null;
		}
	);

	return (
		<>
			<Title>Helge — {article()?.title || 'Missing article'}</Title>
			<div class="articleContainer">
				<div class="article">
					<Show when={article()}>
						{(a) => (
							<>
								<h1 class="title">
									<a href={a().url} target="_blank" rel="noreferrer">
										{a().title}
									</a>
									<a class="icon" href={a().url} target="_blank">
										<FaSolidExternalLinkAlt />
									</a>
								</h1>
								<div innerHTML={a().body_html} />
							</>
						)}
					</Show>
				</div>
			</div>
		</>
	);
}
