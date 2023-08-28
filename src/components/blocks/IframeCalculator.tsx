'use client'

import React from 'react';
import styled from '@emotion/styled';
import Container from "../Container";
import Typography from "../UI/Typography";
import theme from "@/styles/theme";

interface IframeCalculatorProps {
	data :{
		iframe_link:string
	}
}


// @ts-ignore
const Wrapper = styled.div`
	padding-bottom: ${ theme.spaces.large21 };
	padding-top: ${ theme.spaces.large16 };
	margin-bottom: ${ theme.spaces.medium2 };
	overflow: hidden;
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
		margin-bottom: ${ theme.spaces.normal };
		padding-top: ${ theme.spaces.large18 };
		padding-bottom: ${ theme.spaces.large4 };
	}
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
		padding-bottom: ${ theme.spaces.normal };
	}

`;

const IframeCalculator:React.FC<IframeCalculatorProps> = ( { data } ) => {
	const iframeLink = data?.iframe_link;
	
	return (
		<Wrapper className={ 'iframe-calc-block' }>
			<Container>
				{
					iframeLink &&
          <iframe src={ iframeLink }
                  width="100%"
                  height="850px"
                  frameBorder="0"
                  className={ 'iframe-calc-block__iframe' }>
            <Typography className={ 'iframe-calc-block__iframe-label' } variant={ 'h5' } type={ 'h5' }>
              Your browser does not support iframes.
            </Typography>
          </iframe>
				}
			</Container>
		</Wrapper>
	);
};

export default IframeCalculator;
