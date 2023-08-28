import { getClient } from "@/lib/apolloClient";
import { QUERY_POSTS_AND_PAGES_SEO } from "@/data/posts";

export async function sitemapOptions() {
	const { data } = await getClient().query( {
		query   : QUERY_POSTS_AND_PAGES_SEO,
		context : {
			fetchOptions : {
				next : { revalidate : 5 },
			},
		},
	} );
	
	return [...data.pages.nodes, ...data.posts.nodes];
}
