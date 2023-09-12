'use client'

import React, {useEffect, useState} from 'react';
import styled from "@emotion/styled";
import theme from "@/styles/theme";

interface SessionData {
    html_snippet: string
}

const Wrapper = styled.div`
  padding-bottom: ${theme.spaces.large19};
`

const CheckoutForm = () => {

    // const [orderDataTest, setOrderData] = useState()
    const [sessionData, setSessionData] = useState<SessionData>()
    console.log('sessionData', sessionData);
    // const router = useRouter()

    useEffect(() => {
        const sessionDataJson: string | null = localStorage.getItem('sessionData')
        // const orderDataJson: string | null = localStorage.getItem('setOrderData')


        if (sessionDataJson) {
            setSessionData(JSON.parse(sessionDataJson))
        }

        // if (orderDataJson) {
        //     setOrderData(JSON.parse(orderDataJson))
        // }

        // initializeKlarnaPayments(sessionData)
    }, [])

    // const authorize = () => {
    //     (window as any).Klarna.Payments.authorize(productObject, async (res: any) => {
    //         const paymentData = JSON.stringify({
    //             body: productObject,
    //             authorization_token: res?.authorization_token
    //         })
    //         try {
    //             const response = await axios.post('/api/create-order-klarna', paymentData);
    //
    //             const {data} = response.data;
    //
    //             try {
    //                 const response = await axios.post('/api/get-order', JSON.stringify(data?.order_id));
    //
    //                 const {orderData} = response.data;
    //                 console.log('orderData', orderData);
    //                 router.push('/tacksida')
    //                 // setOrderData(orderData)
    //                 // localStorage.setItem('setOrderData', JSON.stringify(orderData))
    //             } catch (error) {
    //                 console.log('error', error);
    //             }
    //
    //         } catch (error) {
    //             console.log('error', error);
    //         }
    //     })
    // }
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
            {
                sessionData && <div dangerouslySetInnerHTML={{__html: sessionData.html_snippet}}/>
            }
            {/*<button onClick={() => onSubmit()}>create order into woo</button>*/}
        </Wrapper>
    );
};

export default CheckoutForm;