import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import { cartProductAction, cartTotalCostAction, loadingAction, orderSuccessAction } from '../../../redux/slices/HomeSlice';
import { cartListProduct } from '../../../shared/apiCall/cart';
import { createOrder, getBrainTreeToken, getPaymentProcess } from '../apiCall/payment';
import CheckoutProductsComponent from './CheckoutProductsComponent';
import totalCost from '../../../shared/helpers/totalCost';

const CheckoutComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector(state => state.home);
    const [state, setState] = useState({
        address: '',
        phone: '',
        error: false,
        success: false,
        clientToken: null,
        instance: {},
    });

    const fetchCartProduct = async () => {
        dispatch(loadingAction(true));
        try {
            const { data: responseData } = await cartListProduct();
            if (responseData && responseData.Products) {
                dispatch(cartProductAction(responseData.Products));
                // console.log(responseData.Products)
            }
        } catch (error) {

        } finally {
            dispatch(loadingAction(false));
        }
    }

    const fetchBraintree = async () => {
        try {
            let { data } = await getBrainTreeToken();
            setState({
                ...state,
                clientToken: data.clientToken,
                success: data.success,
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handlePayment = async () => {
        if (!state.address) {
            setState({
                ...state,
                error: "Please Provide your address",
            });
            return;
        }
        if (!state.phone) {
            setState({
                ...state,
                error: "Please Provide your Phone",
            });
            return;
        }

        let nonce;

        state.instance.requestPaymentMethod()
            .then(data => {
                dispatch(loadingAction(true));
                nonce = data.nonce;

                let paymentData = {
                    amountTotal: totalCost(),
                    paymentMethod: nonce,
                }

                getPaymentProcess(paymentData)
                    .then(async (res) => {
                        if (res.data) {
                            let orderData = {
                                allProduct: JSON.parse(localStorage.getItem('cart')),
                                user: JSON.parse(localStorage.getItem('jwt'))?.user?._id,
                                amount: res.data.transaction.amount,
                                transactionId: res.data.transaction.id,
                                address: state.address,
                                phone: state.phone,
                            }

                            try {
                                let { data: responseData } = await createOrder(orderData);
                                if (responseData.success) {
                                    localStorage.setItem('cart', []);
                                    dispatch(cartProductAction(null));
                                    dispatch(cartTotalCostAction(null));
                                    setState({
                                        address: '',
                                        phone: '',
                                        error: false,
                                        success: false,
                                        clientToken: null,
                                        instance: {},
                                    });
                                    dispatch(orderSuccessAction(true));
                                    return navigate('/');
                                }
                            } catch (error) {
                                console.log(error);
                            } finally {
                                dispatch(loadingAction(false));
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })

            })
            .catch(error => setState({ ...state, error: error.message }));
    }

    useEffect(() => {
        fetchCartProduct();
        fetchBraintree();
    }, []);


    if (data.loading) {
        return (
            <div className="flex items-center justify-center h-screen">
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
                Please wait untill finish
            </div>
        );
    }

    return (
        <section className="mx-4 mt-32 md:mx-12">
            <div className="text-2xl mx-2">Orders</div>
            {/* Product List */}
            <div className="flex flex-col md:flex md:space-x-2 md:flex-row">

                {/* Products */}
                <div className="md:w-1/2">
                    <CheckoutProductsComponent products={data.cartProduct} />
                </div>

                {/* Payment form */}
                <div className='w-full order-first md:order-last md:w-1/2'>
                    {
                        state.clientToken !== null
                            ?
                            (
                                <div
                                    onBlur={() => setState({ ...state, error: false })}
                                    className='p-4 md:p-8'>
                                    {
                                        state.error && (<div className='bg-red-200 py-2 px-4 rounded'>
                                            {state.error}
                                        </div>)
                                    }


                                    {/* Address */}
                                    <div className='flex flex-col py-2'>
                                        <label htmlFor="address" className='pb-2'>
                                            Delivery address
                                        </label>
                                        <input type="text" id="address" placeholder='Address....' className='border px-4 py-2'
                                            value={state.address}
                                            onChange={e => setState({
                                                ...state,
                                                error: false,
                                                address: e.target.value,
                                            })}
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className='flex flex-col py-2'>
                                        <label htmlFor="phone" className='pb-2'>
                                            Phone
                                        </label>
                                        <input type="text" id="phone"
                                            placeholder='Phone...' className='border px-4 py-2'
                                            value={state.phone}
                                            onChange={e => setState({
                                                ...state,
                                                error: false,
                                                phone: e.target.value,
                                            })}
                                        />
                                    </div>

                                    {/* Drop In */}
                                    <DropIn
                                        options={{
                                            authorization: state.clientToken,
                                        }}
                                        onInstance={instance => state.instance = instance}
                                    />

                                    {/* Pay Now Button */}
                                    <div
                                        onClick={handlePayment}
                                        className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer" style={{ background: "#303031" }}>
                                        Pay now
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="flex items-center justify-center h-screen">
                                    <svg
                                        className="w-12 h-12 animate-spin text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                    </svg>
                                </div>
                            )
                    }
                </div>
            </div>


        </section>
    )
}

export default CheckoutComponent