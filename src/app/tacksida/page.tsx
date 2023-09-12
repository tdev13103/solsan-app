'use client'

import React, {useEffect} from 'react';
import Typography from "@/components/UI/Typography";
import theme from "@/styles/theme";
import styled from "@emotion/styled";
import {clearInstallationProduct} from "@/redux/features/installationActions";
import {clearCart} from "@/redux/features/cartActions";
import {useAppDispatch} from "@/redux/hooks";

const Wrapper = styled.div`
  padding-top: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  .product-cart {
    &__reference_title {
      margin: ${theme.spaces.large2} 0;
    }
  }
`

const TacksidaPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        localStorage.removeItem('SolsamInstallationProduct')
        localStorage.removeItem('SolsamPaymentData')
        localStorage.removeItem('SolsamCartItems')
        localStorage.removeItem('sessionData')
        dispatch(clearInstallationProduct())
        dispatch(clearCart())
    }, [dispatch])

    return (
        <Wrapper>
            <Typography
                className={'product-cart__reference_title'}
                variant={'h1'}
                type={'h1'}>
                Tack för din beställning
            </Typography>
        </Wrapper>
    );
};

export default TacksidaPage;