import {configureStore} from "@reduxjs/toolkit";
import popupReducer from "@/redux/features/popupActions";
import cartReducer from "@/redux/features/cartActions";
import installationProductReducer from "@/redux/features/installationActions";

export const store = configureStore({
    reducer: {
        popupReducer,
        cartReducer,
        installationProductReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
