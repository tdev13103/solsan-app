import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {saveToLocalStorage} from "@/utils/localStorageUtils";

type CartItem = {
    name?: string | undefined;
    price?: string;
    image?: {
        sourceUrl: string;
        title: string;
    };
    equipment?: string;
    installation?: boolean;
    taxStatus?: string;
};

type InitialStateType = {
    item: CartItem | null;
};

const initialState: InitialStateType = {
    item: null,
};

export const installationProduct = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setInstallationProduct: (state, action: PayloadAction<CartItem>) => {
            if (action.payload) {
                state.item = {
                    ...state.item,
                    ...action.payload,
                };
            } else {
                state.item = null;
            }
            saveToLocalStorage("SolsamInstallationProduct", state.item);
        },
    },
});

export const {
    setInstallationProduct,
} = installationProduct.actions;
export default installationProduct.reducer;
