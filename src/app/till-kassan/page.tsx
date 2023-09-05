import React from 'react';
import ProductCheckout from "@/components/ProductCheckout";
import { pageSettings } from "@/lib/pageSettings";
import Error404 from "@/components/Error404";
import CheckoutForm from "@/components/CheckoutForm";


const TillKassanPage = async () => {
	const data = await pageSettings( 'till-kassan' );
	
	if ( data !== null ) {
		return (
			<div>
				<ProductCheckout data={ data }/>
				<CheckoutForm/>
			</div>
		
		);
	}
	return <Error404/>
};

export default TillKassanPage;