import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allOrders: '',
};

const OrderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        fetchOrdersAction: (state, action) => {
            return {
                ...state,
                allOrders: action.payload
            }
        }
    }
});


export const { fetchOrdersAction } = OrderSlice.actions;

export default OrderSlice.reducer;