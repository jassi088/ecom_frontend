import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cartProductAction, inCartAction, loadingAction, singleProductDetailAction } from 'src/redux/slices/HomeSlice';
import { cartListProduct } from 'src/shared/apiCall/cart';
import { getSingleProduct } from 'src/shared/apiCall/product';
import { addToCart, cartListId, updateQuantity } from 'src/shared/helpers/cart';
import totalCost from 'src/shared/helpers/totalCost';
import { isWishReq, isWish, unWishReq } from 'src/shared/utils/wishList';
import { slideImage } from '../helpers/slideImage';
import ProductDetailSectionTwoComponent from './ProductDetailSectionTwoComponent';
import SubmenuComponent from './SubmenuComponent';


const ProductDetailSectionOneComponent = () => {

    const { id } = useParams();

    const [count, setCount] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [alertq, setAlertq] = useState(false);
    const [wList, setWList] = useState(JSON.parse(localStorage.getItem('wishList')));

    const dispatch = useDispatch();
    const homeSlice = useSelector(state => state.home);
    const sProduct = homeSlice.singleProductDetail;


    const fetchSingleProduct = async () => {
        dispatch(loadingAction(true));
        try {
            let { data: responseData } = await getSingleProduct(id);
            if (responseData.Product) {
                dispatch(singleProductDetailAction(responseData.Product));
                dispatch(inCartAction(cartListId()));
                fetchCartProduct();
            }
        } catch (error) {

        } finally {
            dispatch(loadingAction(false));
        }
    }

    const fetchCartProduct = async () => {
        try {
            let { data: responseData } = await cartListProduct();
            if (responseData.Products) {
                dispatch(cartProductAction(responseData.Products));
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (id) {
            fetchSingleProduct();
        }
    }, [id]);

    useEffect(() => {
        if (homeSlice.inCart && homeSlice.inCart !== null) {
            let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

            if (cart.length > 0) {
                cart.forEach(item => {
                    if (item.id === id && homeSlice.inCart.includes(id)) {
                        setQuantity(item.quantity);
                    }
                })
            }
        }
    }, [homeSlice.inCart, id]);



    if (homeSlice.loading) {
        return (
            <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center h-screen">
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
    } else if (!sProduct) {
        return <div className='col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center h-screen'>No product Found</div>
    }


    return (
        <>
            {/* Navigation Submenu */}
            <SubmenuComponent
                categoryId={sProduct?.pCategory?._id}
                pName={sProduct?.pName}
                cName={sProduct?.pCategory?.cName}
            />

            {/* Product details */}
            <section className="m-4 md:mx-12 md:my-6">
                <div className="grid grid-cols-2 md:grid-cols-12">

                    {/* Images */}
                    <div className="hidden md:block md:col-span-1 md:flex md:flex-col md:space-y-4 md:mr-2">
                        <img
                            onClick={() => slideImage('increase', 0, count, setCount, sProduct.pImages)}
                            className={`${count === 0 ? "" : "opacity-25"} cursor-pointer w-20 h-20 object-cover object-center`}
                            src={sProduct?.pImages[0]}
                            alt={sProduct?.pName}
                        />
                        <img
                            onClick={() => slideImage('increase', 1, count, setCount, sProduct.pImages)}
                            className={`${count === 1 ? "" : "opacity-25"} cursor-pointer w-20 h-20 object-cover object-center`}
                            src={sProduct?.pImages[1]}
                            alt={sProduct?.pName}
                        />
                    </div>
                    {/* Images end */}

                    <div className="col-span-2 md:col-span-7">
                        <div className="relative">
                            <img
                                className="w-full"
                                alt={sProduct.pName}
                                src={sProduct.pImages[count]}
                                style={{
                                    width: "100%",
                                    objectFit: "cover",
                                    height: "24rem",
                                }}
                            />


                            {/* Icons */}
                            <div className="absolute inset-0 flex justify-between items-center mb-4">
                                <svg
                                    onClick={() => slideImage('increase', null, count, setCount, sProduct.pImages)}
                                    className="flex justify-center  w-12 h-12 text-gray-700 opacity-25 cursor-pointer hover:text-yellow-700 hover:opacity-100"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                <svg
                                    onClick={() => slideImage('increase', null, count, setCount, sProduct.pImages)}
                                    className="flex justify-center  w-12 h-12 text-gray-700 opacity-25 cursor-pointer hover:text-yellow-700 hover:opacity-100"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                            {/* Icons end */}

                        </div>
                    </div>



                    {/*  */}
                    <div className="col-span-2 mt-8 md:mt-0 md:col-span-4 md:ml-6 lg:ml-12">
                        <div className="flex flex-col leading-8">
                            <div className="text-2xl tracking-wider">{sProduct.pName}</div>
                            <div className="flex justify-between items-center">

                                <span className="text-xl tracking-wider text-yellow-700">
                                    ${sProduct.pPrice}.00
                                </span>

                                <span>
                                    <svg
                                        onClick={() => isWishReq(sProduct._id, setWList)}
                                        className={`${isWish(sProduct._id, wList) && 'hidden'} w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700`}
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
                                        onClick={() => unWishReq(sProduct._id, setWList)}
                                        className={`${!isWish(sProduct._id, wList) && 'hidden'} w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700`}
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
                                </span>

                            </div>
                        </div>

                        {/* Description */}
                        <div className="my-4 md:my-6 text-gray-600">
                            {sProduct.pDescription}
                        </div>


                        <div className="my-4 md:my-6">
                            {
                                quantity === sProduct.pQuantity &&
                                <span className='text-xs text-red-500'>
                                    Stock Limited
                                </span>
                            }
                            <div className={`flex justify-between items-center px-4 py-2 ${quantity === sProduct.pQuantity ? '' : 'border'}`}
                                style={{ border: quantity === sProduct.pQuantity && "1px solid red" }}>


                                {/* Title */}
                                <div className={`${quantity === sProduct.pQuantity ? 'border-red-500' : ''}`}>Quantity</div>

                                {
                                    sProduct.pQuantity !== 0
                                        ? (
                                            homeSlice.inCart === null || (homeSlice.inCart !== null && homeSlice.inCart.includes(sProduct._id) === false) ?
                                                (
                                                    // Quantity buttons
                                                    <div className="flex items-center space-x-2">
                                                        {/* Quantity - */}
                                                        <span
                                                            onClick={() => updateQuantity('decrease', sProduct.pQuantity, quantity, setQuantity, setAlertq)}
                                                        >
                                                            <svg
                                                                className="w-5 h-5 fill-current cursor-pointer"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </span>

                                                        {/* Quantity real */}
                                                        <span className="font-semibold">{quantity}</span>

                                                        {/* Quauntity + */}
                                                        <span
                                                            onClick={() => updateQuantity('increase', sProduct.pQuantity, quantity, setQuantity, setAlertq)}
                                                        >
                                                            <svg
                                                                className="w-5 h-5 fill-current cursor-pointer"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>

                                                ) :
                                                (
                                                    <div className='flex items-center space-x-2'>
                                                        <span>
                                                            <svg
                                                                className="w-5 h-5 fill-current cursor-not-allowed"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </span>
                                                        <span className="font-semibold">{quantity}</span>
                                                        <span>
                                                            <svg
                                                                className="w-5 h-5 fill-current cursor-not-allowed"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                )

                                        )
                                        : (
                                            <div className="flex items-center space-x-2">
                                                <span>
                                                    <svg
                                                        className="w-5 h-5 fill-current cursor-not-allowed"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </span>
                                                <span className="font-semibold">{quantity}</span>
                                                <span>
                                                    <svg
                                                        className="w-5 h-5 fill-current cursor-not-allowed"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                        )
                                }

                            </div>


                            {/* incart and out of stock buttons  */}

                            {
                                sProduct.pQuantity !== 0 ?
                                    (
                                        homeSlice.inCart !== null && homeSlice.inCart.includes(sProduct._id) === true ?
                                            <div
                                                style={{ background: '#303031' }}
                                                className='px-4 py-2 text-white text-center cursor-not-allowed uppercase opacity-75'>
                                                In Cart
                                            </div>
                                            :
                                            <div style={{ background: "#303031" }}
                                                className={`px-4 py-2 text-white text-center cursor-pointer uppercase`}
                                                onClick={() => addToCart(
                                                    sProduct._id,
                                                    quantity,
                                                    sProduct.pPrice,
                                                    dispatch,
                                                    setQuantity,
                                                    setAlertq, fetchSingleProduct,
                                                    totalCost)}>
                                                Add to cart
                                            </div>
                                    )
                                    :
                                    (
                                        homeSlice.inCart !== null && homeSlice.inCart.includes(sProduct._id) === true
                                            ?
                                            <div
                                                style={{ background: '#303031' }}
                                                className='px-4 py-2 text-white text-center cursor-not-allowed uppercase opacity-75'>
                                                In Cart
                                            </div>
                                            :
                                            <div
                                                style={{ background: '#303031' }}
                                                className=' px-4 py-2 text-white text-center cursor-not-allowed uppercase opacity-75'>
                                                Out of Stock
                                            </div>
                                    )
                            }


                        </div>
                    </div>



                </div>
            </section>


            {/* Product detail section two */}
            <ProductDetailSectionTwoComponent />
        </>
    )
}

export default ProductDetailSectionOneComponent;