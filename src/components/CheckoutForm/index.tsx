'use client'

import React from 'react';

const CheckoutForm = () => {
	/*const username = process.env.KLARNA_API_USERNAME;
	 const password = process.env.KLARNA_API_PASSWORD;
	 const apiUrl = 'https://api.klarna.com/payments/v1/authorizations/';
	 
	 const paymentData = {};
	 
	 const base64Credentials = btoa( `${ username }:${ password }` );
	 
	 fetch( apiUrl, {
	 method  : 'POST',
	 headers : {
	 'Authorization' : `Basic ${ base64Credentials }`,
	 'Content-Type'  : 'application/json',
	 },
	 body    : JSON.stringify( paymentData ),
	 } )
	 .then( response => response.json() )
	 .then( authorizationData => {
	 const iframeUrl = authorizationData.iframe_url;
	 console.log( 'iframeUrl', iframeUrl );
	 } )
	 .catch( error => {
	 console.log( 'error', error );
	 } );*/
	
	const onSubmit = () => {
		const dataOrder = {
			method  : 'POST',
			body    : JSON.stringify( {
				payment_method       : 'test',
				payment_method_title : 'test',
				set_paid             : false,
				meta_data            : [
					{
						key   : 'tours_details_data',
						value : 'test',
					},
				],
				billing              : {
					first_name : 'name',
					last_name  : '',
					email      : 'test@gmail.com',
					phone      : '+38099644648',
				},
				line_items           : [
					{
						product_id : 1,
						quantity   : 1,
					},
				],
				shipping_lines       : [
					{
						method_id    : 'flat_rate',
						method_title : 'Flat Rate',
						total        : '0.00',
					},
				],
				customer_id          : 12,
			} ),
			headers : {
				'Content-Type' : 'application/json',
			},
		}
		
		fetch( '/api/create-order', dataOrder )
			.then( result => result.json() )
			.then( async ( result_data ) => {
				const { success } = result_data
				console.log( 'success', success );
			} )
	}
	
	return (
		<div>
			<button onClick={ () => onSubmit() }>click</button>
		</div>
	);
};

export default CheckoutForm;