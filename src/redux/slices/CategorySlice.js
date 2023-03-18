import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCategories: "",
}

export const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        getCategories: (state, action) => {
            return {
                ...state,
                allCategories: action.payload,
            }
        }
    }
});


export const {getCategories} = CategorySlice.actions;
export default CategorySlice.reducer;