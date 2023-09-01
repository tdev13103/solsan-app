import dynamic from 'next/dynamic';

export const componentImports: Record<string, any> = {
	AccordionSection : dynamic( () => import('@/components/blocks/AccordionSection') ),
	BannerBlock      : dynamic( () => import('@/components/blocks/BannerBlock') ),
	Blockquote       : dynamic( () => import('@/components/blocks/Blockquote') ),
	CartBlock        : dynamic( () => import('@/components/blocks/CartBlock') ),
	ContactForm      : dynamic( () => import('@/components/blocks/ContactForm') ),
	CustomClassic    : dynamic( () => import('@/components/blocks/CustomClassic') ),
	CustomerQuote    : dynamic( () => import('@/components/blocks/CustomerQuote') ),
	IframeCalculator : dynamic( () => import('@/components/blocks/IframeCalculator') ),
	Image            : dynamic( () => import('@/components/blocks/Image') ),
	ImageTextBlock   : dynamic( () => import('@/components/blocks/ImageTextBlock') ),
	NewsBlock        : dynamic( () => import('@/components/blocks/NewsBlock') ),
	OurSolarPanels   : dynamic( () => import('@/components/blocks/OurSolarPanels') ),
	PageHeader       : dynamic( () => import('@/components/blocks/PageHeader') ),
	Paragraph        : dynamic( () => import('@/components/blocks/Paragraph') ),
	SolsamStepByStep : dynamic( () => import('@/components/blocks/SolsamStepByStep') ),
	StatComponent    : dynamic( () => import('@/components/blocks/StatComponent') ),
	TopBlock         : dynamic( () => import('@/components/blocks/TopBlock') ),
	ProductOffer     : dynamic( () => import('@/components/blocks/ProductOffer') ),
};
