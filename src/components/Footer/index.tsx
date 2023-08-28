'use client'
import Container from "../Container";
import Typography from "../UI/Typography";
import React from "react";
import styled from '@emotion/styled';
import Logo from '../Logo';
import Button from '@/components/Button';
import GridSystem from "@/components/UI/Grid/GridSystem";
import Image from 'next/image';
import { useThemeContext } from "@/context/theme.context";
import HelperComponents from "@/helpers/HelperComponents";
import theme from "@/styles/theme";

interface MenuLink {
	link: string;
	label: string;
	links?: MenuLink[];
}

interface HeaderActionProps {
	links?: {
		[key: string]: MenuLink[];
	}
}

const HeaderMainWrapper = styled( 'footer' )`
	padding: ${ theme.spaces.large19 } 0 ${ theme.spaces.medium3 };
	background-color: ${ theme.colors.colorNavyDark };
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
		padding-top: ${ theme.spaces.medium3 };
	}
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
		padding: ${ theme.spaces.medium3 } 0;
	}
	
	.footer {
		&__top {
			padding-bottom: ${ theme.spaces.medium3 };
			border-bottom: 1px solid ${ theme.colors.colorWhite };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				grid-template-areas: "area-2" "area-1";
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				border-bottom: 1px solid ${ theme.colors.colorWhite };
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				display: block;
				padding-bottom: ${ theme.spaces.small };
			}
		}
		
		&__content {
			margin-bottom: ${ theme.spaces.medium2 };
			width: 83.3%;
			max-width: 100%;
			
			p, ul, li, a {
				color: ${ theme.colors.colorWhite };
			}
			
			a {
				&:hover {
					opacity: .5;
				}
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				width: 100%;
			}
		}
		
		&__logo {
			margin-bottom: ${ theme.spaces.normal };
		}
		
		&__button-wrap {
			display: flex;
		}
		
		&__button {
			margin-right: ${ theme.spaces.small };
		}
		
		&__bottom {
			padding-top: ${ theme.spaces.small };
			display: flex;
			align-items: center;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m768 }) {
				align-items: flex-start;
				flex-direction: column;
			}
		}
		
		&__bottom-icons {
			display: flex;
			flex-wrap: wrap;
			margin-left: auto;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m768 }) {
				margin-left: 0;
			}
			
			&.desktop {
				
			}
		}
		
		&__bottom-icon {
			width: initial;
			height: auto;
			margin-right: ${ theme.spaces.gridGap2 };
			
			&:last-child {
				margin-right: 0;
			}
		}
		
		&__copyright {
			color: ${ theme.colors.colorWhite };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m768 }) {
				margin-bottom: ${ theme.spaces.gridGap };
			}
		}
		
		&__menu-title {
			color: ${ theme.colors.colorWhite };
			font-weight: 700;
			margin-bottom: ${ theme.spaces.small };
		}
		
		&__menu-item {
			li {
				margin-bottom: ${ theme.spaces.mini };
				
				a, span {
					color: ${ theme.colors.colorSkyLight };
				}
				
				a {
					&:hover {
						opacity: .5;
					}
				}
			}
		}
		
		&__top-left,
		&__top-right {
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
				grid-area: auto;
			}
		}
		
		&__top-left {
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
				margin-bottom: ${ theme.spaces.large15 };
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m850 }) {
				margin-bottom: ${ theme.spaces.medium3 };
			}
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-bottom: ${ theme.spaces.large4 };
			}
		}
		
		&__top-right {
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
				grid-template-columns: repeat(3, 1fr);
				grid-template-rows: 1fr;
				grid-column-gap: 16px;
				grid-row-gap: 16px;
			}
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				display: block;
			}
		}
		
		&__menu {
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-bottom: ${ theme.spaces.medium1 };
			}
		}
	}
`;

export default function Footer( { links }: HeaderActionProps ) {
	const { themeSettings } = useThemeContext();
	const {
		footerLogo,
		footerIcon,
		footerBtmIconRepeater,
		footerCopyright,
		footerContent,
		footerButtonType,
		footerButtonTitle,
		footerButtonLink,
		footerMenuLabelsTitle,
		footerMenus
	} = themeSettings;
	
	const today = new Date();
	const year = today.getFullYear();
	const footerMenuLabels = footerMenuLabelsTitle.split( ',' ) ?? '';
	
	return (
		<HeaderMainWrapper>
			<Container>
				<GridSystem variant={ 'grid-2' } className="footer__top">
					<div className="footer__top-left area-2">
						{
							footerLogo &&
              <Logo
                className="footer__logo"
                hrefLink="/"
                logo={ footerLogo?.sourceUrl }
                width={ 196 }
                height={ 30 }
              />
						}
						
						{
							footerContent &&
              <Typography className={ `footer__content` }
                          variant={ 'body_1_large' }
                          dangerouslySetInnerHTML={ { __html : footerContent } }/>
						}
						
						<Typography className="footer__button-wrap">
							{
								footerButtonTitle &&
                <Button className="footer__button"
                        isHyperlink={ true }
                        type={ footerButtonType }
                        title={ footerButtonTitle }
                        hrefLink={ footerButtonLink?.url }
                />
							}
							
							{
								footerIcon &&
                <Image
                  src={ footerIcon?.sourceUrl }
                  alt="footer icon"
                  width={ 48 }
                  height={ 48 }
                  blurDataURL="URL"
                  placeholder="blur"
                />
								
							}
						</Typography>
					
					</div>
					<GridSystem variant={ 'grid-3' } className="footer__top-right area-1">
						{
							footerMenus?.split( ',' )?.map( ( item: string, idx: number ) => {
								return (
									<Typography className="footer__menu" key={ idx }>
										<Typography className="footer__menu-title" type={ 'p' } variant={ 'body_1_large' }>
											{ footerMenuLabels[idx] }
										</Typography>
										<ul className={ `footer__menu-item` }>
											{
												item && links &&
                        <HelperComponents menu={ links[item.toLowerCase().trim()] }/>
											}
										</ul>
									</Typography>
								);
							} )
						}
					</GridSystem>
				</GridSystem>
				
				<Typography className="footer__bottom">
					{
						footerCopyright &&
            
            <Typography className={ `footer__copyright` }
                        variant={ 'body_1_large' }
                        type={ 'p' }
                        dangerouslySetInnerHTML={ { __html : year + ' ' + footerCopyright } }/>
					}
					{
						footerBtmIconRepeater &&
						(
							<div className={ `footer__bottom-icons desktop` }>
								{ footerBtmIconRepeater.map( ( item, index ) => {
									return (
										<Image
											src={ item?.itemIcon?.sourceUrl }
											alt="site logo"
											width={ 40 }
											height={ 50 }
											key={ index }
											className={ `footer__bottom-icon` }
										/>
									);
								} ) }
							</div>
						)
					}
				</Typography>
			</Container>
		</HeaderMainWrapper>
	);
}