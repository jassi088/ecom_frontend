import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryListDropdown: false,
    filterListDropdown: false,
    searchBar: false,
    loading: false,
    products: null,
    singleProductDetail: null,
    menu: true,
    cartModal: false,
    inCart: null,
    cartTotalCost: null,
    cartProduct: null,
    orderSuccess: false,
}


export const HomeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        categoryListDropdownAction: (state, action) => {
            return {
                ...state,
                categoryListDropdown: action.payload,
                searchBar: false,
                filterListDropdown: false,
            }
        },
        filterDropdownAction: (state, action) => {
            return {
                ...state,
                categoryListDropdown: false,
                searchBar: false,
                filterListDropdown: action.payload,
            }
        },
        searchBarAction: (state, action) => {
            return {
                ...state,
                categoryListDropdown: false,
                searchBar: action.payload,
                filterListDropdown: false,
            }
        },
        loadingAction: (state, action) => {
            return {
                ...state,
                loading: action.payload,
            }
        },
        setProductsAction: (state, action) => {
            return {
                ...state,
                products: action.payload,
            }
        },
        searchProductAction: (state, action) => {
            return {
                ...state,
                products:
                    action.payload.productArray.length > 0 &&
                    action.payload.productArray.filter(item => {
                        if (
                            item.pName
                                .toUpperCase()
                                .indexOf(action.payload.searchValue.toUpperCase()) !== -1
                        ) {
                            return item;
                        }
                        return null;
                    }),
            }
        },
        singleProductDetailAction: (state, action) => {
            return {
                ...state,
                singleProductDetail: action.payload,
            }
        },
        menuAction: (state, action) => {
            return {
                ...state,
                menu: action.payload,
            }
        },
        cartModalToggleAction: (state, action) => {
            return {
                ...state,
                cartModal: action.payload,
            }
        },
        inCartAction: (state, action) => {
            return {
                ...state,
                inCart: action.payload,
            }
        },
        cartTotalCostAction: (state, action) => {
            return {
                ...state,
                cartTotalCost: action.payload,
            }
        },
        cartProductAction: (state, action) => {
            return {
                ...state,
                cartProduct: action.payload,
            }
        },
        resetCartAction: () => {
            return {
                categoryListDropdown: false,
                filterListDropdown: false,
                searchBar: false,
                loading: false,
                products: null,
                singleProductDetail: null,
                menu: true,
                cartModal: false,
                inCart: null,
                cartTotalCost: null,
                cartProduct: null,
            }
        },
        orderSuccessAction: (state, action) => {
            return {
                ...state,
                orderSuccess: action.payload,
            }
        },
    }
});


export const { categoryListDropdownAction, searchBarAction, filterDropdownAction, loadingAction, setProductsAction, searchProductAction, singleProductDetailAction, menuAction, cartModalToggleAction, inCartAction, cartTotalCostAction, cartProductAction, resetCartAction, orderSuccessAction } = HomeSlice.actions;

export default HomeSlice.reducer;