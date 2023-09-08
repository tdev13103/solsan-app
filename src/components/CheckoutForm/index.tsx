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

const productObject = {
    "locale": "en-SE",
    "purchase_country": "SE",
    "purchase_currency": "SEK",
    "order_amount": 2000,
    "order_lines": [
        {
            "image_url": "https://www.exampleobjects.com/logo.png",
            "merchant_data": "{\"customer_account_info\":[{\"unique_account_identifier\":\"test@gmail.com\",\"account_registration_date\":\"2017-02-13T10:49:20Z\",\"account_last_modified\":\"2019-03-13T11:45:27Z\"}]}",
            "name": "Running shoe",
            "product_identifiers": {
                "brand": "shoe-brand",
                "category_path": "Shoes > Running",
                "global_trade_item_number": "4912345678904",
                "manufacturer_part_number": "AD6654412-334.22",
                "color": "white",
                "size": "small"
            },
            "product_url": "https://.../AD6654412.html",
            "quantity": 1,
            "quantity_unit": "pcs",
            "reference": "AD6654412",
            "tax_rate": 2000,
            "total_amount": 2000,
            "total_discount_amount": 500,
            "total_tax_amount": 333,
            "type": "physical",
            "unit_price": 2500,
            "subscription": {
                "name": "string",
                "interval": "DAY",
                "interval_count": 1
            }
        }
    ],
    "intent": "buy",
    "merchant_urls": {
        "authorization": "https://api.playground.klarna.com/payments/v1/authorization"
    }
}
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

    useEffect(() => {
        const sessionDataJson: string | null = localStorage.getItem('sessionData')
        const sessionData: SessionData = sessionDataJson && JSON.parse(sessionDataJson)

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
                    console.log('orderData', orderData);
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
    const onSubmit = async () => {
        const dataOrder = JSON.stringify({
            payment_method: orderData?.initial_payment_method?.type,
            payment_method_title: orderData?.initial_payment_method?.description,
            set_paid: false,
            meta_data: orderData?.order_lines,
            billing: orderData?.billing_address,
            line_items: orderData?.order_lines,
            customer_id: 12,
        })

        try {
            const response = await axios.post('/api/create-order', dataOrder);

            const {orderData} = response.data;
            console.log('orderData111', orderData);
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <div>
            <div id="klarna-payments-container"></div>
            <button onClick={() => authorize()}>create order into klarna</button>
            {/*<button onClick={() => onSubmit()}>create order into woo</button>*/}
        </div>
    );
};

export default CheckoutForm;