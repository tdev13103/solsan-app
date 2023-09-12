'use client'

import React, {FC, useState} from 'react';
import styled from '@emotion/styled';
import Typography from '../UI/Typography';
import Container from '../Container';
import GridSystem from '../UI/Grid/GridSystem';
import {generateKey} from "@/helpers";
import theme from "@/styles/theme";
import Button from "@/components/Button";
import {useProductsContext} from "@/context/products.context";
import Image from "next/image";
import {useThemeContext} from "@/context/theme.context";
import {useAppDispatch} from "@/redux/hooks";
import {setCartState} from "@/redux/features/cartActions";
import {useDisclosure} from "@mantine/hooks";
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
    price: string;
    quantity: number;
    image: {
        sourceUrl: string;
        title: string;
    }
    equipment: string;
    taxStatus: string;
};

const Wrapper = styled.div`
  overflow: hidden;
  padding-top: ${theme.spaces.medium3};
  padding-bottom: ${theme.spaces.medium3};

  @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
    padding-top: ${theme.spaces.small};
  }

  .product-offer {

    &__info {
      max-width: 760px;
    }

    &__title {
      margin-bottom: ${theme.spaces.normal};

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        margin-bottom: ${theme.spaces.small};
        font-size: 28px;
      }
    }

    &__desc {
      margin-bottom: ${theme.spaces.small};

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        margin-bottom: ${theme.spaces.normal};
      }
    }

    &__products {
      grid-column-gap: 33px;
      grid-row-gap: 33px;

      @media screen and (max-width: ${theme.responsiveMediaSizes.m1270}) {
        grid-column-gap: 16px;
        grid-row-gap: 16px;
      }

      @media screen and (max-width: ${theme.responsiveMediaSizes.m1024}) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        grid-template-columns: 1fr;
      }
    }

    &__product {
      border-radius: 12px;
      border: 1px solid #8f8aa6;
      padding: ${theme.spaces.normal};
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      z-index: 1;

      @media screen and (max-width: ${theme.responsiveMediaSizes.m1270}) {
        padding: ${theme.spaces.small};
      }
    }

    &__product-title {
      margin-bottom: ${theme.spaces.small};
    }

    &__p-title {
      margin-bottom: ${theme.spaces.small};
    }

    &__p-vat-title {
      margin-bottom: ${theme.spaces.gridGap2};
      color: ${theme.colors.colorNavyLight};

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        margin-bottom: ${theme.spaces.normal};
      }
    }

    &__p-icon {
      width: 100%;
      min-height: 174px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
      margin-bottom: ${theme.spaces.small};
    }

    &__p-price-wrap {
      display: flex;
      align-items: flex-start;
      margin-bottom: ${theme.spaces.mini};
      margin-top: auto;
    }

    &__p-price {
      margin-right: ${theme.spaces.mini};
    }

    &__p-excerpt {
      margin-bottom: ${theme.spaces.small};

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        margin-bottom: ${theme.spaces.normal};
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

      @media screen and (max-width: ${theme.responsiveMediaSizes.m1270}) {
        display: none;
      }
    }

    &__buttons {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-top: auto;

      @media screen and (max-width: ${theme.responsiveMediaSizes.m1270}) {
        flex-wrap: wrap;
        justify-content: center;
      }

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        gap: 16px;
      }
    }

    &__cart-btn {
      @media screen and (max-width: ${theme.responsiveMediaSizes.m1270}) {
        width: 100%;
      }
    }
  }
`;

const ProductOffer: FC<ProductOfferProps> = ({
                                                 data: {
                                                     block_title,
                                                     cart_btn,
                                                     desc,
                                                     more_info_btn,
                                                     product_repeater
                                                 }
                                             }) => {
    const {productsSettings} = useProductsContext()
    const {themeSettings: {priceInclVatLabel}} = useThemeContext()

    const dispatch = useAppDispatch();
    const [opened, {open, close}] = useDisclosure(false);

    const [selectedProductId, setSelectedProductId] = useState(0)

    const selectedProducts = productsSettings?.products
        .filter(product => product_repeater?.some(item => item?.product_item === product?.productId))
        .reverse()
    const installationProduct = productsSettings?.products.find(product => product?.slug === "installation")


    const addToCart = (event: Event, productId: number) => {
        event.preventDefault();
        const currentProduct = selectedProducts.find(product => product?.productId === productId);
        const numericPrice = currentProduct?.price?.replace(/[^\d,.]/g, '')?.split('.')[0]?.replace(/,/g, ' ');

        if (currentProduct) {
            const cartItem: CartItem = {
                id: productId,
                quantity: 1,
                name: currentProduct?.name,
                price: numericPrice as string,
                image: currentProduct?.image || {
                    sourceUrl: '',
                    title: ''
                },
                equipment: currentProduct?.woocommerceProductSettings?.productEquipment || '',
                taxStatus: currentProduct.taxStatus
            };
            dispatch(setCartState(cartItem));
        }

        close();
    }

    const openProductModal = (event: Event, productId: number) => {
        event.preventDefault();
        setSelectedProductId(productId)
        open()
    }

    return (
        <Wrapper className={'product-offer'}>
            <Container>
                <div className="product-offer__info">
                    {
                        block_title &&
                        <Typography className={'product-offer__title'}
                                    variant={'h2'} type={'h2'}>
                            {block_title}
                        </Typography>
                    }
                    {
                        desc &&
                        <Typography className={'product-offer__desc'}
                                    variant={'body_1_large'} type={'p'}>
                            {desc}
                        </Typography>
                    }
                </div>
                <GridSystem variant={'grid-3'}
                            className="product-offer__products">
                    {
                        selectedProducts?.map((item, index) => {
                            const numericPrice = item?.price?.replace(/[^\d,.]/g, '')?.split('.')[0]?.replace(/,/g, ' ');
                            return (
                                <div className="product-offer__product"
                                     key={generateKey(index)}>
                                    {
                                        item.name &&
                                        <Typography
                                            className={'product-offer__p-title'}
                                            variant={'h4'} type={'h4'}>
                                            {item.name}
                                        </Typography>
                                    }
                                    {
                                        item?.image &&
                                        <div className="product-offer__p-icon"
                                             style={{backgroundColor: item.woocommerceProductSettings?.productCardColor}}>
                                            <Image src={item?.image?.sourceUrl} alt={item?.image?.title} width={238}
                                                   height={142}/>
                                        </div>
                                    }
                                    {
                                        item.content &&
                                        <Typography
                                            className={'product-offer__p-excerpt'}
                                            variant={'body_1_large'} dangerouslySetInnerHTML={{__html: item?.content}}/>
                                    }
                                    <div
                                        className={'product-offer__p-price-wrap'}>
                                        {
                                            numericPrice &&
                                            <Typography
                                                className={'product-offer__p-price'}
                                                variant={'h3'}
                                                type={'h3'}>
                                                {numericPrice}
                                            </Typography>
                                        }
                                        <Typography
                                            className={'product-offer__p-currency'}
                                            variant={'body_1_large'}
                                            type={'p'}>
                                            SEK
                                        </Typography>
                                    </div>

                                    <Typography
                                        className={'product-offer__p-vat-title'}
                                        variant={'body_1_large'}
                                        type={'p'}>
                                        {priceInclVatLabel}
                                    </Typography>
                                    {
                                        item.woocommerceProductSettings?.productCardLabel &&
                                        <Typography
                                            className={'product-offer__p-label'}
                                            variant={'body_1_large'}
                                            type={'p'}
                                            style={{backgroundColor: item.woocommerceProductSettings?.productCardColor}}>
                                            {item.woocommerceProductSettings?.productCardLabel}
                                        </Typography>
                                    }
                                    <div className={'product-offer__buttons'}>
                                        <Button type={'button_2'}
                                                title={cart_btn?.title}
                                                isHyperlink={false}
                                                onClick={(event: Event) => addToCart(event, item?.productId)}
                                                className={'product-offer__cart-btn'}/>
                                        <Button type={'link-type_2'}
                                                title={more_info_btn?.title}
                                                isHyperlink={true}
                                                hrefLink={'/'}
                                                onClick={(event: Event) => openProductModal(event, item?.productId)}
                                                className={'product-offer__more-btn'}/>
                                    </div>

                                </div>
                            );
                        })
                    }
                </GridSystem>
            </Container>
            <ProductModal close={close} opened={opened} addToCart={addToCart} selectedProducts={selectedProducts}
                          productId={selectedProductId} installationProduct={installationProduct}/>
        </Wrapper>
    );
};

export default ProductOffer;

