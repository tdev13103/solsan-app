'use client'

import styled from '@emotion/styled';
import React from "react";
import Logo from "../Logo";
import Button from "@/components/Button";
import { useThemeContext } from "@/context/theme.context";
import HelperComponents from "@/helpers/HelperComponents";
import theme from "@/styles/theme";

interface HeaderLink {
	link: string;
	label: string;
	links?: HeaderLink[];
}

interface MobileMenuProps {
	menu?: HeaderLink[];
	closeHandler: () => void;
	logoUrl: string;
}

const Wrapper = styled.div`
	background: ${ theme.colors.colorNavyDark };
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	overflow-y: scroll;
	padding: ${ theme.spaces.medium3 } ${ theme.spaces.gridGap } ${ theme.spaces.gridGap };
	
	
	.mobile-menu {
		&__list {
			margin-bottom: ${ theme.spaces.gridGap };
			padding-left: ${ theme.spaces.medium2 };
			padding-right: ${ theme.spaces.medium2 };
			width: 100vw;
			position: relative;
			z-index: 1;
			left: 50%;
			transform: translateX(-50%);
		}
		
		&__top {
			background-color: ${ theme.colors.colorSkyLight };
			padding: ${ theme.spaces.gridGap };
			border-radius: ${ theme.borderRadius.default };
			margin-bottom: ${ theme.spaces.mini };
			display: flex;
		}
		
		&__close {
			background: none;
			border: none;
			margin-left: auto;
			width: 32px;
			height: 32px;
			background-color: ${ theme.colors.colorNavyDark };
			border-radius: ${ theme.borderRadius.default };
			padding: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
		}
		
		&__logo {
			
		}
		
		&__item, &__item-have-children {
			list-style-type: none;
			
			a {
				${ theme.body_1_large };
				text-decoration: none;
				width: max-content;
				padding-top: ${ theme.spaces.gridGap };
				padding-bottom: ${ theme.spaces.gridGap };
				display: flex;
				
				span {
					@media screen and (max-width: ${ theme.responsiveMediaSizes.m1024 }) {
						color: ${ theme.colors.colorSkyLight };
					}
				}
			}
		}
		
		&__item-have-children {
			margin-bottom: 0;
			position: relative;
			z-index: 1;
			
			&:after {
				position: absolute;
				content: '';
				display: block;
				right: 0;
				top: 16px;
				width: 32px;
				height: 32px;
				z-index: 1;
				background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjQgMTYuNUg4QzcuNzI5NDggMTYuNSA3LjUgMTYuMjcwNSA3LjUgMTZDNy41IDE1LjcyOTUgNy43Mjk0OCAxNS41IDggMTUuNUgyNEMyNC4yNzA1IDE1LjUgMjQuNSAxNS43Mjk1IDI0LjUgMTZDMjQuNSAxNi4yNzA1IDI0LjI3MDUgMTYuNSAyNCAxNi41WiIgZmlsbD0iI0Y5RjlGMiIgc3Ryb2tlPSIjRjlGOUYyIi8+PHBhdGggZD0iTTE2IDI0LjVDMTUuNzI5NSAyNC41IDE1LjUgMjQuMjcwNSAxNS41IDI0VjhDMTUuNSA3LjcyOTQ4IDE1LjcyOTUgNy41IDE2IDcuNUMxNi4yNzA1IDcuNSAxNi41IDcuNzI5NDggMTYuNSA4VjI0QzE2LjUgMjQuMjcwNSAxNi4yNzA1IDI0LjUgMTYgMjQuNVoiIGZpbGw9IiNGOUY5RjIiIHN0cm9rZT0iI0Y5RjlGMiIvPjwvc3ZnPg==) center center no-repeat;
				background-size: contain;
				transition: transform .4s ease-out;
			}
			
			> a {
				display: block;
			}
			
			&.opened {
				.mobile-menu__sub-menu-wrap {
					max-height: 500px;
				}
				
				&:after {
					background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjQgMTYuNUg4QzcuNzI5NDggMTYuNSA3LjUgMTYuMjcwNSA3LjUgMTZDNy41IDE1LjcyOTUgNy43Mjk0OCAxNS41IDggMTUuNUgyNEMyNC4yNzA1IDE1LjUgMjQuNSAxNS43Mjk1IDI0LjUgMTZDMjQuNSAxNi4yNzA1IDI0LjI3MDUgMTYuNSAyNCAxNi41WiIgZmlsbD0iI0Y5RjlGMiIgc3Ryb2tlPSIjRjlGOUYyIi8+PC9zdmc+) center center no-repeat;
					background-size: contain;
				}
			}
		}
		
		&__sub-menu-wrap {
			max-height: 0;
			overflow: hidden;
			transition: max-height 0.5s ease;
		}
		
		&__sub-menu-list {
			
		}
		
		&__sub-menu-list-item {
			list-style-type: none;
			padding-left: ${ theme.spaces.mini };
			
			a {
				${ theme.body_1_large };
				text-decoration: none;
				display: flex;
				padding-top: 12px;
				padding-bottom: 12px;
				
				span {
					color: ${ theme.colors.colorOrange };
				}
			}
		}
	}
	
	.menu-parent__btn-switcher {
		position: absolute;
		content: '';
		display: block;
		left: -5px;
		top: 0;
		width: 24px;
		height: 24px;
		z-index: 1;
		background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNSAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNi4xMzMzIDEyLjVIMTguMTMzMyIgc3Ryb2tlPSIjMjkyRDMyIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTEyLjEzMzMgMTguNVY2LjUiIHN0cm9rZT0iIzI5MkQzMiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==);
		background-repeat: no-repeat;
		background-position: 0 0;
	}
	
	.site-header__button {
		
		@media screen and (max-width: ${ theme.responsiveMediaSizes.m1024 }) {
			width: 100%;
			background-color: ${ theme.colors.colorOrange };
		}
	}
`;


const MobileMenu = ( {
	menu,
	closeHandler,
	logoUrl
}: MobileMenuProps ) => {
	const { themeSettings } = useThemeContext();
	const {
		headerButtonTitle,
		headerMobButtonType,
		headerButtonLink
	} = themeSettings;
	
	if ( !menu ) return '';
	
	return (
		<Wrapper className={ 'mobile-menu' }>
			<div className={ `mobile-menu__top` }>
				{
					logoUrl &&
          <Logo className="mobile-menu__logo"
                hrefLink={ process.env.NEXT_PUBLIC_FRONT_SITE_URL + "/" }
                logo={ logoUrl }
                width={ 196 }
                height={ 30 }
          />
				}
				<button onClick={ () => closeHandler() }
				        className={ 'mobile-menu__close' }>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M5.63623 5.63599L18.3642 18.3639Z" fill="#E8EAFF"/>
						<path d="M5.63623 5.63599L18.3642 18.3639" stroke="#F9F9F2" strokeWidth="1.5" strokeLinecap="round"/>
						<path d="M18.3638 5.63599L5.63585 18.3639Z" fill="#E8EAFF"/>
						<path d="M18.3638 5.63599L5.63585 18.3639" stroke="#F9F9F2" strokeWidth="1.5" strokeLinecap="round"/>
					</svg>
				
				</button>
			</div>
			<ul className={ `mobile-menu__list` }>
				{
					menu &&
          <HelperComponents menu={ menu } customClass={ 'mobile-menu' } closeMenu={ closeHandler }/>
				}
			</ul>
			<Button hrefLink={ headerButtonLink?.url }
			        isHyperlink={true}
			        className="site-header__button"
			        title={ headerButtonTitle }
			        type={ headerMobButtonType }
			/>
		</Wrapper>
	);
};

export default MobileMenu;