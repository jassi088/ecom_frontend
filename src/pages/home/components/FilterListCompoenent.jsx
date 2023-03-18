import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterDropdownAction, loadingAction, setProductsAction } from '../../../redux/slices/HomeSlice';
import { getAllProducts, productByPrice } from '../../../shared/apiCall/product';


const FilterListCompoenent = () => {
    const dispatch = useDispatch();
    const [range, setRange] = useState(0);
    const filterListDropdown = useSelector(state => state.home.filterListDropdown);

    const rangeHandler = e => {
        setRange(e.target.value);
        fetchData(e.target.value);
    }

    const fetchData = async (price) => {
        if (price === 'all') {
            try {
                let { data: responseData } = await getAllProducts();
                if (responseData && responseData.Products) {
                    dispatch(setProductsAction(responseData.Products));
                }
            } catch (error) {

            }
        } else {
            dispatch(loadingAction(true));
            try {
                let { data: responseData } = await productByPrice(price);
                if (responseData && responseData.Products) {
                    dispatch(setProductsAction(responseData.Products));
                }
            } catch (error) {

            } finally {
                dispatch(loadingAction(false));
            }
        }
    }


    const closeFilterBar = () => {
        fetchData('all');
        dispatch(filterDropdownAction(false));
        setRange(0);
    }

    return (
        <div className={`${!filterListDropdown && 'hidden'} my-4`}>
            <hr />
            <div className="w-full flex flex-col">
                <div className="font-medium py-2">
                    Filter by price
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-2 w-2/3 lg:w-2/4">
                        <label htmlFor="points" className="text-sm">
                            Price (between 0 and 10$): {' '}
                            <span className="font-semibold text-yellow-700">
                                {range}.00$
                            </span>{' '}
                        </label>
                        <input
                            value={range}
                            onChange={rangeHandler}
                            className="slider"
                            type="range"
                            id='points'
                            min='0'
                            max='1000'
                            step='10'
                        />
                    </div>
                    <div
                        onClick={closeFilterBar}
                        className="cursor-pointer">
                        <svg
                            className="w-8 h-8 text-gray-700 hover:bg-gray-200 rounded-full p-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterListCompoenent;