'use client'

import React from 'react'
import styled from '@emotion/styled'
import Container from '../Container'
import PageHeader from './PageHeader'
import UspCard from "@/components/UspCard";
import theme from "@/styles/theme";
import { useThemeContext } from "@/context/theme.context";

interface DataProps {
	data: TopBlockProps
}

interface TopBlockProps {
	background_image?: string,
	background_video_file?: string,
	background_video_file_mob?: string,
	is_video_on_background: string,
	page_header_button_text: string,
	page_header_button_type: string,
	page_header_button_url: {
		title: string;
		url: string;
	}
	page_header_description: string,
	page_header_link_text: string,
	page_header_link_type: string,
	page_header_link_url: {
		title: string;
		url: string;
	}
	page_header_subtitle: string,
	page_header_title: string,
	usp_cards_repeater: UspCards[],
}

interface UspCards {
	cart_icon: string
	cart_icons_type: string
	cart_subtitle: string
	cart_title: string
}

const Wrapper = styled.div`
	background-repeat: no-repeat;
	background-position: center 0;
	background-size: cover;
	height: 900px;
	position: relative;
	padding-bottom: ${ theme.spaces.large21 };
	padding-top: ${ theme.spaces.large16 };
	margin-bottom: ${ theme.spaces.medium2 };
	overflow: hidden;
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
		margin-bottom: ${ theme.spaces.normal };
		padding-top: ${ theme.spaces.large18 };
		padding-bottom: ${ theme.spaces.large4 };
		height: 750px;
	}
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
		height: unset;
		padding-bottom: 0;
		padding-top: ${ theme.spaces.large19 };
		background-color: ${ theme.colors.colorNavyDark };
		margin-bottom: ${ theme.spaces.medium3 };
	}
	
	&:before {
		position: absolute;
		content: '';
		display: block;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		pointer-events: none;
		background: rgba(34, 21, 81, 0.5);
		
		@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
			background: unset;
		}
	}
	
	&:after {
		content: "";
		position: absolute;
		bottom: -100px;
		left: 50%;
		height: 1000px;
		width: 5810px;
		pointer-events: none;
		border-radius: 100%;
		border: 100px solid #fff;
		transform: translateX(-50%);
		z-index: 2;
		
		@media screen and (max-width: ${ theme.responsiveMediaSizes.m1570 }) {
			width: 4000px;
		}
		@media screen and (max-width: ${ theme.responsiveMediaSizes.m1024 }) {
			width: 3810px;
		}
		
		@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
			display: none;
		}
	}
	
	&.top-banner-without-video {
		@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
			background-image: unset !important;
			padding-top: 0;
		}
		
		&:after {
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				border: unset;
			}
		}
	}
	
	&.top-banner {
		.usp-card__title,
		.usp-card__subtitle {
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				color: ${ theme.colors.colorNavyDark };
			}
		}
		
		.page-header__title,
		.page-header__description,
		.page-header__btn {
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				width: 100%;
				margin-right: 0;
			}
		}
		
		.page-header__btn-offer {
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				width: max-content;
				margin-right: auto;
			}
		}
	}
	
	.top-banner {
		
		&__without-video-wrap {
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				height: 350px;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: 0 0;
				margin-bottom: ${ theme.spaces.gridGap };
				position: relative;
				z-index: 1;
			}
			
			&:after {
				position: absolute;
				content: '';
				display: none;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: 1;
				background: linear-gradient(179.24deg, rgba(34, 21, 81, 0) 55.79%, #221551 99.36%);
				
				@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
					display: block;
				}
			}
		}
		
		&__page-header {
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m768 }) {
				padding-bottom: ${ theme.spaces.medium1 };
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				padding-bottom: ${ theme.spaces.medium2 };
			}
		}
		
		&__container {
			position: relative;
			z-index: 5;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			height: 100%;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m768 }) {
				min-height: 100%;
				height: auto;
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				padding-left: ${ theme.spaces.gridGap };
				padding-right: ${ theme.spaces.gridGap };
			}
			
			.container {
				@media screen and (max-width: ${ theme.responsiveMediaSizes.m768 }) {
					padding-left: 0;
				}
				
				@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
					padding-right: 0;
				}
			}
		}
		
		&__video-wrap {
			display: none;
			border-radius: 12px;
			overflow: hidden;
			height: 235px;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				display: block;
				width: 100%;
				margin: -100px auto 0;
				height: auto;
				position: relative;
				z-index: 1;
				border-top-right-radius: 0;
				border-top-left-radius: 0;
			}
			
			&:after {
				position: absolute;
				content: '';
				display: block;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: 3;
				background: linear-gradient(179.24deg, rgba(34, 21, 81, 0) 66.93%, #221551 99.36%);
			}
		}
		
		&__video {
			position: absolute;
			left: 50%;
			top: 0;
			width: 101%;
			height: auto;
			transform: translateX(-50%);
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m1570 }) {
				width: auto;
				height: 100%;
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				position: relative;
				left: 0;
				top: 0;
				transform: unset;
				width: 100%;
				height: 100%;
				z-index: 3;
			}
		}
		
		&__cards-wrapper {
			display: flex;
			justify-content: space-between;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				display: block;
				width: 100vw;
				margin-left: -20px;
				padding-top: ${ theme.spaces.medium2 };
				padding-left: ${ theme.spaces.gridGap };
				padding-right: ${ theme.spaces.gridGap };
				background-color: ${ theme.colors.colorWhite };
			}
			
			.usp-card {
				width: calc(33.3% - 32px);
				
				@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
					width: calc(33.3% - 16px);
				}
				@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
					width: 100%;
					margin-bottom: ${ theme.spaces.medium2 };
				}
				
				&:last-of-type {
					@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
						margin-bottom: 0;
					}
				}
			}
		}
	}
	
	.page-header__btn {
		
		@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
			text-align: center;
		}
	}
`

const TopBlock = ( {
	data : {
		background_image,
		background_video_file,
		background_video_file_mob,
		is_video_on_background,
		page_header_button_text,
		page_header_button_type,
		page_header_button_url,
		page_header_description,
		page_header_link_text,
		page_header_link_type,
		page_header_link_url,
		page_header_subtitle,
		page_header_title,
		usp_cards_repeater,
	}
}: DataProps ) => {
	const topBannerClass = (is_video_on_background) ? 'top-banner-with-video' : 'top-banner-without-video'
	
	const { isMobile } = useThemeContext();
	
	return (
		<Wrapper className={ `top-banner ${ topBannerClass }` }
		         style={ { backgroundImage : `url(${ background_image })` } }>
			{ is_video_on_background && !isMobile ? (
				<video src={ background_video_file } width="100%" height="100%" className="top-banner__video" loop autoPlay
				       playsInline muted/>
			) : (
				  isMobile && (
					  is_video_on_background
					  ?
					  <video src={ background_video_file_mob } width="100%" height="100%" className="top-banner__video" loop
					         autoPlay
					         playsInline muted/>
					  : <div className="top-banner__without-video-wrap"
					         style={ { backgroundImage : `url(${ background_image })` } }/>
				  )
			  ) }
			<Container className={ 'top-banner__container' }>
				<PageHeader button_text={ page_header_button_text }
				            button_type={ page_header_button_type }
				            button_url={ page_header_button_url }
				            description={ page_header_description }
				            link_text={ page_header_link_text }
				            link_type={ page_header_link_type }
				            link_url={ page_header_link_url }
				            subtitle={ page_header_subtitle }
				            title={ page_header_title }
				            className={ 'top-banner__page-header' }/>
				<div className={ 'top-banner__cards-wrapper' }>
					{ (usp_cards_repeater || [])?.map( ( item, idx ) => <UspCard data={ item } key={ idx }/> ) }
				</div>
			</Container>
		</Wrapper>
	)
}

export default TopBlock
