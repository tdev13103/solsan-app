'use client'

import React from "react";
import styled from '@emotion/styled';
import Typography from "../UI/Typography";
import Button from "@/components/Button";
import { useAppDispatch } from "@/redux/hooks";
import { setPopupState } from "@/redux/features/popupActions";
import theme from "@/styles/theme";
import { useThemeContext } from "@/context/theme.context";

const tho = 'thanks-offer';

const ThanksOfferWrap = styled.div`
	
	.thanks-offer {
		&__title {
			margin-bottom: ${ theme.spaces.normal };
		}
		
		&__desc {
			margin-bottom: ${ theme.spaces.medium2 };
		}
	}
`;

const ThanksPopup = () => {
	const { themeSettings } = useThemeContext();
	const {
		thanksOfferTitle,
		thanksOfferDesc,
	} = themeSettings;
	const dispatch = useAppDispatch();
	
	const closePopup = ( event: Event ) => {
		event.preventDefault();
		
		dispatch( setPopupState( {
			state   : '',
			content : '',
			name    : '',
		} ) );
		
		document.querySelector( 'body' )?.classList.remove( 'popup-open' );
	};
	
	return (
		<ThanksOfferWrap className={ `${ tho }` }>
			<Typography className={ `${ tho }__title` } type={ 'h5' } variant={ 'h5' }>
				{ thanksOfferTitle }
			</Typography>
			<Typography className={ `${ tho }__desc` } type={ 'p' } variant={ 'body_1_large' }>
				{ thanksOfferDesc }
			</Typography>
			<Button type={ `button_2` }
			        title={ `Ok` }
			        isHyperlink={ false }
			        hrefLink={ `#` }
			        className={ `${ tho }__btn` }
			        onClick={ closePopup }/>
		</ThanksOfferWrap>
	);
};

export default ThanksPopup;