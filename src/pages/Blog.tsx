import { Title } from '@solidjs/meta';
import { For, Show, createResource } from 'solid-js';
import { UserInfoEndpoint } from '../lib/Constants';
import './Blog.css';

interface Article {
	id: number;
	title: string;
	description: string;
	tags: string;
	category: string;
	link: string;
}

const blackListedArticles = [422939];

export default function Blog() {
	const [articles] = createResource(async () => {
		const res = await fetch(`${UserInfoEndpoint}helgelol`);
		return res.json() as Promise<Article[]>;
	});

	const filteredArticles = () => {
		const data = articles() ?? [];
		return data.filter((a: Article) => !blackListedArticles.includes(a?.id));
	};

	return (
		<>
			<Title>helge - blog</Title>
			<div class="articlesContainer">
				<div class="articles">
					<h1>Articles</h1>
					<For each={filteredArticles()}>
						{(article: Article) => (
							<div class="article">
								<div class="header">
									<h2>{article.title}</h2>
									<div>Tags: {article.tags || article.category}</div>
								</div>
								<p>{article.description || ''}</p>
								<a
									href={article.id ? `/blog/${article.id}` : article.link}
									target={!article.id ? '_blank' : '_self'}
								>
									<div class="button">Read Article =&gt;</div>
								</a>
							</div>
						)}
					</For>
					<Show when={!articles.loading && filteredArticles().length === 0}>
						<div>No Articles yet.</div>
					</Show>
				</div>
			</div>
		</>
	);
}
