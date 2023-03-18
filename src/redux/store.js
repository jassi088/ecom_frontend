import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './slices/LayoutSlice';
import authReducer from './slices/AuthSlice';
import categoryReducer from './slices/CategorySlice';
import productReducer from './slices/ProductSlice';
import homeReducer from './slices/HomeSlice';
import orderReducer from './slices/OrderSlice';



export const store = configureStore({
    reducer: {
        layout: layoutReducer,
        auth: authReducer,
        category: categoryReducer,
        product: productReducer,
        home: homeReducer,
        order: orderReducer
    },
});


