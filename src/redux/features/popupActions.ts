import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";


type PopupState = {
	state: string;
	content: React.ReactNode;
	name: string;
}


type InitialStateType = {
	language: string[];
	default_lang: string;
	active_lang: string;
	popup: PopupState;
}

const initialState: InitialStateType = {
	language     : [],
	default_lang : '',
	active_lang  : '',
	popup        : {
		state   : '',
		content : '',
		name    : '',
	}
}

export const popup = createSlice( {
	name     : "popup",
	initialState,
	reducers : {
		setPopupState : ( state, action: PayloadAction<PopupState> ) => {
			return {
				...state,
				popup : action.payload
			}
		},
	},
} );

export const { setPopupState } = popup.actions;
export default popup.reducer;
