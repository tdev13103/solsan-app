import { QUERY_THEME_SETTINGS } from "@/data/queries";
import { getClient } from "@/lib/apolloClient";

export async function themeSettings() {
	const { data } = await getClient().query( {
		query   : QUERY_THEME_SETTINGS,
		context : {
			fetchOptions : {
				next : { revalidate : 5 },
			},
		},
	} );
	return data?.themeGeneralSettings?.theme_settings;
}
