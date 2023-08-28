'use client'
import React, { useEffect, useState } from "react";
import Popup from "../Popup";
import { useAppSelector } from "@/redux/hooks";


const GeneralPopupWrapper = () => {
	const popupData = useAppSelector( state => state?.popupReducer );
	const popupState = popupData?.popup?.state;
	const popupContent = popupData?.popup?.content;
	const popupName = popupData?.popup?.name;
	
	const [isAddReviewPopupOpen, setReviewPopupState] = useState<boolean>( false );
	
	useEffect( () => {
		setReviewPopupState( popupState === 'open' );
	}, [popupState] );
	
	// general-popup
	
	return (
		<>
			{
				(popupState === 'open') &&
        <Popup open={ isAddReviewPopupOpen }
               customClass={ popupName }
               setOpenPopup={ setReviewPopupState }>
					{
						popupContent ? popupContent : 'General POPUP'
					}
        </Popup>
			}
		</>
	);
}


export default GeneralPopupWrapper;