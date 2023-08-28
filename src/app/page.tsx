import React from 'react';
import { pageSettings } from '@/lib/pageSettings';
import PageBlocks from "@/components/PageBlocks";
import { Metadata } from "next";
import Error404 from "@/components/Error404";
import OfferForm from "@/components/Forms/OfferForm";

type Props = {
	searchParams: Record<string, string> | null | undefined;
};

export async function generateMetadata(): Promise<Metadata> {
	const data = await pageSettings( 'home' );
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

const Page = async ( { searchParams }: Props ) => {
	const showModal = searchParams?.modal;
	try {
		const data = await pageSettings( 'home' );
		
		if ( data !== null ) {
			const { blocks } = data;
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
					<PageBlocks blocks={ blocks }/>
					{ showModal && <OfferForm/> }
				</>
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

