import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allProducts: '',
};

export const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProductsAction: (state, action) => {
            return {
                ...state,
                allProducts: action.payload,
            };
        },
    },
});


export const { fetchProductsAction } = ProductSlice.actions;
export default ProductSlice.reducer;