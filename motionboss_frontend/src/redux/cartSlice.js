import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cartItems') || '[]') : [],
    totalAmount: typeof window !== 'undefined' ? Number(localStorage.getItem('cartTotal') || '0') : 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);

            if (!existingItem) {
                state.items.push(newItem);
                state.totalAmount += newItem.price;

                if (typeof window !== 'undefined') {
                    localStorage.setItem('cartItems', JSON.stringify(state.items));
                    localStorage.setItem('cartTotal', state.totalAmount.toString());
                }
            }
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                state.items = state.items.filter((item) => item.id !== id);
                state.totalAmount -= existingItem.price;

                if (typeof window !== 'undefined') {
                    localStorage.setItem('cartItems', JSON.stringify(state.items));
                    localStorage.setItem('cartTotal', state.totalAmount.toString());
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;

            if (typeof window !== 'undefined') {
                localStorage.removeItem('cartItems');
                localStorage.removeItem('cartTotal');
            }
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
