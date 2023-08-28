'use client'

import React from 'react';
import styled from '@emotion/styled';
import Container from "../Container";
import GridSystem from '../UI/Grid/GridSystem';
import Typography from '../UI/Typography';
import theme from "@/styles/theme";

interface CustomClassicProps {
	data?: {
		custom_classic: string;
		enabled_container?: boolean;
		grid_for_limit_content_width?: "grid-fullwidth" | "grid-4" | "grid-3" | "grid-2" | "grid-2-1" | "grid-1-2" | undefined;
	};
	className?: string;
	postDate?: string | number;
}

const ccb = 'custom-classic-block';

const CustomClassicWrapper = styled.div`
	padding-bottom: 50px;
	
	.custom-classic-block__wysiwyg-content {
		${ theme.p };
		margin-bottom: ${ theme.spaces.small };
		
		h1 {
			${ theme.h1 };
			margin-bottom: ${ theme.spaces.normal };
		}
		
		h2 {
			${ theme.h2 };
			margin-bottom: ${ theme.spaces.normal };
		}
		
		h3 {
			${ theme.h3 };
			margin-bottom: ${ theme.spaces.normal };
		}
		
		h4 {
			${ theme.h4 };
			margin-bottom: ${ theme.spaces.small };
		}
		
		h5 {
			${ theme.h5 };
			margin-bottom: ${ theme.spaces.small };
		}
		
		h6 {
			${ theme.h6 };
			margin-bottom: ${ theme.spaces.small };
		}
		
		ul, ol {
			padding-left: ${ theme.spaces.small1 };
			margin-bottom: ${ theme.spaces.normal };
			
			
			li, li * {
				${ theme.p };
			}
			
			li {
				margin-bottom: ${ theme.spaces.normal };
				position: relative;
				
				b {
					font-weight: 700;
				}
			}
		}
		
		p, span {
			display: block;
			${ theme.p };
			margin-bottom: ${ theme.spaces.small };
			
			a {
				${ theme.links.type_2 };
				word-break: break-all;
			}
		}
		
		b {
			font-weight: 700;
		}
		
		img.size-full {
			width: 100%;
		}
		
		figure.size-full img {
			width: 100%;
		}
		
		a {
			text-decoration: none;
			${ theme.links.type_2 };
			word-break: break-all;
		}
		
		.body_1_large {
			${ theme.body_1_large };
			margin-bottom: ${ theme.spaces.medium2 };
		}
		
		.body_2_large {
			${ theme.body_2_large };
			margin-bottom: ${ theme.spaces.medium2 };
		}
		
		.subheader1 {
			${ theme.subheader1 };
			margin-bottom: ${ theme.spaces.medium2 };
		}
		
		.btn-button_1 {
			${ theme.buttons.button_1 }
		}
		
		.btn-button_2 {
			${ theme.buttons.button_2 }
		}
		
		.btn-button_3 {
			${ theme.buttons.button_3 }
		}
		
		.btn-button_4 {
			${ theme.buttons.button_4 }
		}
		
	}
	
	
	@keyframes blinking_dot {
		from {
			opacity: 0;
		}
		
		to {
			opacity: 0.4;
		}
	}

`;


const CustomClassic: React.FC<CustomClassicProps> = ( {
	data,
	className,
	postDate = ''
} ) => {
	const customClassicHTML = data?.custom_classic;
	const enabledContainer = data?.enabled_container;
	const enabledGrid = data?.grid_for_limit_content_width;
	const postDateFormatted = (postDate) ? new Date( Number( postDate ) * 1000 ) : null;
	const month = (postDateFormatted) ? String( postDateFormatted.getMonth() + 1 ).padStart( 2, '0' ) : null;
	const day = (postDateFormatted) ? String( postDateFormatted.getDate() ).padStart( 2, '0' ) : null;
	
	return (
		<CustomClassicWrapper className={ `${ ccb } ${ className }` }>
			{
				enabledContainer && customClassicHTML &&
        <Container>
					{
						<GridSystem variant={ enabledGrid }
						            className={ `${ ccb }__wysiwyg-grid` }>
							<div className={ `${ ccb }__wysiwyg-content` }
							     dangerouslySetInnerHTML={ { __html : customClassicHTML } }/>
						</GridSystem>
					}
        
        </Container>
			}
			
			{
				!enabledContainer && customClassicHTML &&
        <GridSystem variant={ enabledGrid }
                    className={ `${ ccb }__wysiwyg-grid` }>
          <div className={ `${ ccb }__wysiwyg-content` }
               dangerouslySetInnerHTML={ { __html : customClassicHTML } }/>
        </GridSystem>
			}
			{
				postDateFormatted && month && day &&
        <Container>
          <Typography variant={ 'p' } type={ 'p' } style={ { paddingTop : '50px' } }>
						{ `${ postDateFormatted.getFullYear() }-${ month }-${ day }` }
          </Typography>
        </Container>
			}
		</CustomClassicWrapper>
	)
};

export default CustomClassic;
