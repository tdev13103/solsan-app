import React from 'react';
import { pageSettings } from '@/lib/pageSettings';
import PageBlocks from "@/components/PageBlocks";
import { Metadata } from "next";
import Error404 from "@/components/Error404";

export async function generateMetadata( { params }: { params: { slug: string } } ): Promise<Metadata> {
	const data = await pageSettings( params?.slug );
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

const Page = async ( { params }: { params: { slug: string[] | string } } ) => {
	const { slug } = params;
	try {
		const data = await pageSettings( slug );
		
		if ( data !== null ) {
			const { blocks } = data;
			const { seo }: any = data;
			const { pageAdditionalSettings } = data
			
			return (
				<div className={ `${ pageAdditionalSettings?.isItGeneralPage ? 'page-without-banner' : '' }` }>
					{
						seo?.schema?.raw &&
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={ { __html : JSON.stringify( seo?.schema?.raw ) } }
            />
					}
					<PageBlocks blocks={ blocks }/>
				</div>
			);
		}
		
		return <Error404/>
	}
	catch ( error ) {
		console.error( 'Error retrieving page settings:', error );
		return null;
	}
};

export default Page;
