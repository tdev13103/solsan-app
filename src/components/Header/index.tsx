'use client'

import React, { useCallback, useEffect, useState } from "react";
import styled from '@emotion/styled';
import Logo from "@/components/Logo";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { useThemeContext } from "@/context/theme.context";
import MobileMenu from "@/components/Header/MobileMenu";
import HelperComponents from "@/helpers/HelperComponents";
import theme from "@/styles/theme";

interface HeaderLink {
	link: string;
	label: string;
	links?: HeaderLink[];
}

interface HeaderActionProps {
	links?: HeaderLink[];
}


const HeaderMainWrapper = styled( 'header' )`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	z-index: 2000;
	transform: translateY(${ theme?.spaces?.medium3 });
	transition: transform 0.3s ease;
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
		transform: translateY(${ theme.spaces.gridGap });
	}
	
	&.scrolled {
		transform: translateY(${ theme.spaces.small });
	}
	
	&.mobile-menu-opened {
		transform: translateY(0) !important;
	}
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
		padding: 0 ${ theme.spaces.gridGap };
	}
	
	.site-header {
		&__menu {
			display: flex;
			padding: 0;
			margin-left: auto;
		}
		
		&__menu-desktop {
			display: flex;
			align-items: center;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m1024 }) {
				display: none;
			}
		}
		
		&__item, &__item-have-children {
			list-style-type: none;
			position: relative;
			margin-right: ${ theme.spaces.large1 };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m1270 }) {
				margin-right: ${ theme.spaces.medium1 };
			}
			
			a {
				text-decoration: none;
			}
		}
		
		&__item-have-children {
			
			&:before {
				content: "";
				position: relative;
				width: ${ theme.spaces.small };
				height: ${ theme.spaces.small };
				background-repeat: no-repeat;
				background-position: center center;
				display: inline-block;
				margin-right: ${ theme.spaces.mini };
				background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMSA3LjVIMTMiIHN0cm9rZT0iIzI5MkQzMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik03IDEzLjVWMS41IiBzdHJva2U9IiMyOTJEMzIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=);
				top: 0;
			}
			
			&:hover {
				& > .site-header__sub-menu-wrap {
					transition: all 0.4s ease-in-out;
					max-height: 100vh;
					opacity: 1;
					padding: ${ theme.spaces.small } 0;
				}
			}
		}
		
		&__sub-menu-list {
		
		}
		
		&__sub-menu-wrap {
			position: absolute;
			background-color: ${ theme.colors.colorWhite };
			border-radius: ${ theme.borderRadius.default };
			top: 100%;
			left: 0;
			max-height: 0;
			overflow: hidden;
			opacity: 0;
			transition: all 0.4s ease-in-out;
			min-width: 161px;
			box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
		}
		
		&__sub-menu-list-item {
			margin: 0 0 ${ theme.spaces.mini };
			display: block;
			
			&:last-of-type {
				margin-bottom: 0;
			}
			
			a {
				padding: ${ theme.spaces.mini } ${ theme.spaces.small };
				display: block;
			}
			
			&:hover {
				background-color: ${ theme.colors.colorPurpleLight };
			}
		}
		
		&__button {
		
		}
		
		&__logo {
			margin-right: auto;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				width: 145px;
				
				img {
					max-width: 100%;
					height: auto;
				}
			}
		}
		
		&__container {
			background-color: ${ theme.colors.colorWhite };
			display: flex;
			align-items: center;
			border-radius: ${ theme.borderRadius.default };
			padding: ${ theme.spaces.small } ${ theme.spaces.normal };
			box-shadow: 0 2px 20px 1px rgba(0, 0, 0, 0.1);
			justify-content: flex-end;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				padding: 19px 24px;
				box-shadow: unset;
				background-color: ${ theme.colors.colorSkyLight };
			}
		}
		
		&__hamburger {
			background: none;
			border: none;
			cursor: pointer;
			display: none;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m1024 }) {
				display: block;
			}
		}
	}

`;


const Header: React.FC<HeaderActionProps> = ( { links } ) => {
	const { themeSettings } = useThemeContext();
	const {
		headerLogo,
		headerButtonTitle,
		headerButtonType,
		headerButtonLink
	} = themeSettings;
	
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState( false );
	const [isPageScrolled, setIsPageScrolled] = useState( false );
	
	const onScroll = useCallback( () => {
		setIsPageScrolled( window.scrollY >= 100 );
	}, [] );
	
	useEffect( () => {
		window.addEventListener( "scroll", onScroll, { passive : true } );
		return () => {
			// @ts-ignore
			window.removeEventListener( "scroll", onScroll, { passive : true } );
		}
	}, [onScroll] );
	
	return (
		<HeaderMainWrapper
			className={ `site-header ${ isPageScrolled ? 'scrolled' : '' } ${ isMobileMenuOpen ? 'mobile-menu-opened'
			                                                                                   : '' }` }>
			<Container className={ 'site-header__container' }>
				{
					headerLogo &&
          <Logo className="site-header__logo"
                hrefLink={ process.env.NEXT_PUBLIC_SITE_URL + "/" }
                logo={ headerLogo?.sourceUrl }
                width={ 196 }
                height={ 31 }
          />
				}
				<div className={ `site-header__menu-desktop` }>
					<ul className={ `site-header__menu` }>
						{
							links &&
              <HelperComponents menu={ links } customClass={ 'site-header' }/>
						}
					</ul>
					
					<Button hrefLink={ headerButtonLink?.url }
					        isHyperlink={ true }
					        className="site-header__button"
					        title={ headerButtonTitle }
					        type={ headerButtonType }
					/>
				</div>
				
				<button onClick={ () => setIsMobileMenuOpen( true ) } className={ 'site-header__hamburger' }>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M2.5 5.83334H17.5Z" fill="#E8EAFF"/>
						<path d="M2.5 5.83334H17.5" stroke="#221551" strokeWidth="1.5" strokeLinecap="round"/>
						<path d="M2.5 10H17.5Z" fill="#E8EAFF"/>
						<path d="M2.5 10H17.5" stroke="#221551" strokeWidth="1.5" strokeLinecap="round"/>
						<path d="M2.5 14.1667H17.5" stroke="#221551" strokeWidth="1.5" strokeLinecap="round"/>
					</svg>
				</button>
			
			</Container>
			
			{ isMobileMenuOpen &&
        <MobileMenu menu={ links }
                    closeHandler={ () => setIsMobileMenuOpen( false ) }
                    logoUrl={ headerLogo?.sourceUrl }
        />
			}
		</HeaderMainWrapper>
	);
};

export default Header;
