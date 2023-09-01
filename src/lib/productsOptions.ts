import { getClient } from "@/lib/apolloClient";
import { QUERY_PRODUCTS } from "@/data/products";

export async function productsSettings() {
	const { data } = await getClient().query( {
		query   : QUERY_PRODUCTS,
		context : {
			fetchOptions : {
				next : { revalidate : 5 },
			},
		},
	} );
	
	return data?.products?.nodes;
}
