'use client'

import styled from '@emotion/styled';
import React, { useEffect, useState } from "react";

import { getCookie, setCookie } from "cookies-next";
import Container from "../Container";
import GridSystem from "../UI/Grid/GridSystem";
import theme from "@/styles/theme";
import { useThemeContext } from "@/context/theme.context";
import InputForm from "@/components/InputForm";

const cw = "сookies-wrapper";

const CookiesWrapper = styled( 'div' )`
	width: 100%;
	padding: 22px 30px;
	display: none;
	align-items: center;
	background: ${ theme.colors.colorNavy };
	border: 1px solid rgba(154, 149, 169, 0.25);
	border-radius: 12px;
	flex-wrap: wrap;
	position: fixed;
	bottom: 0;
	z-index: 1000;
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
		padding-left: ${ theme.spaces.small };
		padding-right: ${ theme.spaces.small };
	}
	
	.grid-2-1 {
		
		@media screen and (max-width: 570px) {
			grid-template-columns: 1fr;
		}
	}
	
	.container.сookies-wrapper__container & {
		width: inherit;
	}
	
	&.active {
		display: flex;
	}
	
	.сookies-wrapper {
		
		&__cookies-text {
			color: ${ theme.colors.colorLight };
			position: relative;
			z-index: 1;
			max-width: 500px;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				margin-bottom: ${ theme.spaces.gridGap };
				max-width: unset;
				text-align: center;
			}
			
			a {
				//text-decoration: none;
				//color: rgba(254, 183, 19, 1);
				
				
				&:hover {
					text-decoration: none;
				}
			}
			
			a,
			p {
				color: inherit;
			}
		}
		
		&__cookies-data {
			width: 100%;
		}
		
		&__cookie-buttons-wrap {
			display: flex;
			margin-left: auto;
			padding-left: 100px;
			
			@media screen and (max-width: 1199px) {
				padding-left: 0;
				width: 100%;
				justify-content: center;
			}
			
			@media screen and (max-width: 570px) {
				margin-top: 16px;
			}
		}
		
		&__cookie-btn {
			margin-bottom: 0;
		}
		
		&__allow-cookies.form-input__field {
			${ theme.buttons.button_2 };
		}
		
		&__decline-сookies.form-input__field {
			${ theme.buttons.button_4 }
		}
		
		&__decline-сookies-box {
			margin-right: 10px;
		}
	}
`;


const CookiesBlock = () => {
	const { themeSettings } = useThemeContext();
	const { cookiesText } = themeSettings;
	const cookieAccept = !!getCookie( 'cookie_accept' );
	const [isOpenCookie, setIsOpenCookie] = useState( false );
	let activeElem = ( !cookieAccept && isOpenCookie) ? 'active' : '';
	
	// Decline cookies
	const declineCookiesHandler = () => {
		setIsOpenCookie( false );
	};
	
	// Allow cookies
	const allowCookiesHandler = () => {
		setCookie( "cookie_accept", true, {
			path   : '/',
			maxAge : 60 * 60 * 24 * 90   // mil *
		} );
		setIsOpenCookie( false );
	};
	
	const inputs = [
		{
			btnSize     : 'big',
			name        : 'decline_cookies',
			classParent : `${ cw }__decline-сookies-box ${ cw }__cookie-btn`,
			className   : `${ cw }__decline-сookies`,
			type        : 'reset',
			title       : 'Neka',
			placeholder : '',
			onClick     : declineCookiesHandler
		},
		{
			btnSize     : 'big',
			name        : 'allow_cookies',
			classParent : `${ cw }__allow-cookies-box ${ cw }__cookie-btn`,
			className   : `${ cw }__allow-cookies`,
			type        : 'reset',
			title       : 'Godkänn',
			placeholder : '',
			onClick     : allowCookiesHandler
		},
	];
	
	useEffect( () => {
		const openCookie = setTimeout( () => {
			setIsOpenCookie( true );
		}, 5000 );
		return () => clearTimeout( openCookie );
	}, [] );
	
	
	return (
		<Container className={ `${ cw }__container` }>
			<CookiesWrapper className={ `${ cw } ${ activeElem } container` }>
				<GridSystem variant={ 'grid-2-1' } className={ `${ cw }__cookies-data` }>
					<div className={ `${ cw }__cookies-text` }
					     dangerouslySetInnerHTML={ { __html : cookiesText } }/>
					<div className={ `${ cw }__cookie-buttons-wrap` }>
						{
							inputs.length &&
							inputs.map( ( item, index ) => {
								return <InputForm data={ item } key={ index }/>;
							} )
						}
					</div>
				</GridSystem>
			</CookiesWrapper>
		</Container>
	);
}

export default CookiesBlock;