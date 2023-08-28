'use client'

import React from 'react';
import styled from '@emotion/styled';
import Container from "../Container";
import GridSystem from "../UI/Grid/GridSystem";
import Typography from "../UI/Typography";
import Image from "next/image";
import Button from '@/components/Button';
import CustomClassic from "./CustomClassic";
import OfferForm from "../Forms/OfferForm";
import { setPopupState } from "@/redux/features/popupActions";
import theme from "@/styles/theme";
import { useAppDispatch } from "@/redux/hooks";

interface ImageTextBlockProps {
	data: {
		title_it?: string;
		subtitle_it?: string;
		description_it?: string;
		button_type_it?: string;
		button_url_it?: {
			title: string;
			url: string;
		};
		button_title_it?: string;
		image_it?: string;
		type_of_displaying: string
	}
}


const Wrapper = styled.div`
	padding: ${ theme.spaces.medium2 } 0 ${ theme.spaces.medium2 };
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
		padding: ${ theme.spaces.normal } 0;
	}
	
	.itb {
		
		&__btn {
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				width: 100%;
			}
		}
		
		&__grid-wrapper {
			&.image_on_the_left {
				.itb__area1 {
					grid-column: 2;
				}
				
				.itb__area2 {
					grid-column: 1;
				}
				
				@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
					.itb__area1,
					.itb__area2 {
						grid-column: unset;
						grid-area: auto;
					}
					
					.itb__area1 {
						margin-bottom: ${ theme.spaces.normal };
					}
				}
			}
			
			&.image_on_the_right {
				.itb__area1 {
					grid-column: 1;
				}
				
				.itb__area2 {
					grid-column: 2;
				}
				
				@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
					.itb__area1,
					.itb__area2 {
						grid-column: unset;
						grid-area: auto;
					}
					
					.itb__area1 {
						margin-bottom: ${ theme.spaces.normal };
					}
				}
			}
		}
		
		&__title {
			margin-bottom: ${ theme.spaces.normal };
		}
		
		&__subtitle {
			margin-bottom: ${ theme.spaces.small };
		}
		
		&__description {
			margin-bottom: ${ theme.spaces.medium2 };
			width: 90%;
			max-width: 100%;
			padding: 0;
		}
		
		&__img {
			max-width: 100%;
			height: auto;
		}
		
		&__area1 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
		}
		
		&__area2 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
		}
	}
`;

const ImageTextBlock = ( {
	data : {
		title_it,
		subtitle_it,
		description_it,
		button_type_it,
		button_url_it,
		button_title_it,
		image_it,
		type_of_displaying
	}
}: ImageTextBlockProps ) => {
	const dispatch = useAppDispatch()
	
	const openPopup = () => {
		dispatch( setPopupState( {
			state   : 'open',
			content : <OfferForm/>,
			name    : 'offer-form-popup',
		} ) );
	};
	
	return (
		<Wrapper className={ `itb` }>
			<Container>
				<GridSystem variant={ 'grid-2' } className={ `itb__grid-wrapper ${ type_of_displaying }` }>
					<div className="area-1 itb__area1">
						{
							title_it &&
              <Typography className={ 'itb__title' }
                          variant={ 'h2' }
                          type={ 'h2' }
                          dangerouslySetInnerHTML={ { __html : title_it } }
              />
						}
						{
							subtitle_it &&
              <Typography className={ 'itb__subtitle' }
                          variant={ 'subheader1' }
                          type={ 'p' }
                          dangerouslySetInnerHTML={ { __html : subtitle_it } }
              />
						}
						{
							description_it &&
              <CustomClassic data={ { custom_classic : description_it } } className={ 'itb__description' }/>
						}
						{
							button_title_it && button_url_it &&
              <Button type={ button_type_it }
                      className={ 'itb__btn' }
                      title={ button_title_it }
                      isHyperlink={ true }
                      hrefLink={ button_url_it?.url }
                      onClick={ ( e: Event ) => {
								        if ( '#offer-form' === button_url_it?.url ) {
									        e.preventDefault();
									        openPopup();
								        }
							        } }
              />
						}
					</div>
					<div className="area-2 itb__area2">
						{
							image_it &&
              <Image className={ 'itb__img' }
                     src={ image_it }
                     alt={ 'icon' }
                     width={ 648 }
                     height={ 415 }
              />
						}
					</div>
				</GridSystem>
			</Container>
		</Wrapper>
	);
};

export default ImageTextBlock;