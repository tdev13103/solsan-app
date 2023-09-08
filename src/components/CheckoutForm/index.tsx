'use client'

import React, {useEffect, useState} from 'react';
import axios from "axios";

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

    const [orderData, setOrderData] = useState()
    const [productObject, setProductObject] = useState<ProductObject[]>()

    useEffect(() => {
        const sessionDataJson: string | null = localStorage.getItem('sessionData')
        const productObjectJson: string | null = localStorage.getItem('SolsamPaymentData')
        const sessionData: SessionData = sessionDataJson && JSON.parse(sessionDataJson)

        if (productObjectJson) {
            setProductObject(JSON.parse(productObjectJson))
        }

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
                    setOrderData(orderData)
                } catch (error) {
                    console.log('error', error);
                }

            } catch (error) {
                console.log('error', error);
            }
        })
    }

    console.log('orderData', orderData);
    // const onSubmit = async () => {
    //     const dataOrder = JSON.stringify({
    //         payment_method: orderData?.initial_payment_method?.type,
    //         payment_method_title: orderData?.initial_payment_method?.description,
    //         set_paid: false,
    //         meta_data: orderData?.order_lines,
    //         billing: orderData?.billing_address,
    //         line_items: orderData?.order_lines,
    //         customer_id: 12,
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
        <div>
            <div id="klarna-payments-container"></div>
            <button onClick={() => authorize()}>create order into klarna</button>
            {/*<button onClick={() => onSubmit()}>create order into woo</button>*/}
        </div>
    );
};

export default CheckoutForm;