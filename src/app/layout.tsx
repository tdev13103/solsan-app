import '@/styles/globals.scss'
import React from 'react'
import { Outfit } from 'next/font/google'
import Header from "@/components/Header";
import { menuSettings } from "@/lib/menuSettings";
import { ThemeContextProvider } from "@/context/theme.context";
import { Providers } from "@/redux/provider";
import { themeSettings } from "@/lib/themeSettings";
import ThemeRegistry from "@/app/ThemeRegistry";
import Footer from "@/components/Footer";
import CookiesBlock from "@/components/CookiesBlock";
import GeneralPopupWrapper from "@/components/Popup/GeneralPopupWrapper";
import { headers } from 'next/headers';
import { ApolloWrapper } from "@/context/apollo-provider";
import { productsSettings } from "@/lib/productsOptions";
import { ProductsContextProvider } from "@/context/products.context";

const poppins = Outfit( {
	subsets  : ['latin'],
	style    : ['normal'],
	weight   : ['400', '600', '700'],
	variable : '--font-outfit',
	display  : 'swap',
} )

export default async function RootLayout( { children }: { children: React.ReactNode } ) {
	
	const headersList = headers();
	const userAgent = headersList.get( 'user-agent' );
	
	// Let's check if the device is a mobile device
	let isMobileView = userAgent!.match(
		/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
	);
	
	
	const menuProps = await menuSettings();
	const productSettings = await productsSettings();
	const themeOptions = await themeSettings();
	
	return (
		<html lang="en-US" className={ poppins.className }>
		<head>
			<script type="text/javascript" src="https://x.klarnacdn.net/kp/lib/v1/api.js" async></script>
		</head>
		<body>
		<Providers>
			<ThemeContextProvider value={ themeOptions } isMobile={ isMobileView }>
				<ProductsContextProvider value={ productSettings }>
					<ApolloWrapper>
						<ThemeRegistry options={ { key : 'mui' } }>
							<Header links={ menuProps?.['header-menu'] }/>
							{ children }
							<GeneralPopupWrapper/>
							<CookiesBlock/>
							<Footer links={ menuProps }/>
						</ThemeRegistry>
					</ApolloWrapper>
				</ProductsContextProvider>
			</ThemeContextProvider>
		</Providers>
		</body>
		</html>
	);
}
