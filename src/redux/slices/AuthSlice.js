import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authData: '',
}

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authUserAction: (state, action) => {
            return {
                ...state,
                authData: action.payload,
            }
        },
        logoutAction: (state, action) => {
            localStorage.removeItem('jwt');
            localStorage.removeItem('cart');
            localStorage.removeItem('wishList');
            return {
                ...state,
                authData: '',
            }
        }
    }
});

export const { authUserAction, logoutAction } = AuthSlice.actions;

export default AuthSlice.reducer;