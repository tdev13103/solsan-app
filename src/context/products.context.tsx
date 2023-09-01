'use client'

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ProductsSettings {
	content: string;
	image: {
		sourceUrl: string;
		title: string;
	}
	slug: string;
	title: string;
	uri: string;
	productId: number;
	price: string;
	woocommerceProductSettings: {
		displayVatTitle: boolean;
		productCardLabel: string;
		productCardColor: string;
		productEquipment: string;
	}
}


interface ProductsContextProps {
	productsSettings: ProductsSettings[];
	setProductsSettings: Dispatch<SetStateAction<ProductsSettings>>;
}

const ProductsContext = createContext<ProductsContextProps>( {} as ProductsContextProps );

export const ProductsContextProvider = ( {
	children,
	value,
}: { children: React.ReactNode, value: any } ) => {
	const [productsSettings, setProductsSettings] = useState( value );
	return (
		<ProductsContext.Provider value={ {
			productsSettings,
			setProductsSettings,
		} }>
			{ children }
		</ProductsContext.Provider>
	)
};

export const useProductsContext = () => useContext( ProductsContext );