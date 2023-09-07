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
        console.log('sessionData', sessionData);
        if (typeof window !== 'undefined') {
            (window as any).Klarna.Payments.init({
                client_token: sessionData?.client_token,
            });

            (window as any).Klarna.Payments.load({
                container: '#klarna-payments-container',
                payment_method_categories: sessionData?.payment_method_categories,
            });
        }
    }, [])
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
            {/*<button onClick={() => onSubmit()}>click</button>*/}
        </div>
    );
};

export default CheckoutForm;