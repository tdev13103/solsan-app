'use client'

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ThemeSettings {
	
	thanksOfferTitle: string;
	thanksOfferDesc: string;
	oformTitle: string;
	oformInputsTitle: string;
	oformDownloadFileTitle: string;
	oformDownloadBtn: ButtonProps
	oformDesc: string;
	oformCancelBtn: ButtonProps
	headerMobButtonType: string;
	headerLogo: ImageProps
	headerButtonType: string;
	headerButtonTitle: string;
	headerButtonLink: ButtonProps
	frontendLink: string;
	blogPagesShowAtMost: string;
	formsSetttings: {
		formName: string;
		formId: string;
		fields: {
			name: string;
			fieldId: string;
		}[]
	}[]
	footerMenus: string;
	footerMenuLabelsTitle: string;
	footerLogo: ImageProps
	footerIcon: ImageProps
	footerCopyright: string;
	footerContent: string;
	footerButtonType: string;
	footerButtonTitle: string;
	footerButtonLink: ButtonProps
	footerBtmIconRepeater: {
		itemIcon: ImageProps
	}[]
	fieldGroupName: string;
	cookiesText: string;
	cformThanksTitle: string;
	cformThanksDesc: string;
	cformThanksBtn: ButtonProps
	priceInclVatLabel: string;
	productModal: ProductModal
}

interface ProductModal {
	referenceText: string;
	referenceCheckboxLabel: string;
	closeButtonText: string;
	addToCartButtonText: string;
	contentRepeater: {
		title: string;
		content: string;
	}[]
}

interface ButtonProps {
	title: string
	url: string
}

interface ImageProps {
	title: string
	sourceUrl: string
}

interface ThemeContextProps {
	themeSettings: ThemeSettings;
	setThemeSettings: Dispatch<SetStateAction<ThemeSettings>>;
	isMobile: string | string[] | null
}

const ThemeContext = createContext<ThemeContextProps>( {} as ThemeContextProps );

export const ThemeContextProvider = ( {
	children,
	value,
	isMobile
}: { children: React.ReactNode, value: any, isMobile: string | string[] | null } ) => {
	const [themeSettings, setThemeSettings] = useState( value );
	
	return (
		<ThemeContext.Provider value={ {
			themeSettings,
			setThemeSettings,
			isMobile
		} }>
			{ children }
		</ThemeContext.Provider>
	)
};

export const useThemeContext = () => useContext( ThemeContext );