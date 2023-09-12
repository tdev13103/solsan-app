import { convertToCamelCase, extractRepeaterFields } from "@/helpers/index";
import { JSDOM } from 'jsdom'

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

	const forbiddenTags = [
		'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'A', 'LI', 'TD', 'TH', 'BUTTON', 'LABEL', 'STRONG', 'EM', 'U', 'DEL',
		'INS', 'SPAN'
	];

	if ( name === 'acf/custom-wysiwyg-editor' ) {
		const content = blockData.custom_wysiwyg_editor;

		const { window } = new JSDOM( content );
		const document = window.document;

		const spans = document.querySelectorAll( 'span' );

		spans.forEach( span => {
			let parent = span.parentNode;
			let isForbidden = false;

			while ( parent && parent.nodeType === 1 ) {
				if ( forbiddenTags.includes( parent.nodeName ) ) {
					isForbidden = true;
					break;
				}
				parent = parent.parentNode;
			}

			if ( !isForbidden ) {
				const p = document.createElement( 'p' );
				span?.parentNode?.insertBefore( p, span );
				p.appendChild( span );
			}
		} );

		updatedBlockData.custom_wysiwyg_editor = document.body.innerHTML;
	}

	const blockName = convertToCamelCase( name );

	const transformedBlockData = Object.fromEntries(
		Object.entries( updatedBlockData ).filter( ( [key] ) => !key.startsWith( '_' ) )
	);

	const filteredBlockData = Object.entries( transformedBlockData )
	                                .filter( ( [key] ) => !key.includes( 'repeater' ) && !key.includes( 'items' ) && !key.includes( 'sections' ) && !key.includes( 'usp_cards' ) )
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