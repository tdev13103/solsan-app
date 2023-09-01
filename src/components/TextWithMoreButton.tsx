import React, { FC, useState } from 'react';
import Typography from "@/components/UI/Typography";
import ArrowDown from "@/components/Icons/ArrowDown";

interface TextWithMoreButton {
	text: string;
	maxChars: number
}

const TextWithMoreButton: FC<TextWithMoreButton> = ( {
	text,
	maxChars
} ) => {
	const [showFullText, setShowFullText] = useState( false );
	
	const truncatedText = showFullText ? text : text.slice( 0, maxChars );
	
	const toggleText = () => {
		setShowFullText( !showFullText );
	};
	
	return (
		<div>
			<Typography
				className={ 'product-modal__content' }
				variant={ 'body_1_large' } dangerouslySetInnerHTML={ { __html : truncatedText } }/>
			{ text.length > maxChars && (
				<div className={ `product-modal__show-more_wrap ${ showFullText ? 'open' : '' } ` }>
					<button className={ 'product-modal__show-more' } onClick={ toggleText }>
						{ showFullText ? 'Visa mindre' : 'Visa mer' }
					</button>
					<ArrowDown/>
				</div>
			
			) }
		
		</div>
	);
};

export default TextWithMoreButton;
