import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {saveToLocalStorage} from "@/utils/localStorageUtils";

type CartItem = {
    name: string | undefined;
    id: number;
    price: string;
    quantity: number;
    image: {
        sourceUrl: string;
        title: string;
    };
    equipment: string;
    taxStatus: string;
};

type InitialStateType = {
    items: CartItem[];
};

const initialState: InitialStateType = {
    items: [],
};

export const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartState: (state, action: PayloadAction<CartItem>) => {
            const {
                id,
                quantity
            } = action.payload;

            const existingItemIndex = state.items.findIndex(item => item.id === id);

            if (existingItemIndex !== -1) {
                const existingItem = state.items[existingItemIndex];
                if (existingItem) {
                    if (existingItem.quantity !== undefined) {
                        existingItem.quantity += quantity;
                    } else {
                        existingItem.quantity = quantity;
                    }
                }
            } else {
                state.items.push(action.payload);
            }

            saveToLocalStorage("SolsamCartItems", state.items);
        },
        updateCartItem: (state, action: PayloadAction<CartItem>) => {
            const {
                id,
                ...updatedData
            } = action.payload;
            const existingItemIndex = state.items.findIndex((item) => item.id === id);

            if (existingItemIndex !== -1) {
                const existingItem = state.items[existingItemIndex];
                if (existingItem) {
                    state.items[existingItemIndex] = {...existingItem, ...updatedData};
                }
            }

            saveToLocalStorage("SolsamCartItems", state.items);
        },
        deleteCartItem: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            const productIndex = state.items.findIndex((item) => item.id === productId);

            if (productIndex !== -1) {
                state.items.splice(productIndex, 1);
            }

            saveToLocalStorage("SolsamCartItems", state.items);
        },
        addMultipleItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = [...state.items, ...action.payload];
            saveToLocalStorage("SolsamCartItems", state.items);
        },
    },
});


export const {
    setCartState,
    updateCartItem,
    deleteCartItem,
    addMultipleItems
} = cart.actions;
export default cart.reducer;
