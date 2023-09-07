'use client'

import React, {useEffect} from 'react';

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
const CheckoutForm = () => {

    useEffect(() => {
        const sessionDataJson: string | null = localStorage.getItem('sessionData')
        const sessionData: SessionData = sessionDataJson && JSON.parse(sessionDataJson)
        const paymentMethodIdentifiers = sessionData?.payment_method_categories?.map((method) => method.identifier);
        console.log('sessionData', sessionData);
        if (typeof window !== 'undefined') {
            (window as any).Klarna.Payments.init({
                client_token: sessionData?.client_token,
            });

            (window as any).Klarna.Payments.load({
                container: '#klarna-payments-container',
                payment_method_categories: paymentMethodIdentifiers,
                instance_id: sessionData?.session_id
            }, (res) => {
                console.log('res', res);
            });


        }
    }, [])

    const authorize = () => {
        (window as any).Klarna.Payments.authorize({
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
                "authorization": "https://api.klarna.com/payments/v1/authorization"
            }
        }, (res) => {
            console.log('authorization', res);
        })
    }
    // const onSubmit = () => {
    //     const dataOrder = {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             payment_method: 'test',
    //             payment_method_title: 'test',
    //             set_paid: false,
    //             meta_data: [
    //                 {
    //                     key: 'tours_details_data',
    //                     value: 'test',
    //                 },
    //             ],
    //             billing: {
    //                 first_name: 'name',
    //                 last_name: '',
    //                 email: 'test@gmail.com',
    //                 phone: '+38099644648',
    //             },
    //             line_items: [
    //                 {
    //                     product_id: 1,
    //                     quantity: 1,
    //                 },
    //             ],
    //             shipping_lines: [
    //                 {
    //                     method_id: 'flat_rate',
    //                     method_title: 'Flat Rate',
    //                     total: '0.00',
    //                 },
    //             ],
    //             customer_id: 12,
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }
    //
    //     fetch('/api/create-order', dataOrder)
    //     .then(result => result.json())
    //     .then(async (result_data) => {
    //         const {success} = result_data
    //         console.log('success', success);
    //     })
    // }

    return (
        <div>
            <div id="klarna-payments-container"></div>
            <button onClick={() => authorize()}>click</button>
            {/*<button onClick={() => onSubmit()}>click</button>*/}
        </div>
    );
};

export default CheckoutForm;