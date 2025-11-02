import { ArticleEndPoint } from '$lib/Constants';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const response = await fetch(`${ArticleEndPoint}/${params.slug}`);
	return {
		article: response.ok && (await response.json())
	};
}) satisfies PageLoad;
