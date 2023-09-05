'use client'

import React, { FC } from 'react';
import Typography from "@/components/UI/Typography";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { useProductsContext } from "@/context/products.context";

interface CartItem {
	name: string | undefined;
	id: number;
	price: string | undefined;
	quantity: number;
	image: {
		sourceUrl: string;
		title: string;
	};
	equipment: string;
}

interface CartTotalProps {
	cartData: CartItem[]
}

type Vat = number | "" | undefined

const Wrapper = styled.div`
	.cart-total {
		
		&__total {
			
			&_price {
				font-size: 16px;
				font-weight: 700;
			}
			
			&_title {
				font-size: 16px;
				font-weight: 700;
			}
			
			&_wrap {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 0 0 ${ theme.spaces.normal };
			}
		}
		
		&__vat {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 0 ${ theme.spaces.small };
			
			&_price {
				font-size: 16px;
				font-weight: 700;
				
				span {
					font-weight: 400;
				}
			}
			
			&_title {
				font-size: 16px;
			}
		}
	}
`

const CartTotal: FC<CartTotalProps> = ( { cartData } ) => {
	const {
		productsSettings : {
			shippingMethods,
			taxRates
		}
	} = useProductsContext()
	
	const shippingMethodCost = shippingMethods.find( method => method?.title === 'Flat rate' )?.cost;
	const taxRate = taxRates.find( rate => rate?.name === 'Tax' )?.rate;
	
	const calculateTotalPrice = (
		products: CartItem[], shippingMethodCost?: Vat, productVat?: Vat ) => {
		const totalPrice = products.reduce( ( accumulator, product ) => {
			const price: Vat = product.price && parseFloat( product.price.replace( /\s/g, "" ).replace( ",", "." ) );
			return price ? accumulator + price * product.quantity : accumulator;
		}, 0 );
		
		if ( shippingMethodCost || productVat ) {
			return totalPrice + (shippingMethodCost || 0) + (productVat || 0);
		}
		
		return totalPrice;
	};
	
	const totalPrice = calculateTotalPrice( cartData );
	const productVat = taxRate && totalPrice * (parseFloat( taxRate ) / 100)
	const totalPriceWithTaxAndRate = calculateTotalPrice( cartData, shippingMethodCost, productVat );
	
	
	return (
		<Wrapper>
			<div className={ 'cart-total__total_wrap' }>
				<Typography
					className={ 'cart-total__total_title' }
					variant={ 'body_1_large' }
					type={ 'p' }>
					Varukorg totalt
				</Typography>
				<Typography
					className={ 'cart-total__total_price' }
					variant={ 'body_1_large' }
					type={ 'p' }>
					{ `${ totalPriceWithTaxAndRate } SEK` }
				</Typography>
			</div>
			
			<div className={ 'cart-total__vat' }>
				<Typography
					className={ 'cart-total__vat_title' }
					variant={ 'body_1_large' }
					type={ 'p' }>
					Summa (exkl. moms)
				</Typography>
				<Typography
					className={ 'cart-total__vat_price' }
					variant={ 'body_1_large' }
					type={ 'p' }>
					{ `${ totalPrice } ` }
					<span>SEK</span>
				</Typography>
			</div>
			
			<div className={ 'cart-total__vat' }>
				<Typography
					className={ 'cart-total__vat_title' }
					variant={ 'body_1_large' }
					type={ 'p' }>
					Moms
				</Typography>
				<Typography
					className={ 'cart-total__vat_price' }
					variant={ 'body_1_large' }
					type={ 'p' }>
					{ `${ productVat } ` }
					<span>SEK</span>
				</Typography>
			</div>
			
			<div className={ 'cart-total__vat' }>
				<Typography
					className={ 'cart-total__vat_title' }
					variant={ 'body_1_large' }
					type={ 'p' }>
					Frakt
				</Typography>
				<Typography
					className={ 'cart-total__vat_price' }
					variant={ 'body_1_large' }
					type={ 'p' }>
					{ `${ shippingMethodCost } ` }
					<span>SEK</span>
				</Typography>
			</div>
		</Wrapper>
	);
};

export default CartTotal;