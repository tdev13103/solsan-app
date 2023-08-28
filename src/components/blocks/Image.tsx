'use client'

import React, { FC } from 'react';
import Container from "../Container";
import styled from "@emotion/styled";
import theme from "@/styles/theme";

interface ImageBlockProps {
	data: {
		innerHTML: string
	}
}

const ImageWrapper = styled( 'div' )`
	overflow: hidden;
	padding-top: ${ theme.spaces.large2 };
	padding-bottom: ${ theme.spaces.large2 };
	
	@media screen and (max-width: 768px) {
		padding-bottom: ${ theme.spaces.medium2 };
		padding-top: ${ theme.spaces.medium2 };
	}
	
	figure {
		display: flex;
		justify-content: center;
		
		&.size-full {
			width: 100%;
		}
		
		img {
			max-width: 100%;
			width: 100%;
		}
	}
`;

const ImageBlock: FC<ImageBlockProps> = ( { data } ) => {
	return (
		<ImageWrapper className="image-block">
			<Container>
				<div dangerouslySetInnerHTML={ { __html : data?.innerHTML } }/>
			</Container>
		</ImageWrapper>
	);
};

export default ImageBlock;