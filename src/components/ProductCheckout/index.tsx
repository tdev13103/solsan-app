'use client'

import React, {FC} from 'react';
import Container from "@/components/Container";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import {useAppSelector} from "@/redux/hooks";
import Typography from "@/components/UI/Typography";
import CartTotal from "@/components/CartTotal";
import CheckoutForm from "@/components/CheckoutForm";
import GridSystem from "@/components/UI/Grid/GridSystem";


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

type InstallationProduct = {
    name?: string | undefined;
    price?: string | undefined;
    image?: {
        sourceUrl: string;
        title: string;
    };
    equipment?: string;
    installation?: boolean;
};

const Wrapper = styled.div`
  padding-bottom: ${theme.spaces.large19};

  .product-checkout {

    &__title {
      margin: 0 0 ${theme.spaces.normal};
    }

    &__box {
      max-width: 535px;

      &_wrap {
        gap: 64px;
      }
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
      margin: 0 0 ${theme.spaces.small};
    }

    &__captions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 ${theme.spaces.normal};

      &_products {
        font-weight: 700;
      }

      &_sum {
        font-weight: 700;
      }
    }

    &__p_equipment {
      font-size: 16px;
      margin: 0 0 ${theme.spaces.mini};
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

const ProductCheckout: FC<ProductCheckoutProps> = ({data: {pageAdditionalSettings}}) => {
    const cartData: CartItem[] = useAppSelector(state => state?.cartReducer?.items);
    const installationProduct: InstallationProduct | null = useAppSelector(state => state.installationProductReducer.item);
console.log('installationProduct?.installation', installationProduct?.installation);
    return (
        <Wrapper className={`${pageAdditionalSettings?.isItGeneralPage ? 'page-without-banner' : ''}`}>
            <Container>
                <GridSystem variant={'grid-2'} className={'product-checkout__box_wrap'}>
                    <div className={'product-checkout__box'}>
                        <Typography
                            className={'product-checkout__title'}
                            variant={'h4'}
                            type={'h4'}>
                            Utcheckning
                        </Typography>
                        <div className={'product-checkout__captions'}>
                            <Typography
                                className={'product-checkout__captions_products'}
                                variant={'body_1_large'}
                                type={'p'}>
                                Produkter
                            </Typography>
                            <Typography
                                className={'product-checkout__captions_sum'}
                                variant={'body_1_large'}
                                type={'p'}>
                                Summa
                            </Typography>
                        </div>
                        {
                            cartData?.map((item, idx) => {
                                return (
                                    <div className={'product-checkout__card'} key={idx}>
                                        <Typography
                                            className={'product-checkout__name'}
                                            variant={'body_1_large'}
                                            type={'p'}>
                                            {item?.name}
                                        </Typography>
                                        <div className={'product-checkout__price-wrap'}>
                                            {
                                                item?.price &&
                                                <Typography
                                                    className={'product-checkout__price'}
                                                    variant={'body_1_large'}
                                                    type={'p'}>
                                                    {item?.price}
                                                </Typography>
                                            }
                                            <Typography
                                                className={'product-checkout__currency'}
                                                variant={'body_1_large'}
                                                type={'p'}>
                                                SEK
                                            </Typography>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            installationProduct?.installation &&
                            <div className={'product-checkout__card'}>
                                <Typography
                                    className={'product-checkout__name'}
                                    variant={'body_1_large'}
                                    type={'p'}>
                                    Intresserad av installation
                                </Typography>
                                <div className={'product-checkout__price-wrap'}>
                                    <Typography
                                        className={'product-checkout__price'}
                                        variant={'body_1_large'}
                                        type={'p'}>
                                        {installationProduct?.price}
                                    </Typography>
                                    <Typography
                                        className={'product-checkout__currency'}
                                        variant={'body_1_large'}
                                        type={'p'}>
                                        SEK
                                    </Typography>
                                </div>
                            </div>
                        }
                        <CartTotal cartData={cartData} installationProduct={installationProduct}/>
                    </div>
                    <CheckoutForm/>
                </GridSystem>
            </Container>
        </Wrapper>
    );
};

export default ProductCheckout;