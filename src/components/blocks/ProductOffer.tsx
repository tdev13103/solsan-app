'use client'

import React, { FC, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Typography from '../UI/Typography';
import Container from '../Container';
import GridSystem from '../UI/Grid/GridSystem';
import { generateKey } from "@/helpers";
import theme from "@/styles/theme";
import Button from "@/components/Button";
import { useProductsContext } from "@/context/products.context";
import Image from "next/image";
import { useThemeContext } from "@/context/theme.context";
import { useAppDispatch } from "@/redux/hooks";
import { setCartState } from "@/redux/features/cartActions";
import { useDisclosure } from "@mantine/hooks";
import ProductModal from "@/components/ProductModal";

interface ProductOfferProps {
	data: {
		block_title: string;
		cart_btn: {
			title: string;
			url: string;
		}
		desc: string;
		more_info_btn: {
			title: string;
			url: string;
		}
		product_repeater: {
			product_item: number;
		}[]
	}
}

type CartItem = {
	name: string | undefined;
	id: number;
	price: string | undefined;
	quantity: number;
	image: {
		sourceUrl: string;
		title: string;
	}
	equipment: string;
};

const Wrapper = styled.div`
	overflow: hidden;
	padding-top: ${ theme.spaces.medium3 };
	padding-bottom: ${ theme.spaces.medium3 };
	
	.product-offer {
		
		&__info {
			max-width: 760px;
		}
		
		&__title {
			margin-bottom: ${ theme.spaces.normal };
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				margin-bottom: ${ theme.spaces.small };
			}
		}
		
		&__desc {
			margin-bottom: ${ theme.spaces.small };
		}
		
		&__products {
			grid-column-gap: 33px;
			grid-row-gap: 33px;
		}
		
		&__product {
			border-radius: 12px;
			border: 1px solid #8f8aa6;
			padding: ${ theme.spaces.normal };
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			z-index: 1;
		}
		
		&__product-title {
			margin-bottom: ${ theme.spaces.small };
		}
		
		&__p-title {
			margin-bottom: ${ theme.spaces.small };
		}
		
		&__p-vat-title {
			margin-bottom: ${ theme.spaces.mini };
			color: ${ theme.colors.colorNavyLight };
		}
		
		&__p-icon {
			width: 100%;
			min-height: 174px;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 12px;
			margin-bottom: ${ theme.spaces.small };
		}
		
		&__p-price-wrap {
			display: flex;
			align-items: flex-start;
			margin-bottom: ${ theme.spaces.mini };
		}
		
		&__p-price {
			margin-right: ${ theme.spaces.mini };
		}
		
		&__p-excerpt {
			margin-bottom: ${ theme.spaces.small };
		}
		
		&__installation-wrap {
			margin-left: 0;
			margin-bottom: ${ theme.spaces.small };
		}
		
		&__installation {
			display: none;
			
			&:checked + .product-offer__installation__field-label:after {
				background: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMjIxNTUxIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiICB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCA3OC4zNjkgNzguMzY5IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNNzguMDQ5LDE5LjAxNUwyOS40NTgsNjcuNjA2Yy0wLjQyOCwwLjQyOC0xLjEyMSwwLjQyOC0xLjU0OCwwTDAuMzIsNDAuMDE1Yy0wLjQyNy0wLjQyNi0wLjQyNy0xLjExOSwwLTEuNTQ3bDYuNzA0LTYuNzA0YzAuNDI4LTAuNDI3LDEuMTIxLTAuNDI3LDEuNTQ4LDBsMjAuMTEzLDIwLjExMmw0MS4xMTMtNDEuMTEzYzAuNDI5LTAuNDI3LDEuMTItMC40MjcsMS41NDgsMGw2LjcwMyw2LjcwNEM3OC40NzcsMTcuODk0LDc4LjQ3NywxOC41ODYsNzguMDQ5LDE5LjAxNXoiLz48L2c+PC9zdmc+) center center no-repeat;
				background-size: calc(100% - 5px) auto;
			}
		}
		
		&__installation__field-label {
			padding-left: ${ theme.spaces.gridGap2 };
			position: relative;
			z-index: 1;
			color: ${ theme.colors.colorNavyLight };
			cursor: pointer;
			font-size: 18px;
			margin-bottom: ${ theme.spaces.small };
			
			&:after {
				position: absolute;
				content: '';
				display: block;
				left: 0;
				top: -3px;
				width: 18px;
				height: 18px;
				z-index: 1;
				border-radius: 3px;
				border: 2px solid #221551;
			}
		}
		
		&__p-label {
			max-width: max-content;
			color: #221551;
			line-height: 1.06;
			padding: 12px;
			border-radius: 12px 0 0 12px;
			border: 2px solid #221551;
			position: absolute;
			z-index: 1;
			bottom: 121px;
			right: 0;
		}
		
		&__buttons {
			display: flex;
			align-items: center;
			gap: 24px;
			margin-top: auto;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m1270 }) {
				flex-wrap: wrap;
			}
		}
	}
`;

const ProductOffer: FC<ProductOfferProps> = ( {
	data : {
		block_title,
		cart_btn,
		desc,
		more_info_btn,
		product_repeater
	}
} ) => {
	const { productsSettings } = useProductsContext()
	const { themeSettings : { priceInclVatLabel } } = useThemeContext()
	
	const dispatch = useAppDispatch();
	
	const [
		opened, {
			open,
			close
		}
	] = useDisclosure( false );
	
	const [selectedProductId, setSelectedProductId] = useState( 0 )
	const [installationValues, setInstallationValues] = useState<Array<{ id: string; checked: boolean }>>( [] );
	
	const selectedProducts = productsSettings.filter( product => product_repeater?.some( item => item?.product_item === product?.productId ) )
	                                         .reverse()
	
	const ref = useRef<(HTMLInputElement | null)[]>( Array( selectedProducts?.length ).fill( null ) );
	
	const addToCart = ( event: Event, productId: number ) => {
		event.preventDefault();
		const currentProduct = selectedProducts.find( product => product?.productId === productId );
		const numericPrice = currentProduct?.price?.replace( /[^\d,.]/g, '' )?.split( '.' )[0]?.replace( /,/g, ' ' );
		
		const cartItem: CartItem = {
			id        : productId,
			quantity  : 1,
			name      : currentProduct?.title,
			price     : numericPrice,
			image     : currentProduct?.image || {
				sourceUrl : '',
				title     : ''
			},
			equipment : currentProduct?.woocommerceProductSettings?.productEquipment || '',
		};
		
		dispatch( setCartState( cartItem ) );
		close();
	}
	
	
	const handleClick = ( index: number ) => {
		const inputElement = ref.current[index];
		if ( inputElement ) {
			const id = inputElement.id;
			const checked = inputElement.checked;
			
			const newInstallationValues = [...installationValues];
			newInstallationValues[index] = {
				id,
				checked
			};
			
			setInstallationValues( newInstallationValues );
		}
	}
	
	const openProductModal = ( event: Event, productId: number ) => {
		event.preventDefault();
		setSelectedProductId( productId )
		open()
	}
	
	return (
		<Wrapper className={ 'product-offer' }>
			<Container>
				<div className="product-offer__info">
					{
						block_title &&
            <Typography className={ 'product-offer__title' }
                        variant={ 'h2' } type={ 'h2' }>
							{ block_title }
            </Typography>
					}
					{
						desc &&
            <Typography className={ 'product-offer__desc' }
                        variant={ 'body_1_large' } type={ 'p' }>
							{ desc }
            </Typography>
					}
				</div>
				<GridSystem variant={ 'grid-3' }
				            className="product-offer__products">
					{
						selectedProducts?.map( ( item, index ) => {
							const numericPrice = item?.price?.replace( /[^\d,.]/g, '' )?.split( '.' )[0]?.replace( /,/g, ' ' );
							return (
								<div className="product-offer__product"
								     key={ generateKey( index ) }>
									{
										item.title &&
                    <Typography
                      className={ 'product-offer__p-title' }
                      variant={ 'h4' } type={ 'h4' }>
											{ item.title }
                    </Typography>
									}
									{
										item?.image &&
                    <div className="product-offer__p-icon"
                         style={ { backgroundColor : item.woocommerceProductSettings?.productCardColor } }>
                      <Image src={ item?.image?.sourceUrl } alt={ item?.image?.title } width={ 238 } height={ 142 }/>
                    </div>
									}
									{
										item.content &&
                    <Typography
                      className={ 'product-offer__p-excerpt' }
                      variant={ 'body_1_large' } dangerouslySetInnerHTML={ { __html : item?.content } }/>
									}
									<div
										className={ 'product-offer__p-price-wrap' }>
										{
											numericPrice &&
                      <Typography
                        className={ 'product-offer__p-price' }
                        variant={ 'h3' }
                        type={ 'h3' }>
												{ numericPrice }
                      </Typography>
										}
										<Typography
											className={ 'product-offer__p-currency' }
											variant={ 'body_1_large' }
											type={ 'p' }>
											SEK
										</Typography>
									</div>
									
									<Typography
										className={ 'product-offer__p-vat-title' }
										variant={ 'body_1_large' }
										type={ 'p' }>
										{ priceInclVatLabel }
									</Typography>
									{
										item?.woocommerceProductSettings?.displayVatTitle &&
                    <>
                      <input
                        id={ `installation-${ index }` }
                        className={ `product-offer__installation` }
                        name='installation'
                        type='checkbox'
                        ref={ el => ref.current[index] = el }
                        defaultChecked={ installationValues[index]?.checked || false }
                        onClick={ () => handleClick( index ) }
                      />
                      <label
                        htmlFor={ `installation-${ index }` }
                        className={ `product-offer__installation__field-label` }
                        dangerouslySetInnerHTML={ { __html : 'Intresserad av installation' } }
                      />
                    </>
									}
									{
										item.woocommerceProductSettings?.productCardLabel &&
                    <Typography
                      className={ 'product-offer__p-label' }
                      variant={ 'body_1_large' }
                      type={ 'p' }
                      style={ { backgroundColor : item.woocommerceProductSettings?.productCardColor } }>
											{ item.woocommerceProductSettings?.productCardLabel }
                    </Typography>
									}
									<div className={ 'product-offer__buttons' }>
										<Button type={ 'button_2' }
										        title={ cart_btn?.title }
										        isHyperlink={ false }
										        onClick={ ( event: Event ) => addToCart( event, item?.productId ) }
										        className={ 'product-offer__cart-btn' }/>
										<Button type={ 'link-type_2' }
										        title={ more_info_btn?.title }
										        isHyperlink={ true }
										        hrefLink={ '/' }
										        onClick={ ( event: Event ) => openProductModal( event, item?.productId ) }
										        className={ 'product-offer__more-btn' }/>
									</div>
								
								</div>
							);
						} )
					}
				</GridSystem>
			</Container>
			<ProductModal close={ close } opened={ opened } addToCart={ addToCart } installationValues={ installationValues }
			              selectedProducts={ selectedProducts } productId={ selectedProductId }/>
		</Wrapper>
	);
};

export default ProductOffer;

