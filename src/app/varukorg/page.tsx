import React from 'react';
import { pageSettings } from "@/lib/pageSettings";
import ProductCart from "@/components/ProductCart";
import Error404 from "@/components/Error404";

const VarukorgPage = async () => {
	const data = await pageSettings( 'varukorg' );
	if ( data !== null ) {
		return (
			<ProductCart data={ data }/>
		);
	}
	return <Error404/>
};

export default VarukorgPage;