const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    navbarHamburger: false,
    loginSignUpModal: false,
};

export const LayoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        hamburgerToggle: (state, action) => {
            return {
                ...state,
                navbarHamburger: action.payload,
            }
        },
        loginSignUpModalToggle: (state,action) => {
            return {
                ...state,
                loginSignUpModal: action.payload,
            }
        },
    }
});


export const {hamburgerToggle,loginSignUpModalToggle} = LayoutSlice.actions;

export default LayoutSlice.reducer;