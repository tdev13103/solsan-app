'use client'

import React from 'react';
import styled from "@emotion/styled";
import Container from "../Container";
import { generateKey } from "@/helpers";
import GridSystem from "../UI/Grid/GridSystem";
import Typography from "../UI/Typography";
import Svg from "@/components/Svg";
import theme from "@/styles/theme";

interface SolsamStepByStepProps {
	data: {
		description: string;
		item_repeater: {
			icon: string;
			item_desc: string;
			item_title: string;
		}[]
		title: string;
	}
}


const Wrapper = styled( 'div' )`
	padding: ${ theme.spaces.large1 } 0;
	counter-reset: step-section;
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m1270 }) {
		padding-top: ${ theme.spaces.medium2 };
		padding-bottom: ${ theme.spaces.medium2 };
	}
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
		padding-top: ${ theme.spaces.normal };
		padding-bottom: ${ theme.spaces.normal };
	}
	
	.step-by-step {
		@media screen and (max-width: ${ theme.responsiveMediaSizes.m768 }) {
			padding: 0 ${ theme.spaces.normal };
		}
		
		&__list {
			grid-column-gap: ${ theme.spaces.gridGap2 };
			grid-row-gap: ${ theme.spaces.medium3 };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m1024 }) {
				grid-template-columns: repeat(2, 1fr);
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				grid-template-columns: 1fr;
				grid-row-gap: ${ theme.spaces.medium2 };
			}
		}
		
		&__title {
			margin-bottom: ${ theme.spaces.normal };
		}
		
		&__description {
			margin-bottom: ${ theme.spaces.large1 };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-bottom: ${ theme.spaces.medium2 };
			}
		}
		
		&__icon {
			margin-right: ${ theme.spaces.small };
			background-color: ${ theme.colors.colorPurpleLight };
			border-radius: 12px;
			padding: ${ theme.spaces.mini };
			display: flex;
			min-width: 40px;
			width: 40px;
			height: 40px;
			position: relative;
			z-index: 1;
			
			&:after {
				position: absolute;
				counter-increment: step-section;
				content: counter(step-section);
				left: -12px;
				top: -12px;
				width: 24px;
				height: 24px;
				z-index: 2;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%;
				background-color: ${ theme.colors.colorNavy };
				color: ${ theme.colors.colorSkyLight };
			}
			
			img {
				max-width: 100%;
				width: 100%;
				height: auto;
			}
		}
		
		&__item {
			display: flex;
		}
		
		&__item-info {
		
		}
		
		&__item-title {
			margin-bottom: ${ theme.spaces.small };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-bottom: ${ theme.spaces.mini };
				font-size: 16px;
			}
		}
		
		&__item-description {
			color: ${ theme.colors.colorNavyLight };
		}
	}
`;


const SolsamStepByStep: React.FC<SolsamStepByStepProps> = ( {
	data : {
		description,
		item_repeater,
		title
	}
} ) => {
	
	return (
		<Wrapper className="step-by-step">
			<Container>
				{
					title &&
          <Typography variant={ 'h2' } type={ 'h2' } className="step-by-step__title">
						{ title }
          </Typography>
				}
				{
					description &&
          <Typography variant={ 'body_1_large' } type={ 'p' } className="step-by-step__description">
						{ description }
          </Typography>
				}
				<GridSystem variant={ 'grid-3' } className={ `step-by-step__list` }>
					{
						item_repeater?.map( ( item, index ) => (
							<div className="step-by-step__item" key={ generateKey( index ) }>
								<div className={ 'step-by-step__icon' }>
									<Svg svg={ item?.icon }/>
								</div>
								<div className={ `step-by-step__item-info` }>
									{
										item?.item_title &&
                    <Typography variant={ 'subheader1' }
                                type={ 'p' }
                                className="step-by-step__item-title">
											{ item?.item_title }
                    </Typography>
									}
									{
										item?.item_desc &&
                    <Typography variant={ 'body_1_large' }
                                type={ 'p' }
                                className="step-by-step__item-description">
											{ item?.item_desc }
                    </Typography>
									}
								</div>
							</div>
						) )
					}
				</GridSystem>
			</Container>
		</Wrapper>
	);
};

export default SolsamStepByStep;
