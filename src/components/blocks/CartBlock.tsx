'use client'

import React from 'react';
import styled from '@emotion/styled';
import Container from "../Container";
import Typography from "../UI/Typography";
import Button from "@/components/Button";
import GridSystem from "../UI/Grid/GridSystem";
import Svg from "@/components/Svg";
import theme from "@/styles/theme";


interface CartBlockProps {
	data: {
		cards_fields_cart_repeater: {
			cart_hover_icon: string
			cart_icon: string
			content: string
			link: { title: string, url: string, }
			link_title: string
			title: string
		}[]
		cards_fields_cart_type: string;
		cards_fields_title: string;
	}
}

const Wrapper = styled.div`
	padding: ${ theme.spaces.medium2 } 0 ${ theme.spaces.medium2 };
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
		padding: ${ theme.spaces.normal } 0;
	}
	
	.cart-block {
		&__block-title {
			color: ${ theme.colors.colorNavyDark };
			margin-bottom: ${ theme.spaces.small };
		}
		
		&__items {
			grid-column-gap: ${ theme.spaces.gridGap2 };
			grid-row-gap: ${ theme.spaces.gridGap2 };
			
			@media (max-width: 1024px) {
				grid-column-gap: ${ theme.spaces.gridGap };
				grid-row-gap: ${ theme.spaces.gridGap };
				display: flex;
				flex-direction: column;
			}
		}
	}
	
	
	.cart-item {
		padding: ${ theme.spaces.normal };
		display: flex;
		flex-wrap: wrap;
		border-radius: 12px;
		background: ${ theme.colors.colorWhite };
		border: 1px solid ${ theme.colors.colorNavyLight };
		
		&:hover {
			background: ${ theme.colors.colorNavyDark };
			
			.cart-item__icon {
				background-color: ${ theme.colors.colorWhite };
				
				svg path {
					stroke: #221551;
				}
			}
			
			.cart-item__title,
			.cart-item__btn {
				color: ${ theme.colors.colorSkyLight };
			}
			
			.cart-item__btn {
				&:hover {
					color: ${ theme.colors.colorOrange };
				}
			}
		}
		
		&__icon {
			margin-bottom: ${ theme.spaces.small };
			background-color: ${ theme.colors.colorNavyDark };
			border-radius: 12px;
			padding: ${ theme.spaces.mini };
			display: flex;
			width: 40px;
			height: 40px;
			overflow: hidden;
			
			img {
				max-width: 100%;
				width: 100%;
				height: auto;
			}
		}
		
		&__title {
			width: 100%;
			margin-bottom: ${ theme.spaces.small };
			color: ${ theme.colors.colorNavyDark };
		}
		
		&__content {
			margin-bottom: ${ theme.spaces.small };
			color: ${ theme.colors.colorNavyLight };
		}
		
		&__btn {
			margin-top: auto;
			color: ${ theme.colors.colorNavyDark };
			display: inline-flex;
		}
		
		&.type-dark {
			background: ${ theme.colors.colorNavyDark };
			
			.cart-item__title {
				color: ${ theme.colors.colorWhite };
			}
			
			.cart-item__content {
				color: ${ theme.colors.colorWhite };
			}
			
			.cart-item__btn {
				color: ${ theme.colors.colorWhite };
			}
		}
	}
`;

const CartBlock: React.FC<CartBlockProps> = ( {
	data : {
		cards_fields_cart_repeater,
		cards_fields_cart_type,
		cards_fields_title
	}
} ) => {
	
	return (
		<Wrapper className={ 'cart-block' }>
			<Container>
				{
					cards_fields_title &&
          <Typography className={ 'cart-block__block-title' } variant={ 'subheader1' } type={ 'p' }>
						{ cards_fields_title }
          </Typography>
				}
				<GridSystem variant={ 'grid-3' } className={ 'cart-block__items' }>
					{
						cards_fields_cart_repeater?.map( ( item, idx ) => {
							return (
								<div key={ idx } className={ `cart-item type-${ cards_fields_cart_type }` }>
									{
										item?.cart_icon &&
                    <div className={ 'cart-item__icon' }>
                      <Svg svg={ item?.cart_icon }/>
                    </div>
									}
									{
										item?.title &&
                    <Typography className={ 'cart-item__title' } variant={ 'h4' } type={ 'h4' }>
											{ item?.title }
                    </Typography>
									}
									{
										item?.content &&
                    <Typography className={ 'cart-item__content' } variant={ 'body_1_large' } type={ 'p' }>
											{ item?.content }
                    </Typography>
									}
									{
										item?.link && item?.link_title &&
                    <Button type={ 'link-type_2' }
                            title={ item?.link_title }
                            isHyperlink={ true }
                            hrefLink={ item?.link?.url }
                            className={ 'cart-item__btn link-type_2' }/>
									}
								</div>
							)
						} )
					}
				</GridSystem>
			</Container>
		</Wrapper>
	);
};

export default CartBlock;