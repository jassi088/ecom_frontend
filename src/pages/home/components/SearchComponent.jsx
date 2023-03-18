import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchBarAction, loadingAction, searchProductAction, setProductsAction } from 'src/redux/slices/HomeSlice';
import { getAllProducts } from 'src/shared/apiCall/product';

const SearchComponent = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState();
  const [productArray, setProductArray] = useState([]);
  const searchBar = useSelector(state => state.home.searchBar);

  const searchHandler = (e) => {
    setSearch(e.target.value);
    fetchData();
    dispatch(searchProductAction({
      searchValue: e.target.value,
      productArray,
    }));
  }


  const fetchData = async (isAll) => {
    dispatch(loadingAction(true));
    try {
      let { data: responseData } = await getAllProducts();
      if (responseData && responseData.Products) {
        setProductArray(responseData.Products);
        if (isAll) {
          dispatch(setProductsAction(responseData.Products))
        }
      }
    } catch (error) {

    } finally {
      dispatch(loadingAction(false));
    }
  };

  const closeSearchBar = () => {
    fetchData(true);
    dispatch(searchBarAction(false));
    setSearch('');
    setProductArray([]);
  }


  return (
    <div
      className={`${!searchBar && "hidden"} my-4 flex items-center justify-between`}
    >
      <input
        value={search}
        onChange={searchHandler}
        className="px-4 text-xl py-4 focus:outline-none"
        type="text"
        placeholder="Search products..."
      />
      <div
        onClick={closeSearchBar}
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
  )
}

export default SearchComponent