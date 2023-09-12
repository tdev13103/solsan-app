'use client'

import React, {useEffect, useState} from 'react';
import Typography from "@/components/UI/Typography";
import theme from "@/styles/theme";
import styled from "@emotion/styled";
import {clearInstallationProduct} from "@/redux/features/installationActions";
import {clearCart} from "@/redux/features/cartActions";
import {useAppDispatch} from "@/redux/hooks";
import Container from "@/components/Container";
import {useRouter} from "next/navigation";
import CartTotal from "@/components/CartTotal";
import Button from "@/components/Button";

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

  .thanks {
    &__header {
      padding-top: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: #221551;
    }

    &__reference_title {
      color: #F9F9F2;
      text-align: center;
      margin: 0 0 ${theme.spaces.medium3};
    }

    &__order-number {
      color: #F9F9F2;
      margin: 0 0 ${theme.spaces.medium2};

      span {
        font-weight: 700;
        color: #F9F9F2;
      }
    }

    &__box {
      margin: ${theme.spaces.medium2} auto 0;
      max-width: 648px;
    }

    &__title {
      margin: 0 0 ${theme.spaces.normal};
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

    &__home-btn_wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: ${theme.spaces.medium3} 0 0;
    }
  }
`

const TacksidaPage = () => {
    const [installationProduct, setInstallationData] = useState<InstallationProduct>()
    const [cartData, setCartData] = useState<CartItem[]>([])

    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        const installationProductJson = localStorage.getItem('SolsamInstallationProduct');
        const cartItemsJson = localStorage.getItem('SolsamCartItems');

        if (cartItemsJson) {
            setCartData(JSON.parse(cartItemsJson));
        }

        if (installationProductJson) {
            setInstallationData(JSON.parse(installationProductJson));
        }

        if (cartItemsJson && !JSON.parse(cartItemsJson).length) {
            router.push('/solpaket')
        }
    }, [router]);

    useEffect(() => {
        if (cartData) {
            localStorage.removeItem('SolsamInstallationProduct');
            localStorage.removeItem('SolsamPaymentData');
            localStorage.removeItem('SolsamCartItems');
            localStorage.removeItem('sessionData');
            dispatch(clearInstallationProduct())
            dispatch(clearCart())
        }
    }, [cartData, dispatch]);

    return (
        !!cartData.length &&
        <Wrapper>
            <div className={'thanks__header'}>
                <Typography
                    className={'thanks__reference_title'}
                    variant={'h4'}
                    type={'h4'}>
                    Tack!<br/>Vi har tagit emot din order.
                </Typography>
                {/*<Typography*/}
                {/*    className={'thanks__order-number'}*/}
                {/*    variant={'body_1_large'}*/}
                {/*    type={'p'} dangerouslySetInnerHTML={{__html: `Ordernummer: <span>288288282</span>`}}/>*/}
            </div>
            <Container>
                <div className={'thanks__box'}>
                    <div className={'thanks__captions'}>
                        <Typography
                            className={'thanks__captions_products'}
                            variant={'body_1_large'}
                            type={'p'}>
                            Din order
                        </Typography>
                        <Typography
                            className={'thanks__captions_sum'}
                            variant={'body_1_large'}
                            type={'p'}>
                            Summa
                        </Typography>
                    </div>
                    {
                        cartData?.map((item, idx) => {
                            return (
                                <div className={'thanks__card'} key={idx}>
                                    <Typography
                                        className={'thanks__name'}
                                        variant={'body_1_large'}
                                        type={'p'}>
                                        {item?.name}
                                    </Typography>
                                    <div className={'thanks__price-wrap'}>
                                        {
                                            item?.price &&
                                            <Typography
                                                className={'thanks__price'}
                                                variant={'body_1_large'}
                                                type={'p'}>
                                                {item?.price}
                                            </Typography>
                                        }
                                        <Typography
                                            className={'thanks__currency'}
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
                        <div className={'thanks__card'}>
                            <Typography
                                className={'thanks__name'}
                                variant={'body_1_large'}
                                type={'p'}>
                                Intresserad av installation
                            </Typography>
                            <div className={'thanks__price-wrap'}>
                                <Typography
                                    className={'thanks__price'}
                                    variant={'body_1_large'}
                                    type={'p'}>
                                    {installationProduct?.price}
                                </Typography>
                                <Typography
                                    className={'thanks__currency'}
                                    variant={'body_1_large'}
                                    type={'p'}>
                                    SEK
                                </Typography>
                            </div>
                        </div>
                    }
                    {
                        cartData?.length &&
                        <CartTotal cartData={cartData} installationProduct={installationProduct}/>
                    }
                    <div className={'thanks__home-btn_wrap'}>
                        <Button type={'button_2'}
                                title={'Fortsätt'}
                                isHyperlink={true}
                                hrefLink={'/'}
                                className={'thanks__home-btn'}/>
                    </div>
                </div>
            </Container>
        </Wrapper>
    );
};

export default TacksidaPage;