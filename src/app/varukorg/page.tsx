import React from 'react';
import { pageSettings } from "@/lib/pageSettings";
import ProductCart from "@/components/ProductCart";
import Error404 from "@/components/Error404";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
	const data = await pageSettings( 'varukorg' );
	if ( data !== null ) {
		const { seo }: any = data;
		
		return {
			title     : seo?.opengraphTitle,
			openGraph : {
				title       : seo?.opengraphTitle,
				description : seo?.opengraphDescription,
			},
		}
	}
	return {}
}

const VarukorgPage = async () => {
	const data = await pageSettings( 'varukorg' );
	if ( data !== null ) {
		const { seo }: any = data;
		
		return (
			<>
				{
					seo?.schema?.raw &&
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={ { __html : JSON.stringify( seo?.schema?.raw ) } }
          />
				}
				<ProductCart data={ data }/>
			</>
		);
	}
	return <Error404/>
};

export default VarukorgPage;