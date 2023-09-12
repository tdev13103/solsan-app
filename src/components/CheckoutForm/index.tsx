'use client'

import React, {useEffect, useState} from 'react';
import axios from "axios";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import Button from "@/components/Button";
import {useRouter} from "next/navigation";

type SessionData = {
    client_token: string;
    payment_method_categories: {
        asset_urls: {
            descriptive: string;
            standard: string;
        }
        identifier: string;
        name: string;
    }[]
    session_id: string;
}

type ProductObject = {
    quantity: number;
    total_amount: "" | undefined | number;
    image_url?: string;
    name: string | undefined;
    unit_price: "" | undefined | number
};

const Wrapper = styled.div`
  padding-bottom: ${theme.spaces.large19};

  .product-cart {
    &__authorize {
      margin-top: ${theme.spaces.small};
    }
  }
`

const initializeKlarnaPayments = (sessionData: SessionData) => {
    const paymentMethodIdentifiers = sessionData?.payment_method_categories?.map((method) => method.identifier);
    if (typeof window !== 'undefined') {
        const klarnaPayments = (window as any).Klarna.Payments;
        klarnaPayments.init({
            client_token: sessionData?.client_token,
        });

        klarnaPayments.load({
            container: '#klarna-payments-container',
            payment_method_categories: paymentMethodIdentifiers,
            instance_id: sessionData?.session_id
        });
    }
};
const CheckoutForm = () => {

    // const [orderDataTest, setOrderData] = useState()
    const [productObject, setProductObject] = useState<ProductObject[]>()

    const router = useRouter()

    useEffect(() => {
        const sessionDataJson: string | null = localStorage.getItem('sessionData')
        const productObjectJson: string | null = localStorage.getItem('SolsamPaymentData')
        // const orderDataJson: string | null = localStorage.getItem('setOrderData')
        const sessionData: SessionData = sessionDataJson && JSON.parse(sessionDataJson)

        if (sessionData === null) {
            router.push('/solpaket')
            return;
        }

        if (productObjectJson) {
            setProductObject(JSON.parse(productObjectJson))
        }

        // if (orderDataJson) {
        //     setOrderData(JSON.parse(orderDataJson))
        // }

        initializeKlarnaPayments(sessionData)
    }, [])

    const authorize = () => {
        (window as any).Klarna.Payments.authorize(productObject, async (res: any) => {
            const paymentData = JSON.stringify({
                body: productObject,
                authorization_token: res?.authorization_token
            })
            try {
                const response = await axios.post('/api/create-order-klarna', paymentData);

                const {data} = response.data;

                try {
                    const response = await axios.post('/api/get-order', JSON.stringify(data?.order_id));

                    const {orderData} = response.data;
                    if (orderData) {
                        router.push('/tacksida')
                    }

                    // setOrderData(orderData)
                    localStorage.setItem('setOrderData', JSON.stringify(orderData))
                } catch (error) {
                    console.log('error', error);
                }

            } catch (error) {
                console.log('error', error);
            }
        })
    }
    // const onSubmit = async () => {
    //     const {
    //         billing_address,
    //         email,
    //         phone,
    //         order_lines,
    //         order_amount,
    //         klarna_reference
    //     } = orderDataTest;
    //     const dataOrder = JSON.stringify({
    //         payment_method: 'klarna',
    //         payment_method_title: 'Klarna',
    //         customer_id: 0,
    //         billing: {
    //             first_name: billing_address.given_name,
    //             email: email,
    //             phone: phone,
    //         },
    //         line_items: order_lines.map(item => ({
    //             product_id: 0,
    //             quantity: item.quantity,
    //             name: item?.name,
    //             price: item.unit_price,
    //             image_url: item.image_url
    //         })),
    //         meta_data: [],
    //         order_total: order_amount / 100,
    //         order_status: 'processing',
    //         klarna_reference: klarna_reference,
    //     })
    //
    //     try {
    //         const response = await axios.post('/api/create-order', dataOrder);
    //
    //         const {orderData} = response.data;
    //         console.log('orderData111', orderData);
    //     } catch (error) {
    //         console.log('error', error);
    //     }
    // }

    return (
        <Wrapper>
            <div id="klarna-payments-container"></div>
            <Button type={'button_2'}
                    title={'Betala köp'}
                    isHyperlink={false}
                    onClick={authorize}
                    className={'product-cart__authorize'}/>
            {/*<button onClick={() => onSubmit()}>create order into woo</button>*/}
        </Wrapper>
    );
};

export default CheckoutForm;