'use client'

import React from "react";
import styled from "@emotion/styled";
import Typography from "../UI/Typography";
import Container from "../Container";
import OfferForm from '../Forms/OfferForm';
import { setPopupState } from "@/redux/features/popupActions";
import Button from "@/components/Button";
import theme from "@/styles/theme";
import { useAppDispatch } from "@/redux/hooks";

interface PageHeaderProps {
	button_text: string;
	button_type: string;
	button_url: {
		title: string;
		url: string;
	}
	description: string;
	link_text: string;
	link_type: string;
	link_url: {
		title: string;
		url: string;
	}
	subtitle: string;
	title: string;
	className?: string;
}


const Wrapper = styled.div`
	width: 100%;
	margin-bottom: 40px;
	
	.page-header {
		
		&__btns-wrapper {
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				display: flex;
				flex-direction: column;
				
				.btn:last-of-type {
					margin-top: 20px;
				}
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m768 }) {
				width: 100%;
			}
		}
		
		&__inner-wrapper {
			width: 555px;
			max-width: 100%;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m768 }) {
				width: 100%;
			}
		}
		
		&__title {
			color: ${ theme.colors.colorWhite };
			margin-bottom: ${ theme.spaces.normal };
		}
		
		&__sub-title {
			color: ${ theme.colors.colorWhite };
			margin-bottom: ${ theme.spaces.small };
		}
		
		&__description {
			color: ${ theme.colors.colorWhite };
			margin-bottom: ${ theme.spaces.medium2 };
		}
		
		&__btn-wrapper {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}
		
		&__btn {
			margin-right: ${ theme.spaces.normal };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m768 }) {
				width: 100%;
				display: flex;
				margin-right: 0;
			}
			
			&:last-child {
				margin-right: 0;
			}
		}
		
		&__btn-offer.btn {
			width: max-content;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-right: auto;
				margin-left: auto;
			}
		}
	}
`

const PageHeader: React.FC<PageHeaderProps> = ( {
	button_text,
	button_type,
	button_url,
	description,
	link_text,
	link_type,
	link_url,
	subtitle,
	title,
	className
} ) => {
	const dispatch = useAppDispatch();
	
	const openPopup = () => {
		dispatch( setPopupState( {
			state   : 'open',
			content : <OfferForm/>,
			name    : 'offer-form-popup',
		} ) );
	};
	
	return (
		<Wrapper className={ `page-header ${ className }` }>
			<Container>
				<div className={ 'page-header__inner-wrapper' }>
					{
						title &&
            <Typography className={ 'page-header__title' }
                        variant={ 'h1' }
                        type={ 'h1' } dangerouslySetInnerHTML={ { __html : title } }/>
					}
					{
						subtitle &&
            <Typography className={ 'page-header__sub-title' }
                        variant={ 'subheader1' }
                        type={ 'p' }
                        dangerouslySetInnerHTML={ { __html : subtitle } }/>
					}
					{
						description &&
            <Typography className={ 'page-header__description' }
                        variant={ 'body_1_large' }
                        type={ 'p' }
                        dangerouslySetInnerHTML={ { __html : description } }/>
					}
					{
						((button_url && button_text) || (link_url && link_text)) &&
            <div className="page-header__btns-wrapper">
							{
								button_url && button_text &&
                <Button type={ button_type }
                        title={ button_text }
                        isHyperlink={ true }
                        hrefLink={ button_url?.url }
                        className={ 'page-header__btn' }/>
							}
							{
								link_url && link_text &&
                <Button type={ `link-${ link_type }` }
                        title={ link_text }
                        isHyperlink={ true }
                        hrefLink={ link_url?.url }
                        onClick={ ( e: Event ) => {
									        if ( '#offer-form' === link_url?.url ) {
										        e.preventDefault();
										        openPopup();
									        }
								        } }
                        className={ 'page-header__btn page-header__btn-offer' }/>
							}
            </div>
					}
				</div>
			</Container>
		</Wrapper>
	);
};

export default PageHeader;
