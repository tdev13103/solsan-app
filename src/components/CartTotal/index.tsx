'use client'

import React, {Dispatch, FC, SetStateAction, useEffect} from 'react';
import Typography from "@/components/UI/Typography";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import {useProductsContext} from "@/context/products.context";
import {parseProductPrice} from "@/helpers";

interface CartItem {
    name?: string | undefined;
    id?: number;
    price?: string;
    quantity?: number;
    image?: {
        sourceUrl: string;
        title: string;
    };
    equipment?: string;
    installation?: boolean;
    taxStatus?: string;
}

interface CartTotalProps {
    cartData: CartItem[];
    setTotalPrice?: Dispatch<SetStateAction<number>>;
    setShippingValue?: Dispatch<SetStateAction<number>>;
    setVATValue?: Dispatch<SetStateAction<number>>;
    installationProduct?: CartItem | null
}

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
        margin: 0 0 ${theme.spaces.normal};

        @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
          margin: 0 0 ${theme.spaces.small};
        }
      }
    }

    &__vat {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 ${theme.spaces.small};

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        margin: 0 0 ${theme.spaces.mini};
      }

      &:last-of-type {
        margin: 0 0 ${theme.spaces.mini};
      }

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

      &_desc {
        font-size: 14px;
        line-height: 1.1;
        max-width: 570px;

        @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
          font-size: 12px;
        }
      }
    }
  }
`

const CartTotal: FC<CartTotalProps> = ({
                                           cartData,
                                           setTotalPrice,
                                           setShippingValue,
                                           setVATValue,
                                           installationProduct
                                       }) => {
    const {
        productsSettings: {
            shippingMethods,
            taxRates
        }
    } = useProductsContext()

    const shippingMethodCost = shippingMethods.find(method => method?.title === 'Flat rate')?.cost;
    const taxRate = taxRates.find(rate => rate?.name === 'Tax')?.rate as string;

    const newCartData = [...cartData];

    if (installationProduct?.installation) {
        newCartData.push(installationProduct);
    }

    const calculateTotalPrice = (
        products: CartItem[],
        shippingMethodCost: number = 0,
        productVat: number = 0
    ) => {
        const totalPrice = products.reduce((accumulator, product) => {
            const price: number = product.price && parseProductPrice(product.price) || 0;
            return accumulator + price * (product.quantity ?? 0);
        }, 0);

        if (installationProduct?.installation && installationProduct?.price) {
            const installationProductNumber = parseProductPrice(installationProduct.price);
            return totalPrice + shippingMethodCost + productVat + installationProductNumber;
        }

        return totalPrice + shippingMethodCost + productVat;
    };

    function calculateProductVat(cartData: CartItem[], taxRate: string) {
        let totalVat = 0;

        for (const product of cartData) {
            if (product.taxStatus && product.taxStatus !== 'NONE') {
                const productVat = product.price && parseProductPrice(product.price) * (parseFloat(taxRate) / 100);
                totalVat += productVat as number;
            }
        }
        return totalVat;
    }


    const totalPrice = calculateTotalPrice(newCartData);
    const productVat = calculateProductVat(newCartData, taxRate)
    const totalPriceWithTaxAndRate = calculateTotalPrice(newCartData, shippingMethodCost, productVat);

    useEffect(() => {
        if (setTotalPrice && setShippingValue && setVATValue) {
            setTotalPrice(totalPriceWithTaxAndRate);
            if (shippingMethodCost) {
                setShippingValue((+shippingMethodCost * 100) ?? 0);
            }
            if (productVat) {
                setVATValue((+productVat * 100) ?? 0);
            }
        }
    }, [setTotalPrice, setShippingValue, setVATValue, totalPriceWithTaxAndRate, shippingMethodCost, productVat]);

    return (
        <Wrapper>
            <div className={'cart-total__total_wrap'}>
                <Typography
                    className={'cart-total__total_title'}
                    variant={'body_1_large'}
                    type={'p'}>
                    Varukorg totalt
                </Typography>
                <Typography
                    className={'cart-total__total_price'}
                    variant={'body_1_large'}
                    type={'p'}>
                    {`${totalPriceWithTaxAndRate} SEK`}
                </Typography>
            </div>

            <div className={'cart-total__vat'}>
                <Typography
                    className={'cart-total__vat_title'}
                    variant={'body_1_large'}
                    type={'p'}>
                    Summa (exkl. moms)
                </Typography>
                <Typography
                    className={'cart-total__vat_price'}
                    variant={'body_1_large'}
                    type={'p'}>
                    {`${totalPrice} `}
                    <span>SEK</span>
                </Typography>
            </div>

            <div className={'cart-total__vat'}>
                <Typography
                    className={'cart-total__vat_title'}
                    variant={'body_1_large'}
                    type={'p'}>
                    Moms
                </Typography>
                <Typography
                    className={'cart-total__vat_price'}
                    variant={'body_1_large'}
                    type={'p'}>
                    {`${productVat} `}
                    <span>SEK</span>
                </Typography>
            </div>

            <div className={'cart-total__vat'}>
                <Typography
                    className={'cart-total__vat_title'}
                    variant={'body_1_large'}
                    type={'p'}>
                    Fraktkostnad*
                </Typography>
                <Typography
                    className={'cart-total__vat_price'}
                    variant={'body_1_large'}
                    type={'p'}>
                    {`${shippingMethodCost} `}
                    <span>SEK</span>
                </Typography>
            </div>
            <Typography
                className={'cart-total__vat_desc'}
                variant={'body_1_large'}
                type={'p'}>
                *Fastlandet Götaland & Svealand. För Norrland samt Gotland och övriga öar tillkommer extra avgift.
                Kontakta oss för mer information.
            </Typography>
        </Wrapper>
    );
};

export default CartTotal;