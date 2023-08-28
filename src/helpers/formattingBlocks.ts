import { convertToCamelCase, extractRepeaterFields } from "@/helpers/index";

interface Block {
	attributesJSON: string,
	blockImage: BlockImage[]
}

interface BlockImage {
	json: {
		url: string,
		id: string,
		name: string
	}
}

export const formattingBlocks = ( block: Block ) => {
	const {
		data : blockData,
		name
	} = JSON.parse( block?.attributesJSON || "{}" );
	const { blockImage } = block;
	
	const updatedBlockData = blockImage.reduce( ( data, image ) => {
		const item = JSON.parse( String( image?.json ) )
		if ( +item.id === +blockData[item.name] ) {
			data[item.name] = item.url?.includes( '.svg' ) ? item.component : item.url
		}
		return data;
	}, { ...blockData } );
	
	const blockName = convertToCamelCase( name );
	
	const transformedBlockData = Object.fromEntries(
		Object.entries( updatedBlockData ).filter( ( [key] ) => !key.startsWith( '_' ) )
	);
	
	const filteredBlockData = Object.entries( transformedBlockData )
	                                .filter( ( [key] ) => !key.includes( 'repeater' ) && !key.includes( 'items' ) && !key.includes( 'sections' ) )
	                                .reduce( ( obj, [key, value] ) => ({
		                                ...obj,
		                                [key] : value
	                                }), {} );
	
	const finallyBlockData = {
		...filteredBlockData,
		...extractRepeaterFields( transformedBlockData )
	};
	
	return {
		blockName,
		blockData : finallyBlockData
	};
}