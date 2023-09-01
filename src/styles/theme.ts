interface Colors {
	colorNavyDark: string;
	colorNavyDarkHover: string;
	colorNavy: string;
	colorPurpleDark: string;
	colorSkyLight: string;
	colorLight: string;
	colorPurpleLight: string;
	colorNavyLight: string;
	colorGrey: string;
	colorOrange: string;
	colorWhite: string;
	colorRed: string;
}

interface Spaces {
	little: string;
	mini: string;
	small: string;
	small1: string;
	small2: string;
	gridGap: string;
	gridGap2: string;
	normal: string;
	medium1: string;
	medium2: string;
	medium3: string;
	large1: string;
	large2: string;
	large4: string;
	large19: string;
	large20: string;
	large21: string;
	large15: string;
	large18: string;
	large17: string;
	large16: string;
	inputHeight: string;
	btnHeight: string;
}

interface BorderRadius {
	default: string;
}

interface ResponsiveMediaSizes {
	m1570: string;
	m1470: string;
	m1370: string;
	m1270: string;
	m1024: string;
	m920: string;
	m850: string;
	m768: string;
	m480: string;
	m415: string;
	m375: string;
	m330: string;
}


interface GridStyles {
	'grid-fullwidth': string;
	'grid-4': string;
	'grid-3': string;
	'grid-2': string;
	'grid-2-1': string;
	'grid-1-2': string;
}

interface ButtonStyles {
	button_1: string;
	button_2: string;
	button_3: string;
	button_4: string;
	button_5: string;
}

interface LinksStyles {
	type_1: string;
	type_2: string;
	hyperPrimary: string;
	hyperSecondary: string;
}

interface Theme {
	spaces: Spaces;
	colors: Colors;
	borderRadius: BorderRadius;
	responsiveMediaSizes: ResponsiveMediaSizes;
	heading: string;
	h1: string;
	h2: string;
	h3: string;
	h4: string;
	h5: string;
	h6: string;
	subheader1: string;
	p: string;
	body_1_large: string;
	body_2_large: string;
	grid: GridStyles;
	buttons: ButtonStyles;
	text_input: string;
	optional_text: string;
	textarea: string;
	links: LinksStyles;
}


// Colors:
const colors = {
	colorNavyDark      : '#221551',
	colorNavyDarkHover : '#271668',
	colorNavy          : '#8C96FF',
	colorPurpleDark    : '#8C96FF',
	colorSkyLight      : '#F9F9F2',
	colorLight         : '#F8F8FA',
	colorPurpleLight   : '#E8EAFF',
	colorNavyLight     : '#8F8AA6',
	colorGrey          : '#5C5E74',
	colorOrange        : '#F59E3F',
	colorWhite         : '#fff',
	colorRed           : '#f00',
}

const borderRadius = {
	default : '12px',
}

// Spaces
const spaces = {
	little      : '4px',
	mini        : '8px',
	small       : '16px',
	small1      : '22px',
	small2      : '24px',
	gridGap     : '20px',
	gridGap2    : '32px',
	normal      : '24px',
	medium1     : '32px',
	medium2     : '40px',
	medium3     : '48px',
	large1      : '56px',
	large2      : '64px',
	large4      : '80px',
	large19     : '100px',
	large20     : '116px',
	large21     : '124px',
	large15     : '148px',
	large18     : '160px',
	large17     : '196px',
	large16     : '220px',
	inputHeight : '47px',
	btnHeight   : '47px',
}

const responsiveMediaSizes = {
	m1570 : '1570px',
	m1470 : '1470px',
	m1370 : '1370px',
	m1270 : '1270px',
	m1024 : '1024px',
	m920  : '920px',
	m850  : '850px',
	m768  : '768px',
	m480  : '480px',
	m415  : '415px',
	m375  : '375px',
	m330  : '330px',
}

const heading = `
    font-style: normal;
    font-weight: 700;
    line-height: 1.1;
    color: ${ colors.colorNavyDark };
    padding: 0;
`

const body = `
    font-style: normal;
    font-weight: 400;
    line-height: 1.4;
    color: ${ colors.colorNavyDark };
    padding: 0;
`

const btnStyles = `
	-webkit-appearance : none;
	-moz-appearance    : none;
	appearance         : none;
	height             : ${ spaces.btnHeight };
	padding            : 0 ${ spaces.normal };
	display            : inline-flex;
	align-items        : center;
	justify-content    : center;
	background-color   : ${ colors.colorNavyDark };
	border-radius      : 12px;
	cursor             : pointer;
	border             : 1px solid ${ colors.colorNavyDark };
	font-style         : normal;
	font-weight        : 500;
	font-size          : 18px;
	line-height        : 1.28;
	color              : ${ colors.colorWhite };

	&:hover {
		background-color : transparent;
		color            : ${ colors.colorNavyDark };
		border-color     : ${ colors.colorNavyDark };
	}
`

const linkStyles = `
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	line-height: 1.27;
	text-decoration-line: underline;
	color: ${ colors.colorSkyLight };
	text-decoration: underline;
	word-break: break-all;
	
	&:hover {
		color: ${ colors.colorOrange };
		text-decoration-line: underline;
	}
`


const theme: Theme = {
	spaces               : { ...spaces },
	colors               : { ...colors },
	borderRadius         : { ...borderRadius },
	responsiveMediaSizes : { ...responsiveMediaSizes },
	heading              : heading,
	
	h1 : `
		${ heading }
		font-size: 58px;
		margin-bottom: ${ spaces.normal }
		
		@media screen and (max-width: 1270px) {
	        font-size: 46px;
	    }
		@media screen and (max-width: 920px) {
	        font-size: 42px;
	    }
		@media screen and (max-width: 480px) {
	        font-size: 30px;
	    }
	`,
	
	h2 : `
		${ heading }
		font-size: 48px;
		margin-bottom: ${ spaces.normal }

	    @media screen and (max-width: 1270px) {
	        font-size: 35px;
	    }
	    @media screen and (max-width: 920px) {
	        font-size: 28px;
	    }
	    @media screen and (max-width: 480px) {
	        font-size: 26px;
	    }
	`,
	
	h3 : `
		${ heading }
		font-size: 38px;
		line-height: 1.2;   
		margin-bottom: ${ spaces.normal }

	    @media screen and (max-width: 1270px) {
	        font-size: 30px;
	    }
	    @media screen and (max-width: 920px) {
	        font-size: 22px;
	    }
	`,
	
	h4 : `
		${ heading }
		font-size: 28px;
		margin-bottom: ${ spaces.small }

	    @media screen and (max-width: 1270px) {
	        font-size: 24px;
	    }
	    @media screen and (max-width: 920px) {
	        font-size: 20px;
	    }
	`,
	
	h5 : `
		${ heading }
		font-size: 24px;
		margin-bottom: ${ spaces.small }

	    @media screen and (max-width: 1270px) {
	        font-size: 20px;
	    }
	    @media screen and (max-width: 920px) {
	        font-size: 18px;
	    }
	`,
	
	h6 : `
		${ heading }
		font-size: 20px;
		margin-bottom: ${ spaces.small }

	    @media screen and (max-width: 1270px) {
	        font-size: 16px;
	    }
	    @media screen and (max-width: 920px) {
	        font-size: 12px;
	    }
	`,
	
	subheader1 : `
		${ heading }
		font-size: 18px;
		margin-bottom: ${ spaces.small }

	    @media screen and (max-width: 1270px) {
	        font-size: 18px;
	    }
	    @media screen and (max-width: 920px) {
	        font-size: 18px;
	    }
	    @media screen and (max-width: 480px) {
	        font-size: 18px;
	    }
	`,
	
	p : `
		${ body }
		font-size: 18px;
		margin-bottom: ${ spaces.small }
		
		@media screen and (max-width: 920px) {
	        font-size: 14px;
	    }
	`,
	
	body_1_large : `
		${ body }
		font-size: 18px;
		
		@media screen and (max-width: 1024px) {
	        font-size: 16px;
	    }
		@media screen and (max-width: 920px) {
	        font-size: 14px;
	    }
		@media screen and (max-width: 480px) {
	        font-size: 16px;
	    }
	`,
	
	body_2_large : `
		${ body }
		font-size: 14px;
		
		@media screen and (max-width: 920px) {
	        font-size: 12px;
	    }
	`,
	
	grid    : {
		'grid-fullwidth' : `
			display: grid; 
			grid-template-columns: 1fr; 
			grid-template-rows: 1fr; 
			gap: 0px ${ spaces.gridGap };
			grid-template-areas: "."; 
		`,
		'grid-4'         : `
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-template-rows: 1fr;
			grid-column-gap: ${ spaces.gridGap };
			grid-row-gap: ${ spaces.gridGap };
			
			@media screen and (max-width: 920px) {
		        grid-column-gap: ${ spaces.small };
				grid-row-gap: ${ spaces.small };
				grid-template-columns: 1fr;
                grid-template-rows: 2fr;
                grid-template-areas: unset;
                grid-column-gap: unset;
                grid-row-gap: unset;
		    }
		`,
		
		'grid-3' : `
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: 1fr;
			grid-column-gap: ${ spaces.gridGap };
			grid-row-gap: ${ spaces.gridGap };
			
			@media screen and (max-width: 920px) {
		        grid-column-gap: ${ spaces.small };
				grid-row-gap: ${ spaces.small };
				grid-template-columns: 1fr;
                grid-template-rows: 2fr;
                grid-template-areas: unset;
                grid-column-gap: unset;
                grid-row-gap: unset;
		    }
		`,
		
		'grid-2' : `
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: 1fr;
			grid-column-gap: ${ spaces.gridGap };
			grid-row-gap: ${ spaces.gridGap };
			grid-template-areas: "area-2 area-1";
			
			@media screen and (max-width: 920px) {
		        grid-column-gap: ${ spaces.small };
				grid-row-gap: ${ spaces.small };
				grid-template-columns: 1fr;
                grid-template-rows: 2fr;
                grid-template-areas: unset;
                grid-column-gap: unset;
                grid-row-gap: unset;
		    }
			
			@media (max-width: 850px) {
				
			}
			
			.area-2 { 
				grid-area: area-2;
				position: relative; 
			}
			.area-1 { 
				grid-area: area-1;
				position: relative; 
			}
		`,
		
		'grid-2-1' : `
			display: grid; 
			grid-template-columns: 2fr 1fr; 
			gap: 0px ${ spaces.gridGap };
			
			.area-2 { 
				grid-area: area-2;
				position: relative; 
			}
			.area-1 { 
				grid-area: area-1;
				position: relative; 
			}
			
			@media screen and (max-width: 920px) {
		        gap: 0px ${ spaces.small };
		        grid-template-columns: 1fr;
                grid-template-rows: 2fr;
                grid-template-areas: unset;
                grid-column-gap: unset;
                grid-row-gap: unset;
		    }
			
		`,
		
		'grid-1-2' : `
			display: grid; 
			grid-template-columns: 1fr 2fr; 
			gap: 0px ${ spaces.gridGap };
			
			@media screen and (max-width: 920px) {
		        gap: 0px ${ spaces.small };
		        grid-template-columns: 1fr;
                grid-template-rows: 2fr;
                grid-template-areas: unset;
                grid-column-gap: unset;
                grid-row-gap: unset;
		    }	
		`,
	},
	buttons : {
		button_1 : `
			${ btnStyles }
			background-color : ${ colors.colorOrange };
			border-color : ${ colors.colorOrange };
			color : ${ colors.colorWhite };
           
            &:hover {
                background-color : transparent;
				border-color : ${ colors.colorOrange };
				color : ${ colors.colorOrange };
            }
		`,
		button_2 : `
			${ btnStyles }
		`,
		button_3 : `
			${ btnStyles }
           
            &:hover {
                background-color : ${ colors.colorWhite };
                color : ${ colors.colorWhite };
            }
		`,
		button_4 : `
			${ btnStyles }
			background-color : ${ colors.colorWhite };
			border-color : ${ colors.colorWhite };
			color : ${ colors.colorNavyDark };
           
            &:hover {
                background-color : ${ colors.colorNavyDark };
				border-color : ${ colors.colorWhite };
				color : ${ colors.colorSkyLight };
            }
		`,
		button_5 : `
			${ btnStyles }
			background-color : ${ colors.colorWhite };
			border-color : ${ colors.colorNavyDark };
			color : ${ colors.colorNavyDark };
           
      &:hover {
        background-color : ${ colors.colorNavyDark };
				border-color : ${ colors.colorWhite };
				color : ${ colors.colorSkyLight };
      }
		`,
	},
	
	text_input : `
		width: 100%;
		-webkit-appearance : none;
		-moz-appearance    : none;
		appearance         : none;
		border: 1px solid ${ colors.colorNavyDark };
		border-radius: 12px;
		
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 1.4;
		color: ${ colors.colorNavyDark };
		background-color: ${ colors.colorWhite };
		height: ${ spaces.inputHeight };
		box-sizing: border-box;
		padding-left: ${ spaces.small };
		padding-right: ${ spaces.small };
		outline: none;
		
		&::placeholder {
			color: ${ colors.colorNavyLight };
		}
		
		&:disable, &:disabled, &.disable, &.disabled {
			border-color: rgba(${ colors.colorNavyDark }, 0.5);
			color: rgba(${ colors.colorNavyLight }, 0.5);
			
			&::placeholder {
				color: rgba(${ colors.colorNavyLight }, 0.5);
			}
		}
		&:hover {
			border-color: ${ colors.colorNavyDark };
			color: ${ colors.colorNavyDark };
			
			&::placeholder {
				color: ${ colors.colorNavyLight };
			}
		}
		&:focus {
			border-color: ${ colors.colorNavyDark };
			color: ${ colors.colorNavyLight };
			
			&::placeholder {
				color: ${ colors.colorNavyLight };
			}
		}
		&.error {
			border-color: ${ colors.colorRed };
			color: ${ colors.colorRed };
			
			&::placeholder {
				color: ${ colors.colorRed };
			}
		}
	`,
	
	optional_text : `
		color : ${ colors.colorRed };
		font-size: 12px; 
	`,
	
	textarea : `
		padding-top: ${ spaces.small };
		height: ${ spaces.large20 };
		resize: none;
	`,
	
	links : {
		type_1         : `
			${ linkStyles }
		`,
		type_2         : `
			${ linkStyles }
			color: ${ colors.colorNavyDark };
			
			&:hover {
				color: ${ colors.colorOrange };
			}
		`,
		hyperPrimary   : `
			${ linkStyles }
			color: ${ colors.colorPurpleDark };
			
			&:hover {
				color: ${ colors.colorNavyLight };
			}
		`,
		hyperSecondary : `
			${ linkStyles }
			color: ${ colors.colorPurpleDark };
			
			&:hover {
				color: ${ colors.colorNavyLight };
			}
		`,
	}
	
}

export default theme