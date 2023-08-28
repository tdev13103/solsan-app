import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "@/redux/features/popupActions";

export const store = configureStore( {
	reducer    : {
		popupReducer
	},
	middleware : ( getDefaultMiddleware ) =>
		getDefaultMiddleware( {
			serializableCheck : false
		} ),
	devTools   : process.env.NODE_ENV !== "production",
} );

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
