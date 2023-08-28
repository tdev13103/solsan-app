import React from 'react';
import { postsSettings } from "@/lib/postsSettings";
import { Metadata } from "next";
import { componentImports } from "@/helpers/componentImports";
import Error404 from "@/components/Error404";
import { formattingBlocks } from "@/helpers/formattingBlocks";

interface Post {
	slug: string;
}

interface Block {
	attributesJSON: string;
	blockImage: BlockImage[];
	blockName: string;
	blockData: {}
}

interface BlockImage {
	json: {
		url: string,
		id: string,
		name: string
	}
}

export async function generateMetadata(
	{ params : { slug } }: { params: { slug: string } }
): Promise<Metadata> {
	const posts = await postsSettings();
	const currentPost = posts?.nodes?.filter( ( post: Post ) => post?.slug === slug )?.[0]
	const { seo }: any = currentPost;
	
	return {
		title     : seo?.opengraphTitle,
		openGraph : {
			title       : seo?.opengraphTitle,
			description : seo?.opengraphDescription,
		},
	}
}

const Page = async ( { params : { slug } }: { params: { slug: string } } ) => {
	try {
		const posts = await postsSettings();
		const currentPost = posts?.nodes?.filter( ( post: Post ) => post?.slug === slug )?.[0]
		const { seo } = currentPost
		const transformedBlocks = currentPost?.blocks?.map( ( block: Block ) => formattingBlocks( block ) );
		
		return (
			<div className='page-without-banner'>
				{
					seo?.schema?.raw &&
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={ { __html : JSON.stringify( seo?.schema?.raw ) } }
          />
				}
				
				
				{ transformedBlocks?.map( ( item: Block, index: number ) => {
					
					const DynamicComponent = componentImports[item?.blockName];
					return <DynamicComponent key={ index } posts={ posts } data={ item?.blockData }/>;
				} ) }
				
				{ !transformedBlocks?.length && <Error404/> }
			</div>
		);
	}
	catch ( error ) {
		console.error( 'Error retrieving page settings:', error );
		return null;
	}
};

export default Page;
