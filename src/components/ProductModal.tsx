import React, {FC, useEffect, useRef, useState} from 'react';
import {Modal} from "@mantine/core";
import Typography from "@/components/UI/Typography";
import Button from "@/components/Button";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import {useThemeContext} from "@/context/theme.context";
import TextWithMoreButton from "@/components/TextWithMoreButton";
import {useAppDispatch} from "@/redux/hooks";
import {setInstallationProduct} from "@/redux/features/installationActions";
import {getFromLocalStorage} from "@/utils/localStorageUtils";

interface ProductsSettings {
    content: string;
    image: {
        sourceUrl: string;
        title: string;
    }
    slug: string;
    name: string;
    uri: string;
    productId: number;
    price: string;
    taxStatus: string;
    woocommerceProductSettings: {
        displayVatTitle: boolean;
        productCardLabel: string;
        productCardColor: string;
        productEquipment: string | TrustedHTML;
    }
    index?: number | undefined;
}

interface ProductModalProps {
    close: () => void,
    opened: boolean,
    addToCart: (event: Event, productId: number) => void,
    selectedProducts: ProductsSettings[],
    productId: number;
    installationProduct: ProductsSettings | undefined
}

type CartItem = {
    name: string | undefined;
    price: string | undefined;
    image: {
        sourceUrl: string;
        title: string;
    };
    equipment: string;
    installation: boolean
    taxStatus: string;
};

const Wrapper = styled.div`

  .product-modal {
    &__reference {
      border-radius: 12px;
      background: #E8EAFF;
      display: flex;
      padding: 16px;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      align-self: stretch;
      margin: 0 0 ${theme.spaces.medium2};

      &_title {
        font-size: 16px;
      }
    }

    &__installation {
      &_field-label {

      }
    }

    &__buttons {
      display: flex;
      gap: 24px;
    }

    &__content {
      margin: 0 0 ${theme.spaces.small};

      &_title {
        font-size: 22px;
        margin: 0 0 ${theme.spaces.small};
      }

      &_wrap {
        margin: 0 0 ${theme.spaces.medium2};
      }
    }

    &__product {
      margin: 0 0 ${theme.spaces.medium2};

      &_title {
        margin: 0 0 ${theme.spaces.small};
      }
    }

    &__show-more {
      padding: 0;
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      color: #8C96FF;
      font-size: 18px;
      font-weight: 400;
      line-height: normal;

      &_wrap {
        display: flex;
        align-items: center;
        gap: 8px;

        &.open svg {
          transform: rotate(180deg);
        }
      }
    }

    &__installation {
      display: none;

      &:checked + .product-modal__installation_field-label:after {
        background: url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMjIxNTUxIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiICB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCA3OC4zNjkgNzguMzY5IiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNNzguMDQ5LDE5LjAxNUwyOS40NTgsNjcuNjA2Yy0wLjQyOCwwLjQyOC0xLjEyMSwwLjQyOC0xLjU0OCwwTDAuMzIsNDAuMDE1Yy0wLjQyNy0wLjQyNi0wLjQyNy0xLjExOSwwLTEuNTQ3bDYuNzA0LTYuNzA0YzAuNDI4LTAuNDI3LDEuMTIxLTAuNDI3LDEuNTQ4LDBsMjAuMTEzLDIwLjExMmw0MS4xMTMtNDEuMTEzYzAuNDI5LTAuNDI3LDEuMTItMC40MjcsMS41NDgsMGw2LjcwMyw2LjcwNEM3OC40NzcsMTcuODk0LDc4LjQ3NywxOC41ODYsNzguMDQ5LDE5LjAxNXoiLz48L2c+PC9zdmc+) center center no-repeat;
        background-size: calc(100% - 5px) auto;
      }
    }

    &__installation_field-label {
      padding-left: ${theme.spaces.gridGap2};
      display: flex;
      align-items: center;
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
  }
`

const ProductModal: FC<ProductModalProps> = ({
                                                 close,
                                                 opened,
                                                 addToCart,
                                                 selectedProducts,
                                                 productId,
                                                 installationProduct
                                             }) => {
    const {themeSettings: {productModal}} = useThemeContext()
    const selectedProductsWithIndex = selectedProducts.map((product, index) => {
        if (product?.productId === productId) {
            return {
                ...product,
                index: index
            };
        }
        return product;
    });

    const dispatch = useAppDispatch()

    const currentProduct = selectedProductsWithIndex.find(product => product?.productId === productId);

    const [installationValue, setInstallationValue] = useState<boolean>(false);

    const ref = useRef<(HTMLInputElement | null)>(null);

    useEffect(() => {
        const installationProductStorage: CartItem | null = getFromLocalStorage("SolsamInstallationProduct") || null;

        if (installationProductStorage) {
            dispatch(setInstallationProduct(installationProductStorage));
        } else {
            if (installationProduct) {
                const cartItem: CartItem = {
                    name: installationProduct?.name,
                    price: installationProduct?.price?.replace(/[^\d,.]/g, '')?.split('.')[0]?.replace(/,/g, ' ') ?? '0',
                    image: installationProduct.image,
                    equipment: installationProduct.content,
                    installation: false,
                    taxStatus: installationProduct.taxStatus
                };

                dispatch(setInstallationProduct(cartItem));
            }
        }
    }, [dispatch, installationProduct])

    const handleClick = () => {
        const inputElement = ref.current;
        setInstallationValue(!inputElement?.checked);
        if (installationValue) {
            dispatch(setInstallationProduct({installation: true}));
        } else {
            dispatch(setInstallationProduct({installation: false}))
        }
    }

    return (
        <Modal opened={opened} onClose={close} centered
               styles={() => ({
                   content: {
                       minWidth: '648px',
                   },
                   body: {
                       padding: `${theme.spaces.small2}!important`
                   },
                   header: {
                       display: 'none'
                   }
               })}>
            <Wrapper>
                <div className={'product-modal__reference'}>
                    <Typography
                        className={'product-modal__reference_title'}
                        variant={'body_1_large'}
                        type={'p'}>
                        {productModal?.referenceText}
                    </Typography>
                    {
                        productModal?.referenceCheckboxLabel &&
                        <div onClick={handleClick}>
                            <input id={'installation'}
                                   className={`product-modal__installation`}
                                   name='installation'
                                   ref={ref}
                                   type='checkbox'
                            />
                            <label htmlFor={`installation`}
                                   className={`product-modal__installation_field-label`}
                                   dangerouslySetInnerHTML={{__html: productModal?.referenceCheckboxLabel}}/>
                        </div>
                    }
                </div>
                {
                    productModal?.contentRepeater?.map((item, idx: number) => {
                        return (
                            <div className={'product-modal__content_wrap'} key={idx}>
                                <Typography
                                    className={'product-modal__content_title'}
                                    variant={'subheader1'}
                                    type={'p'}>
                                    {item?.title}
                                </Typography>
                                <TextWithMoreButton text={item?.content} maxChars={255}/>
                            </div>
                        )
                    })
                }
                <div className={'product-modal__product'}>
                    <Typography
                        className={'product-modal__product_title'}
                        variant={'h3'}
                        type={'h3'}>
                        {currentProduct?.name}
                    </Typography>
                    {
                        currentProduct &&
                        <Typography
                            className={'product-modal__product_equipment'}
                            variant={'body_1_large'}
                            dangerouslySetInnerHTML={{__html: currentProduct.woocommerceProductSettings.productEquipment}}/>
                    }
                </div>
                <div className={'product-modal__buttons'}>
                    <Button type={'button_2'}
                            title={productModal.addToCartButtonText}
                            isHyperlink={false}
                            onClick={(event: Event) => addToCart(event, productId)}
                            className={'product-modal__add-to-cart'}/>
                    <Button type={'button_5'}
                            title={productModal.closeButtonText}
                            isHyperlink={false}
                            onClick={close}
                            className={'product-modal__close'}/>
                </div>
            </Wrapper>
        </Modal>
    )
        ;
};

export default ProductModal;