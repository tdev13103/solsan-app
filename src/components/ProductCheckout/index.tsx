'use client'

import React, { FC } from 'react';
import Container from "@/components/Container";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { useAppSelector } from "@/redux/hooks";
import Typography from "@/components/UI/Typography";
import CartTotal from "@/components/CartTotal";


interface ProductCheckoutProps {
	data: {
		blocks: any
		pageAdditionalSettings: {
			isItGeneralPage: boolean;
		}
		pageId: number;
		slug: string;
		title: string;
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
	};
	equipment: string;
};

const Wrapper = styled.div`
	padding-bottom: ${ theme.spaces.large19 };
	
	.product-checkout {
		
		&__title {
			margin: 0 0 ${ theme.spaces.normal };
		}
		
		&__box {
			max-width: 535px;
		}
		
		&__price-wrap {
			display: flex;
			align-items: center;
			gap: 8px;
		}
		
		&__price {
			font-size: 16px;
			font-weight: 700;
		}
		
		&__currency {
			font-size: 16px;
		}
		
		&__card {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 0 ${ theme.spaces.small };
			
			&.last {
				margin: 0 0 ${ theme.spaces.medium3 };
			}
		}
		
		&__captions {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 0 ${ theme.spaces.normal };
			
			&_products {
				font-weight: 700;
			}
			
			&_sum {
				font-weight: 700;
			}
		}
		
		&__p_equipment {
			font-size: 16px;
			margin: 0 0 ${ theme.spaces.mini };
		}
		
		&__name {
			font-size: 16px;
		}
		
		&__quantity {
			display: flex;
			padding: 4px 12px;
			align-items: center;
			font-size: 16px;
			border-radius: 6px;
			border: 1px solid #221551;
			
			&_wrap {
				display: flex;
				align-items: center;
				gap: 8px;
			}
			
			&_btn {
				display: flex;
				background: none;
				cursor: pointer;
				padding: 4px;
				align-items: flex-start;
				gap: 10px;
				border-radius: 6px;
				border: 1px solid #221551;
			}
		}
	}
`

const ProductCheckout: FC<ProductCheckoutProps> = ( {
	data : {
		pageAdditionalSettings
	}
} ) => {
	const cartData: CartItem[] = useAppSelector( state => state?.cartReducer?.items );
	
	return (
		<Wrapper className={ `${ pageAdditionalSettings?.isItGeneralPage ? 'page-without-banner' : '' }` }>
			<Container>
				<div className={ 'product-checkout__box' }>
					<Typography
						className={ 'product-checkout__title' }
						variant={ 'h4' }
						type={ 'h4' }>
						Utcheckning
					</Typography>
					<div className={ 'product-checkout__captions' }>
						<Typography
							className={ 'product-checkout__captions_products' }
							variant={ 'body_1_large' }
							type={ 'p' }>
							Produkter
						</Typography>
						<Typography
							className={ 'product-checkout__captions_sum' }
							variant={ 'body_1_large' }
							type={ 'p' }>
							Summa
						</Typography>
					</div>
					{
						cartData?.map( ( item, idx ) => {
							return (
								<div className={ 'product-checkout__card' } key={ idx }>
									<Typography
										className={ 'product-checkout__name' }
										variant={ 'body_1_large' }
										type={ 'p' }>
										{ item?.name }
									</Typography>
									<div className={ 'product-checkout__price-wrap' }>
										{
											item?.price &&
                      <Typography
                        className={ 'product-checkout__price' }
                        variant={ 'body_1_large' }
                        type={ 'p' }>
												{ item?.price }
                      </Typography>
										}
										<Typography
											className={ 'product-checkout__currency' }
											variant={ 'body_1_large' }
											type={ 'p' }>
											SEK
										</Typography>
									</div>
								</div>
							)
						} )
					}
					<div className={ 'product-checkout__card last' }>
						<Typography
							className={ 'product-checkout__name' }
							variant={ 'body_1_large' }
							type={ 'p' }>
							Intresserad av installation
						</Typography>
						<div className={ 'product-checkout__price-wrap' }>
							<Typography
								className={ 'product-checkout__price' }
								variant={ 'body_1_large' }
								type={ 'p' }>
								0
							</Typography>
							<Typography
								className={ 'product-checkout__currency' }
								variant={ 'body_1_large' }
								type={ 'p' }>
								SEK
							</Typography>
						</div>
					</div>
					
					<CartTotal cartData={ cartData }/>
				</div>
			</Container>
		</Wrapper>
	);
};

export default ProductCheckout;