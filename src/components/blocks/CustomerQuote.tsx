'use client'

import React from 'react';
import styled from '@emotion/styled';
import Container from "../Container";
import Typography from "../UI/Typography";
import GridSystem from "../UI/Grid/GridSystem";
import Svg from "@/components/Svg";
import Stars from "@/components/Icons/Stars";
import theme from "@/styles/theme";


interface CustomerQuoteProps {
	data: {
		customer_quote_items: {
			content: string
			customer_icon: string
			customer_location: string
			customer_name: string
			star_number: string
		}[]
		title: string;
		title_star_number: string;
	}
}


const Wrapper = styled.div`
	padding-top: ${ theme.spaces.medium2 };
	padding-bottom: ${ theme.spaces.medium2 };
	
	@media screen and (max-width: ${ theme.responsiveMediaSizes.m920 }) {
		padding: ${ theme.spaces.normal } 0;
	}
	
	.customer-quote {
		&__header {
			margin-bottom: ${ theme.spaces.normal };
			display: flex;
			align-items: flex-end;
		}
		
		&__title {
			margin-bottom: ${ theme.spaces.normal };
		}
		
		&__stars-wrap {
			margin-left: ${ theme.spaces.small };
			
			svg {
				padding-right: ${ theme.spaces.little };
			}
		}
		
		&__items {
			grid-column-gap: 32px;
			grid-row-gap: 32px;
			
			@media (max-width: 1024px) {
				grid-column-gap: ${ theme.spaces.gridGap };
				grid-row-gap: ${ theme.spaces.gridGap };
				display: flex;
				flex-direction: column;
			}
		}
		
		&__item {
			background: ${ theme.colors.colorWhite };
			padding: ${ theme.spaces.normal };
			border: 1px solid ${ theme.colors.colorPurpleLight };
			border-radius: 12px;
			
			@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
				padding: ${ theme.spaces.small };
			}
			
			&-stars {
				margin: ${ theme.spaces.normal } 0;
				
				svg {
					padding-right: ${ theme.spaces.little };
				}
			}
		}
		
		&__author {
			margin-left: ${ theme.spaces.small };
			
			&-wrap {
				display: flex;
				align-items: flex-start;
			}
			
			&_image-wrap {
				width: 40px;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: ${ theme.colors.colorNavyDark };
				border-radius: 12px;
				padding: ${ theme.spaces.mini };
			}
		}
		
		&__customer {
			&_name {
				line-height: 1.4;
				
				@media screen and (max-width: ${ theme.responsiveMediaSizes.m480 }) {
					font-size: 16px;
				}
			}
			
			&_location {
				color: ${ theme.colors.colorNavyLight };
			}
		}
		
		&__content {
			color: ${ theme.colors.colorNavyLight };
		}
	}
`;

const CustomerQuote: React.FC<CustomerQuoteProps> = ( {
	data : {
		customer_quote_items,
		title,
		title_star_number,
	}
} ) => {
	return (
		<Wrapper className={ 'customer-quote' }>
			<Container>
				<div className="customer-quote__header">
					{
						title &&
            <Typography className={ 'news-block__title' } variant={ 'h5' } type={ 'h5' }>
							{ title }
            </Typography>
					}
					<div className={ 'customer-quote__stars-wrap' }>
						{
							Array.from( { length : +title_star_number }, ( _, index ) => (
								<Stars key={ index }/>
							) )
						}
					</div>
				</div>
				<GridSystem variant={ 'grid-3' } className={ 'customer-quote__items' }>
					{
						customer_quote_items &&
						customer_quote_items.map( ( item, i ) => {
							return (
								<div key={ i } className={ 'customer-quote__item' }>
									{
										item?.content &&
                    <Typography className={ 'customer-quote__content' } variant={ 'body_1_large' }>
											{ item?.content }
                    </Typography>
									}
									<div className={ 'customer-quote__item-stars' }>
										{
											Array.from( { length : +item?.star_number }, ( _, index ) => (
												<Stars key={ index }/>
											) )
										}
									</div>
									<div className={ 'customer-quote__author-wrap' }>
										<figure className={ 'customer-quote__author_image-wrap' }>
											{
												item?.customer_icon &&
                        <Svg svg={ item?.customer_icon }/>
											}
										</figure>
										<div className={ 'customer-quote__author' }>
											{
												item?.customer_name &&
                        <Typography className={ 'customer-quote__customer_name' }
                                    variant={ 'subheader1' }>
													{ item?.customer_name }
                        </Typography>
											}
											{
												item?.customer_location &&
                        <Typography className={ 'customer-quote__customer_location' }
                                    variant={ 'body_1_large' }>
													{ item?.customer_location }
                        </Typography>
											}
										</div>
									</div>
								</div>
							)
						} )
					}
				</GridSystem>
			</Container>
		</Wrapper>
	)
};

export default CustomerQuote;