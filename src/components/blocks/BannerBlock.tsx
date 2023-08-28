'use client'

import React from "react";
import styled from "@emotion/styled";
import Typography from "../UI/Typography";
import Container from "../Container";
import GridSystem from "../UI/Grid/GridSystem";
import Button from "@/components/Button";
import theme from "@/styles/theme";
import Svg from "@/components/Svg";

interface BannerBlockProps {
	data: {
		banner_fields_title: string;
		banner_fields_subtitle: string;
		banner_fields_button_type: string;
		banner_fields_button_link: {
			title: string;
			url: string;
		}
		banner_fields_button_text: string;
		banner_fields_image: string;
	}
}


const Wrapper = styled.div`
	overflow: hidden;
	padding-top: ${ theme.spaces.medium2 };
	padding-bottom: ${ theme.spaces.medium2 };
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
		padding: ${ theme.spaces.normal } 0;
	}
	
	.banner-block {
		&__columns {
			background: ${ theme.colors.colorNavyDark };
			border-radius: 20px;
			padding: ${ theme.spaces.medium2 } ${ theme.spaces.medium1 };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m1024 }) {
				display: flex;
				flex-direction: column-reverse;
				align-items: center;
			}
		}
		
		&__title {
			color: ${ theme.colors.colorWhite };
			margin-bottom: ${ theme.spaces.normal };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-bottom: ${ theme.spaces.small };
			}
		}
		
		&__subtitle {
			color: ${ theme.colors.colorWhite };
			margin-bottom: ${ theme.spaces.medium2 };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-bottom: ${ theme.spaces.medium1 };
			}
		}
		
		&__column2 {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding-right: ${ theme.spaces.large4 };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m1024 }) {
				padding: 0 0 ${ theme.spaces.medium2 };
			}
			
			svg {
				width: 223px;
				height: 83px;
			}
		}
		
		&__column1 {
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}
		
		&__btn {
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				font-size: 16px;
				padding: 0 ${ theme.spaces.small };
			}
		}
	}
`

const BannerBlock: React.FC<BannerBlockProps> = ( {
	data : {
		banner_fields_title,
		banner_fields_subtitle,
		banner_fields_button_type,
		banner_fields_button_link,
		banner_fields_button_text,
		banner_fields_image
	},
} ) => {
	return (
		<Wrapper className={ 'banner-block' }>
			<Container>
				<GridSystem variant={ 'grid-2' } className={ 'banner-block__columns' }>
					<div className="banner-block__column1">
						{
							banner_fields_title &&
              <Typography className={ 'banner-block__title' } variant={ 'h2' } type={ 'h2' }>
								{ banner_fields_title }
              </Typography>
						}
						{
							banner_fields_subtitle &&
              <Typography className={ 'banner-block__subtitle' } variant={ 'body_1_large' } type={ 'p' }>
								{ banner_fields_subtitle }
              </Typography>
						}
						{
							banner_fields_button_link && banner_fields_button_text &&
              <Button type={ banner_fields_button_type }
                      title={ banner_fields_button_text }
                      isHyperlink={ true }
                      hrefLink={ banner_fields_button_link?.url }
                      className={ 'banner-block__btn' }/>
						}
					</div>
					
					<div className="banner-block__column2">
						{
							banner_fields_image && <Svg svg={ banner_fields_image }/>
						}
					</div>
				</GridSystem>
			</Container>
		</Wrapper>
	);
};

export default BannerBlock;
