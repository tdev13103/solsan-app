import { getClient } from "@/lib/apolloClient";
import { QUERY_POSTS } from "@/data/posts";

export async function postsSettings() {
	const { data } = await getClient().query( {
		query   : QUERY_POSTS,
		variables: { first: 9, after: null },
		context : {
			fetchOptions : {
				next : { revalidate : 5 },
			},
		},
	} );
	return data?.posts;
}
