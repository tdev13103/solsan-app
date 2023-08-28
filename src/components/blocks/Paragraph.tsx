'use client'

import React, { FC } from 'react';
import styled from '@emotion/styled';

interface ParagraphProps {
	data: {
		innerHTML: string;
	}
}

const pb = 'paragraph-block';

const Wrapper = styled.div`
	
	.paragraph-block {
	
	}
`;

const Paragraph: FC<ParagraphProps> = ( { data } ) => {
	
	const paragraphHTML = data?.innerHTML;
	
	return (
		<Wrapper className={ `${ pb }` }>
			<p className={ `${ pb }__content` } dangerouslySetInnerHTML={ { __html : paragraphHTML } }/>
		</Wrapper>
	)
};

export default Paragraph;