import React from 'react';
import { componentImports } from "@/helpers/componentImports";
import Error404 from "@/components/Error404";
import { postsSettings } from "@/lib/postsSettings";

interface Blocks {
	blocks: {
		blockName: string;
		blockData: Record<string, unknown>;
	}[];
}

const PageBlocks = async ( { blocks }: Blocks ) => {
	const posts = await postsSettings();
	
	const filteredBlocks = blocks?.filter(
		( item ) => componentImports[item?.blockName] !== undefined
	);
	
	return (
		<>
			{ filteredBlocks?.map( ( item, index: number ) => {
				
				const DynamicComponent = componentImports[item?.blockName];
				return <DynamicComponent key={ index } posts={ posts } data={ item?.blockData }/>;
			} ) }
			
			{ !filteredBlocks?.length && <Error404/> }
		</>
	);
};

export default PageBlocks;
