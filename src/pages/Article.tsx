import { Title } from '@solidjs/meta';
import { Loading, Show, createMemo } from 'solid-js';
import { useParams } from '@solidjs/router';
import { FaSolidExternalLinkAlt } from 'solid-icons/fa';
import { ArticleEndPoint } from '../lib/Constants';
import './Article.css';

type DevArticle = { title: string; url: string; body_html: string };

export default function Article() {
	const params = useParams();

	const article = createMemo(async () => {
		const res = await fetch(`${ArticleEndPoint}/${params.slug}`);
		return res.ok ? ((await res.json()) as DevArticle) : null;
	});

	return (
		<Loading fallback={<div class="articleContainer" />}>
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
								{/* eslint-disable-next-line solid/no-innerhtml */}
								<div innerHTML={a().body_html} />
							</>
						)}
					</Show>
				</div>
			</div>
		</Loading>
	);
}
