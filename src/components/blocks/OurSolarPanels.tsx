'use client'

import React, { useState } from 'react';
import styled from "@emotion/styled";
import Container from "../Container";
import { generateKey } from "@/helpers";
import Image from "next/image";
import Typography from "../UI/Typography";
import CustomClassic from "./CustomClassic";
import Button from "@/components/Button";
import theme from "@/styles/theme";

interface TabRepeaterItem {
	btn_description: string;
	btn_link: {
		title: string;
		url: string;
	}
	btn_title: string;
	btn_type: string;
	panel_content: string;
	product_image: string;
	tab_title: string;
	isExpanded?: string; // Optional, because we're adding this in the state later.
}

interface OurSolarPanelsProps {
	data: {
		description: string;
		tab_repeater: TabRepeaterItem[]
		title: string;
	}
}


const Wrapper = styled( 'div' )`
	padding: ${ theme.spaces.medium2 } 0;
	
	.our-solar-panel {
		@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
			padding: 0 ${ theme.spaces.normal };
		}
		
		&__title {
			${ theme.h2 };
			margin-bottom: ${ theme.spaces.normal };
		}
		
		&__description {
			${ theme.body_1_large };
			margin-bottom: ${ theme.spaces.medium2 };
			max-width: 602px;
		}
		
		&__tabs {
			display: flex;
		}
		
		&__tab {
			${ theme.buttons.button_4 }
			margin-right: ${ theme.spaces.normal };
			margin-bottom: ${ theme.spaces.medium1 };
			border: 1px solid ${ theme.colors.colorNavyLight };
			color: ${ theme.colors.colorNavyLight };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				margin-right: ${ theme.spaces.small };
				padding: 0 ${ theme.spaces.small };
			}
			
			&:hover,
			&.show {
				background-color: ${ theme.colors.colorNavyDark };
			}
			
			&.show {
				color: ${ theme.colors.colorWhite };
			}
		}
		
		&__tab-info {
			
		}
		
		&__product-info {
			padding: ${ theme.spaces.gridGap2 };
			border: 1px solid ${ theme.colors.colorNavyLight };
			//filter: drop-shadow(0px 0px 40px rgba(140, 150, 255, 0.14));
			border-radius: 12px;
			justify-content: space-between;
			display: none;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				padding: ${ theme.spaces.small };
			}
			
			&.show {
				display: flex;
				
				@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
					display: block;
				}
			}
		}
		
		&__product-content {
			max-width: 558px;
			display: flex;
			flex-direction: column;
		}
		
		&__tab-content-inner {
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m1024 }) {
				padding: 0 ${ theme.spaces.small } 0 0;
			}
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				padding: 0 0 ${ theme.spaces.medium2 } 0;
			}
		}
		
		&__tab-content {
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				padding-bottom: ${ theme.spaces.medium1 };
			}
			
			.custom-classic-block__wysiwyg-content {
				ul {
					padding-left: ${ theme.spaces.mini };
					
					li {
						list-style-type: none;
						padding-left: ${ theme.spaces.small };
						margin-bottom: ${ theme.spaces.mini };
						
						&:before, &:after {
							display: none;
						}
						
						&:before {
							position: absolute;
							content: '';
							display: block;
							left: 0;
							top: 50%;
							width: 3px;
							height: 3px;
							border-radius: 50%;
							z-index: 1;
							opacity: 1;
							animation: unset;
							background: ${ theme.colors.colorNavyDark };
						}
						
						@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
							font-size: 12px;
							margin-bottom: ${ theme.spaces.little };
						}
					}
				}
				
				h4 {
					@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
						font-size: ${ theme.spaces.medium1 };
						margin-bottom: ${ theme.spaces.small };
					}
				}
				
			}
		}
		
		&__btn {
			margin-right: ${ theme.spaces.gridGap };
		}
		
		&__btn-wrap {
			display: flex;
			align-items: center;
			margin-top: auto;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				display: block;
			}
		}
		
		&__btn-desc {
			color: ${ theme.colors.colorNavy };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				margin-top: ${ theme.spaces.small };
			}
		}
		
		&__wrap-image {
			max-height: 350px;
			height: 350px;
			display: flex;
			justify-content: flex-end;
			
			img {
				max-height: 100%;
				width: auto;
				max-width: 100%;
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				justify-content: center;
				
				img {
					height: 100%;
					width: auto;
				}
			}
		}
		
	}
`;


const OurSolarPanels: React.FC<OurSolarPanelsProps> = ( {
	data : {
		title,
		description,
		tab_repeater
	}
} ) => {
	
	const [expandedItems, setExpandedItems] = useState<TabRepeaterItem[]>(
		tab_repeater.map( ( item, index ) => ({
			...item,
			isExpanded : (index === 0) ? 'show' : ''
		}) ),
	);
	const handleClick = ( index: number ) => {
		const updatedItems = expandedItems.map( ( item, idx ) => ({
			...item,
			// Only the clicked item's `isExpanded` is toggled. Others are set to false.
			isExpanded : idx === index ? 'show' : ''
		}) );
		setExpandedItems( updatedItems );
	};
	
	return (
		<Wrapper className={ `our-solar-panel` }>
			<Container>
				{
					title &&
          <Typography variant={ 'h2' } type={ 'h2' } className="our-solar-panel__title">
						{ title }
          </Typography>
				}
				{
					description &&
          <Typography variant={ 'body_1_large' } type={ 'p' } className="our-solar-panel__description">
						{ description }
          </Typography>
				}
				<div className={ `our-solar-panel__tabs` }>
					{
						(tab_repeater || []).map( ( item, index ) => (
							<Typography variant={ 'subheader1' }
							            onClick={ () => handleClick( index ) }
							            key={ generateKey( index ) }
							            className={ `our-solar-panel__tab ${ expandedItems[index]?.isExpanded }` }
							            type={ 'span' }>
								{ item?.tab_title }
							</Typography>
						) )
					}
				</div>
				<div className={ `our-solar-panel__tabs-info` }>
					{
						(tab_repeater || []).map( ( item, index ) => (
							<div className={ `our-solar-panel__product-info ${ expandedItems[index]?.isExpanded }` }
							     key={ generateKey( index ) }>
								<div className="our-solar-panel__tab-content-inner">
									{
										item?.panel_content &&
                    <CustomClassic data={ { custom_classic : item?.panel_content } }
                                   className={ 'our-solar-panel__tab-content' }
                    />
									}
									
									<div className={ `our-solar-panel__btn-wrap` }>
										{
											(item?.btn_link && item?.btn_title) &&
                      <Button type={ item?.btn_type }
                              title={ item?.btn_title }
                              isHyperlink={ true }
                              hrefLink={ item?.btn_link?.url }
                              className={ 'our-solar-panel__btn' }
                      />
										}
										{
											item?.btn_description &&
                      <Typography variant={ 'body_1_large' }
                                  type={ 'p' }
                                  className="our-solar-panel__btn-desc">
												{ item?.btn_description }
                      </Typography>
										}
									</div>
								</div>
								
								<div className={ `our-solar-panel__wrap-image` }>
									<Image src={ item.product_image }
									       alt={ 'Product image' }
									       width={ 493 }
									       height={ 380 }
									/>
								</div>
							</div>
						) )
					}
				</div>
			</Container>
		</Wrapper>
	);
};

export default OurSolarPanels;
