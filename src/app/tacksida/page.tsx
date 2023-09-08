'use client'

import React from 'react';
import Typography from "@/components/UI/Typography";
import theme from "@/styles/theme";
import styled from "@emotion/styled";

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