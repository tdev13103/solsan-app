'use client'
import React, {FC, useRef, useState} from 'react';
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import Typography from "@/components/UI/Typography";
import {useThemeContext} from "@/context/theme.context";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import Container from "@/components/Container";
import Image from "next/image";
import Minus from "@/components/Icons/Minus";
import Plus from "@/components/Icons/Plus";
import {deleteCartItem, updateCartItem} from "@/redux/features/cartActions";
import Link from "next/link";
import RemoveProduct from "@/components/Icons/RemoveProduct";
import Button from "@/components/Button";
import CartTotal from "@/components/CartTotal";
import axios from "axios";
import {useRouter} from "next/navigation";
import {setInstallationProduct} from "@/redux/features/installationActions";
import {useProductsContext} from "@/context/products.context";

interface ProductCartProps {
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
    price: string;
    quantity: number;
    image: {
        sourceUrl: string;
        title: string;
    };
    equipment: string;
    taxStatus: string;
};

type NewCartItem = {
    quantity: number;
    total_amount: string | undefined | number;
    image_url?: string;
    tax_rate?: number;
    total_tax_amount?: number;
    name: string | undefined;
    unit_price: "" | undefined | number
};

type InstallationProduct = {
    name?: string | undefined;
    id?: number;
    price?: string;
    image?: {
        sourceUrl: string;
        title: string;
    };
    equipment?: string;
    quantity?: number;
    installation?: boolean;
    taxStatus?: string;
}

const Wrapper = styled.div`
  padding-bottom: ${theme.spaces.large19};

  .product-cart {

    &__title {
      margin: 0 0 ${theme.spaces.normal};

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        margin: 0 0 ${theme.spaces.medium2};
      }
    }

    &__box_wrap {
      max-width: 714px;
    }

    &__reference {
      border-radius: 12px;
      background: #E8EAFF;
      display: flex;
      padding: 16px;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      align-self: stretch;
      margin: 0 0 ${theme.spaces.medium3};

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        margin: 0 0 ${theme.spaces.medium1};
      }

      &_title {
        font-size: 16px;
      }
    }

    &__installation {
      display: none;

      &:checked + .product-cart__installation_field-label:after {
        background: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMjIxNTUxIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiICB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCA3OC4zNjkgNzguMzY5IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNNzguMDQ5LDE5LjAxNUwyOS40NTgsNjcuNjA2Yy0wLjQyOCwwLjQyOC0xLjEyMSwwLjQyOC0xLjU0OCwwTDAuMzIsNDAuMDE1Yy0wLjQyNy0wLjQyNi0wLjQyNy0xLjExOSwwLTEuNTQ3bDYuNzA0LTYuNzA0YzAuNDI4LTAuNDI3LDEuMTIxLTAuNDI3LDEuNTQ4LDBsMjAuMTEzLDIwLjExMmw0MS4xMTMtNDEuMTEzYzAuNDI5LTAuNDI3LDEuMTItMC40MjcsMS41NDgsMGw2LjcwMyw2LjcwNEM3OC40NzcsMTcuODk0LDc4LjQ3NywxOC41ODYsNzguMDQ5LDE5LjAxNXoiLz48L2c+PC9zdmc+) center center no-repeat;
        background-size: calc(100% - 5px) auto;
      }
    }

    &__installation_field-label {
      padding-left: ${theme.spaces.gridGap2};
      position: relative;
      z-index: 1;
      color: #221551;
      cursor: pointer;
      font-size: 16px;

      b, strong {
        font-weight: 700;
      }

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
      align-items: flex-start;
      gap: 16px;
      margin: 0 0 ${theme.spaces.medium1};
    }

    &__image {

      &_wrap {
        display: flex;
        height: 93px;
        width: 93px;
        padding: 6px 5px 7px 15px;
        justify-content: flex-end;
        align-items: center;
        border-radius: 12px;
        border: 1px solid #221551;

        &.color {
          background: #E8EAFF;
        }

        @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
          width: 59px;
          height: 59px;
          padding: 3px 6px 4px 6px;

          img {
            width: 47px;
            height: 52px;
          }
        }
      }
    }

    &__p_content_wrap {
      display: flex;
      width: 100%;
      justify-content: space-between;
      position: relative;

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        flex-direction: column;
        padding-right: 38px;
      }
    }

    &__p_equipment {
      font-size: 16px;
      margin: 0 0 ${theme.spaces.mini};
      max-width: 470px;

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        margin: 0 0 ${theme.spaces.small};
      }
    }

    &__name {
      font-size: 16px;
      font-weight: 700;
      margin: 0 0 ${theme.spaces.mini};
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

        @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
          margin: 0 0 ${theme.spaces.small};
        }
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

    &__remove {
      background: none;
      padding: 0;
      margin-left: ${theme.spaces.small};
      border: none;
      outline: none;
      cursor: pointer;

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        position: absolute;
        top: 0;
        right: 0;

        svg {
          width: 24px;
          height: 24px;
        }
      }
    }

    &__checkout-btn {
      margin-top: ${theme.spaces.medium3};

      @media screen and (max-width: ${theme.responsiveMediaSizes.m480}) {
        width: 100%;
      }
    }
  }
`

const ProductCart: FC<ProductCartProps> = ({data: {pageAdditionalSettings}}) => {
    const {themeSettings: {productModal}} = useThemeContext()
    const {productsSettings: {taxRates}} = useProductsContext()
    const cartData: CartItem[] = useAppSelector(state => state?.cartReducer?.items);
    const installationProduct: InstallationProduct | null | undefined = useAppSelector(state => state.installationProductReducer.item);
    const taxRate = taxRates.find(rate => rate?.name === 'Tax')?.rate as string;

    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [shippingValue, setShippingValue] = useState<number>(0)
    const [VATValue, setVATValue] = useState<number>(0)

    const dispatch = useAppDispatch();
    const router = useRouter();
    const ref = useRef<(HTMLInputElement | null)>(null);

    const handleClick = () => {
        const inputElement = ref.current;
        if (inputElement) {
            dispatch(setInstallationProduct({
                installation: inputElement?.checked
            }))
        }
    }

    const updateCartItems = (productId: number, operation: 'add' | 'remove') => {
        const productIndex = cartData.findIndex((product) => product.id === productId);

        if (productIndex !== -1) {
            const updatedCartData: CartItem[] = cartData.map((product) => {
                if (product.id === productId) {
                    return {
                        ...product,
                        quantity: operation === 'add' ? product.quantity + 1 : product.quantity - 1,
                    };
                }
                return product;
            });

            const updatedCartItem = updatedCartData[productIndex];

            if (updatedCartItem) {
                if (updatedCartItem.quantity <= 0) {
                    dispatch(deleteCartItem(productId));
                } else {
                    dispatch(updateCartItem(updatedCartItem));
                }
            }
        }
    };

    const plusItemToCart = (productId: number) => {
        updateCartItems(productId, 'add');
    };

    const minusItemFromCart = (productId: number) => {
        updateCartItems(productId, 'remove');
    };
    const removeItemFromCart = (productId: number) => {
        dispatch(deleteCartItem(productId));

        if (cartData.length <= 1) {
            dispatch(setInstallationProduct({
                installation: false
            }))
        }
    };

    const removeInstallationProduct = () => {
        dispatch(setInstallationProduct({
            installation: false
        }))
        const inputElement = ref.current;
        if (inputElement) {
            inputElement.checked = false
        }

    };

    const handleCheckout = async () => {
        const updateCartData = [...cartData];

        if (installationProduct?.installation) {
            updateCartData.push(installationProduct as CartItem);
        }

        const newCartData: NewCartItem[] = updateCartData.map(item => {
            const totalAmount = item.price && parseInt(item.price.replace(/\s/g, ''), 10) * (item.quantity ?? 1) * 100;
            const taxRateNumber = parseFloat(taxRate) * 100;
            const totalTaxAmount = totalAmount && totalAmount - (totalAmount * 10000 / (10000 + taxRateNumber))

            return ({
                image_url: item.image.sourceUrl,
                name: item.name,
                quantity: item.quantity ?? 1,
                tax_rate: taxRateNumber ?? 0,
                total_amount: totalAmount,
                total_tax_amount: Math.floor(totalTaxAmount as number) ?? 0,
                unit_price: item.price && parseInt(item.price.replace(/\s/g, ''), 10) * 100,
            })
        })
        newCartData.push({
                "name": 'Frakt',
                "quantity": 1,
                "tax_rate": 0,
                "total_amount": shippingValue,
                "total_tax_amount": 0,
                "unit_price": shippingValue
            },
            {
                "name": 'Moms',
                "quantity": 1,
                "tax_rate": 0,
                "total_amount": VATValue,
                "total_tax_amount": 0,
                "unit_price": VATValue
            }
        )

        const orderTaxAmount = newCartData.reduce((accumulator, cart) => {
            if (cart.total_tax_amount) {
                return accumulator + cart.total_tax_amount
            }

            return accumulator
        }, 0);

        const paymentData = JSON.stringify({
                "locale": "en-SE",
                "purchase_country": "SE",
                "purchase_currency": "SEK",
                "order_amount": totalPrice * 100,
                "order_tax_amount": orderTaxAmount,
                "order_lines": newCartData,
                "intent": "buy",
                "merchant_urls": {
                    "authorization": "https://api.playground.klarna.com/payments/v1/authorization"
                }
            }
        )

        console.log('paymentData', paymentData);
        localStorage.setItem('SolsamPaymentData', paymentData)

        try {
            const response = await axios.post('/api/sessions', paymentData);

            const {data} = response.data;
            localStorage.setItem('sessionData', JSON.stringify(data))

            router.push('/till-kassan')
        } catch (error) {
            console.log('error', error);
        }
    }

    if (!cartData?.length) {
        return (
            <Wrapper className={`${pageAdditionalSettings?.isItGeneralPage ? 'page-without-banner' : ''}`}>
                <Container>
                    <div className={'product-cart__box_wrap'}>
                        <Typography
                            className={'product-cart__title'}
                            variant={'h4'}
                            type={'h4'}>
                            Not Products in cart, add product <Link href={'/solpaket'}>here</Link>
                        </Typography>
                    </div>
                </Container>
            </Wrapper>
        )
    }

    return (
        <Wrapper className={`${pageAdditionalSettings?.isItGeneralPage ? 'page-without-banner' : ''}`}>
            <Container>
                <div className={'product-cart__box_wrap'}>
                    <Typography
                        className={'product-cart__title'}
                        variant={'h4'}
                        type={'h4'}>
                        Din varukorg
                    </Typography>
                    {
                        cartData?.map((item, idx) => {
                            return (
                                <div className={'product-cart__card'} key={idx}>
                                    <figure className={'product-cart__image_wrap'}>
                                        <Image className={'product-cart__image'} src={item?.image?.sourceUrl}
                                               alt={item?.image?.title}
                                               width={80} height={80}/>
                                    </figure>
                                    <div className={'product-cart__p_content_wrap'}>
                                        <div className={'product-cart__p_content'}>
                                            <Typography
                                                className={'product-cart__name'}
                                                variant={'body_1_large'}
                                                type={'p'}>
                                                {item?.name}
                                            </Typography>
                                            {
                                                item?.equipment &&
                                                <Typography
                                                    className={'product-cart__p_equipment'}
                                                    variant={'body_1_large'}
                                                    dangerouslySetInnerHTML={{__html: item?.equipment}}/>
                                            }
                                            <div className={'product-cart__quantity_wrap'}>
                                                <button className={'product-cart__quantity_btn'}
                                                        onClick={() => minusItemFromCart(item?.id)}>
                                                    <Minus/>
                                                </button>
                                                <Typography
                                                    className={'product-cart__quantity'}
                                                    variant={'body_1_large'}
                                                    type={'p'}>
                                                    {`${item?.quantity} st`}
                                                </Typography>
                                                <button className={'product-cart__quantity_btn'}
                                                        onClick={() => plusItemToCart(item?.id)}>
                                                    <Plus/>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={'product-cart__price-wrap'}>
                                            {
                                                item?.price &&
                                                <Typography
                                                    className={'product-cart__price'}
                                                    variant={'body_1_large'}
                                                    type={'p'}>
                                                    {item?.price}
                                                </Typography>
                                            }
                                            <Typography
                                                className={'product-cart__currency'}
                                                variant={'body_1_large'}
                                                type={'p'}>
                                                SEK
                                            </Typography>
                                            <button className={'product-cart__remove'}
                                                    onClick={() => removeItemFromCart(item?.id)}>
                                                <RemoveProduct/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        installationProduct?.installation &&
                        <div className={'product-cart__card'}>
                            <figure className={'product-cart__image_wrap color'}>
                                <Image className={'product-cart__image'}
                                       src={installationProduct?.image?.sourceUrl || ''}
                                       alt={installationProduct?.image?.title || ''}
                                       width={80} height={80}/>
                            </figure>
                            <div className={'product-cart__p_content_wrap'}>
                                <div className={'product-cart__p_content'}>
                                    <Typography
                                        className={'product-cart__name'}
                                        variant={'body_1_large'}
                                        type={'p'}>
                                        {installationProduct?.name}
                                    </Typography>
                                    {
                                        installationProduct?.equipment &&
                                        <Typography
                                            className={'product-cart__p_equipment'}
                                            variant={'body_1_large'}
                                            dangerouslySetInnerHTML={{__html: installationProduct?.equipment}}/>
                                    }
                                </div>
                                <div className={'product-cart__price-wrap'}>
                                    {
                                        installationProduct?.price &&
                                        <Typography
                                            className={'product-cart__price'}
                                            variant={'body_1_large'}
                                            type={'p'}>
                                            {installationProduct?.price}
                                        </Typography>
                                    }
                                    <Typography
                                        className={'product-cart__currency'}
                                        variant={'body_1_large'}
                                        type={'p'}>
                                        SEK
                                    </Typography>
                                    <button className={'product-cart__remove'}
                                            onClick={removeInstallationProduct}>
                                        <RemoveProduct/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        !   installationProduct?.installation &&
                        <div className={'product-cart__reference'}>
                            <Typography
                                className={'product-cart__reference_title'}
                                variant={'body_1_large'}
                                type={'p'}>
                                {productModal?.referenceText}
                            </Typography>
                            {
                                productModal?.referenceCheckboxLabel &&
                                <div onClick={handleClick}>
                                    <input id={'installation'}
                                           className={`product-cart__installation`}
                                           name='installation'
                                           ref={ref}
                                           type='checkbox'
                                           defaultChecked={installationProduct?.installation}
                                    />
                                    <label htmlFor={`installation`}
                                           className={`product-cart__installation_field-label`}
                                           dangerouslySetInnerHTML={{__html: productModal?.referenceCheckboxLabel}}/>
                                </div>
                            }
                        </div>
                    }

                    <CartTotal cartData={cartData} setTotalPrice={setTotalPrice}
                               installationProduct={installationProduct}
                               setShippingValue={setShippingValue} setVATValue={setVATValue}/>

                    <Button type={'button_2'}
                            title={'Till checkout'}
                            isHyperlink={false}
                            onClick={handleCheckout}
                            className={'product-cart__checkout-btn'}/>
                </div>
            </Container>
        </Wrapper>
    );
};

export default ProductCart;