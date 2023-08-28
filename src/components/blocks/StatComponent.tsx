'use client'

import React from 'react';
import styled from '@emotion/styled';
import Container from "../Container";
import Typography from "../UI/Typography";
import GridSystem from "../UI/Grid/GridSystem";
import CustomClassic from "./CustomClassic";
import theme from "@/styles/theme";

interface StatComponentProps {
	data: {
		stat_component_fields_custom_classic: string
		stat_component_fields_stat_items: { number: string, title: string }[]
		stat_component_fields_subtitle: string
		stat_component_fields_title: string
	}
}


const Wrapper = styled.div`
	padding-top: ${ theme.spaces.medium2 };
	padding-bottom: ${ theme.spaces.medium2 };
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
		padding: ${ theme.spaces.normal } 0;
	}
	
	.stat-component {
		&__grid-wrapper {
			background: ${ theme.colors.colorNavyDark };
			padding: ${ theme.spaces.medium3 };
			padding-bottom: ${ theme.spaces.small };
			border-radius: 12px;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
				padding: ${ theme.spaces.medium3 } ${ theme.spaces.gridGap } ${ theme.spaces.normal };
			}
		}
		
		&__title {
			color: ${ theme.colors.colorWhite };
			margin-bottom: ${ theme.spaces.small };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
				text-align: center;
			}
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				text-align: left;
			}
		}
		
		&__subtitle {
			color: ${ theme.colors.colorWhite };
			margin-bottom: ${ theme.spaces.medium1 };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
				text-align: center;
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				padding: 0 ${ theme.spaces.mini } 0 0;
				text-align: left;
			}
		}
		
		&__stat-items {
			display: flex;
			flex-wrap: wrap;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
				margin-bottom: ${ theme.spaces.small };
			}
		}
		
		&__stat-item {
			width: 50%;
			flex-shrink: 0;
			margin-bottom: ${ theme.spaces.normal };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
			}
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				align-items: flex-start;
			}
		}
		
		&__stat-item-number {
			color: ${ theme.colors.colorOrange };
			margin-bottom: ${ theme.spaces.small };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-bottom: ${ theme.spaces.mini };
			}
		}
		
		&__stat-item-description {
			color: ${ theme.colors.colorWhite };
		}
	}
	
	.stat-component__wysiwyg {
		padding: 0;
		
		.custom-classic-block__wysiwyg-content {
			h3 {
				font-size: 18px;
				color: ${ theme.colors.colorWhite };
				margin-bottom: ${ theme.spaces.medium1 };
				
				@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
					text-align: center;
				}
				@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
					text-align: left;
				}
			}
			
			ul, ol {
				padding: 0;
				margin: 0;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				
				@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
					padding: 0 ${ theme.spaces.medium1 };
				}
				@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
					padding: 0;
				}
				
				li {
					width: 178px;
					color: ${ theme.colors.colorWhite };
					list-style-type: none;
					padding-left: ${ theme.spaces.medium1 };
					
					@media screen and (max-width: ${ theme.responsiveMediaSizes.m1024 }) {
						width: 159px;
					}
					@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
						width: 50%;
					}
				}
			}
			
			ul {
				li {
					&:after {
						position: absolute;
						content: '';
						display: block;
						left: 5px;
						top: 50%;
						transform: translateY(-50%);
						width: 11px;
						height: 11px;
						z-index: 1;
						background: ${ theme.colors.colorNavy };
						border-radius: 50%;
					}
					
					&:before {
						position: absolute;
						content: '';
						display: block;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						width: 21px;
						height: 21px;
						border-radius: 50%;
						z-index: 1;
						background: ${ theme.colors.colorNavy };
						opacity: 0.4;
						animation: blinking_dot 1s ease-in infinite;
					}
				}
			}
		}
	}
`;

const StatComponent = ( {
	data : {
		stat_component_fields_custom_classic,
		stat_component_fields_stat_items,
		stat_component_fields_subtitle,
		stat_component_fields_title
	}
}: StatComponentProps ) => {
	return (
		<Wrapper className={ 'stat-component' }>
			<Container>
				<GridSystem variant={ 'grid-2' } className="stat-component__grid-wrapper">
					
					<div className="stat-component__area1">
						{
							stat_component_fields_title &&
              <Typography className={ 'stat-component__title' } variant={ 'h1' } type={ 'h2' }>
								{ stat_component_fields_title }
              </Typography>
						}
						{
							stat_component_fields_subtitle &&
              <Typography className={ 'stat-component__subtitle' } variant={ 'body_1_large' } type={ 'p' }>
								{ stat_component_fields_subtitle }
              </Typography>
						}
						<div className="stat-component__stat-items">
							{
								stat_component_fields_stat_items?.map( ( item, idx ) => {
									return (
										<div className={ 'stat-component__stat-item' } key={ idx }>
											<Typography className={ 'stat-component__stat-item-number' }
											            variant={ 'h2' } type={ 'p' }>
												{ item?.number }
											</Typography>
											<Typography className={ 'stat-component__stat-item-description' }
											            variant={ 'body_1_large' } type={ 'p' }>
												{ item?.title }
											</Typography>
										</div>
									)
								} )
							}
						</div>
					</div>
					
					{
						stat_component_fields_custom_classic &&
            <div className="stat-component__area2">
              <CustomClassic data={ { custom_classic : stat_component_fields_custom_classic } }
                             className={ 'stat-component__wysiwyg' }/>
            </div>
					}
				
				</GridSystem>
			</Container>
		</Wrapper>
	)
};

export default StatComponent;