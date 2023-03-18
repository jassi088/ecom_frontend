import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadingAction, setProductsAction } from 'src/redux/slices/HomeSlice';
import { getAllProducts } from 'src/shared/apiCall/product';
import { isWishReq, isWish, unWishReq } from 'src/shared/utils/wishList';


const ProductComponent = () => {

    const [wList, setWList] = useState(JSON.parse(localStorage.getItem('wishList')));

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector(state => state.home);

    const fetchProducts = async () => {
        dispatch(loadingAction(true));
        try {
            let { data: responseData } = await getAllProducts();
            if (responseData && responseData.Products) {
                dispatch(setProductsAction(responseData.Products));
            }
        }
        catch (error) { }
        finally {
            dispatch(loadingAction(false));
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    if (data.loading) {
        return (
            <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24">
                <svg
                    className="w-12 h-12 animate-spin text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                </svg>
            </div>
        )
    }

    return (
        <>
            {
                data.products && data.products.length > 0 ?
                    data.products.map((product) => {
                        return <div className='relative col-span-1 m-2' key={product._id}>
                            <img
                                onClick={() => navigate(`/products/${product._id}`)}
                                className='w-full object-center cursor-pointer'
                                src={product.pImages[0]}
                                alt={product.pName}
                                style={{ height: '16rem', objectFit: 'cover' }}
                            />
                            <div className='flex items-center justify-between mt-2'>
                                <div className="text-gray-600 font-light truncate">
                                    {product.pName}
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span>
                                        <svg
                                            className="w-4 h-4 fill-current text-yellow-700"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                    </span>
                                    <span className="text-gray-700">
                                        {product.pRatingsReviews.length}
                                    </span>
                                </div>
                            </div>
                            <div>${product.pPrice}.00</div>
                            {/* WhisList Logic  */}
                            <div className="absolute top-0 right-0 mx-2 my-2 md:mx-4">
                                <svg
                                    onClick={() => isWishReq(product._id, setWList)}
                                    className={`${isWish(product._id, wList) && 'hidden'} w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700 transition-all duration-300 ease-in`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                                <svg
                                    onClick={() => unWishReq(product._id, setWList)}
                                    className={`${!isWish(product._id, wList) && 'hidden'} w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700 transition-all duration-300 ease-in`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            {/* WhisList Logic End */}
                        </div>
                    }) : (
                        <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center py-24 text-2xl">
                            No Products Found
                        </div>
                    )
            }
        </>

    )
}

export default ProductComponent;