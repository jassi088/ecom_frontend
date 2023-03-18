import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartModalToggleAction, cartProductAction, cartTotalCostAction, inCartAction } from 'src/redux/slices/HomeSlice';
import { cartListProduct } from '../apiCall/cart';
import { cartListId } from '../helpers/cart';
import { qunatityFinder } from '../helpers/quantityFinder';
import { subTotal } from '../helpers/subTotal';
import totalCost from '../helpers/totalCost';


const CartModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector(state => state.auth);
    const data = useSelector(state => state.home);
    const products = data.cartProduct;
    // console.log(products)

    const fetchCartProduct = async () => {
        try {
            let { data: responseData } = await cartListProduct();
            if (responseData.Products) {
                dispatch(cartProductAction(responseData.Products));
                dispatch(cartTotalCostAction(totalCost()));
            }
        } catch (error) {
        }
    };

    const removeFromCartProduct = (id) => {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

        if (cart.length !== 0) {
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            fetchCartProduct();
            dispatch(inCartAction(cartListId()));
            dispatch(cartTotalCostAction(totalCost()));
        }

        if (cart.length === 0) {
            dispatch(cartProductAction(null));
            fetchCartProduct();
            dispatch(inCartAction(cartListId()));
        }
    }


    useEffect(() => {
        fetchCartProduct();
    }, [])


    return (
        ReactDOM.createPortal(
            <>
                {/* Black Overlay */}
                <div className={`${!data.cartModal && 'hidden'} fixed top-0 z-30 w-full h-full bg-black opacity-50`} />

                {/* Cart Modal Start */}
                <section className={`${!data.cartModal && 'hidden'} fixed z-40 inset-0 flex items-start justify-end`}>
                    <div style={{ background: "#303031" }} className="w-full md:w-5/12 lg:w-4/12 h-full flex flex-col justify-between">
                        <div className="overflow-y-auto">

                            {/* Header of Modal */}
                            <div className="border-b border-gray-700 flex justify-between">
                                <div className="p-4 text-white text-lg font-semibold">Cart</div>
                                {/* Cart Modal Close Button */}
                                <div className="p-4 text-white"
                                    onClick={() => dispatch(cartModalToggleAction(false))}>
                                    <svg
                                        className="w-6 h-6 cursor-pointer"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            {/* Header of Modal end */}


                            <div className="m-4 flex-col">

                                {/* Cart Product Start */}

                                {
                                    products && products?.length !== 0
                                    &&
                                    products.map(product => {
                                        return (
                                            <div
                                                key={product._id}
                                                className="text-white flex space-x-2 my-4 items-center">
                                                <img className="w-16 h-16 object-cover object-center"
                                                    src={product.pImages[0]}
                                                    alt={product.pName} />
                                                <div className="relative w-full flex flex-col">
                                                    <div className="my-2">{product.pName}</div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center justify-between space-x-2">
                                                            <div className="text-sm text-gray-400">
                                                                Quantity :
                                                            </div>
                                                            <div className="flex items-end">
                                                                <span className="text-sm text-gray-200">
                                                                    {qunatityFinder(product._id)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {" "}
                                                            <span className="text-sm text-gray-400">
                                                                Subtotoal :
                                                            </span>{" "}
                                                            ${subTotal(product._id, product.pPrice)}.00
                                                        </div>{" "}
                                                        {/* SUbtotal Count */}
                                                    </div>

                                                    {/* Cart Product Remove Button */}
                                                    <div
                                                        onClick={() => removeFromCartProduct(product._id)}
                                                        className="absolute top-0 right-0 text-white">
                                                        <svg
                                                            className="w-5 h-5 cursor-pointer"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                                clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                                {/* Cart Product End */}


                                {products === null ||
                                    (products?.length === 0 && (
                                        <div className="m-4 flex-col text-white text-xl text-center">
                                            <span>No Product in Cart</span>

                                        </div>
                                    ))}
                            </div>
                        </div>



                        {/* Footer buttons */}
                        <div className="m-4 space-y-4">
                            <div
                                onClick={() => {
                                    dispatch(cartModalToggleAction(false));
                                    navigate('/');
                                }}
                                className="cursor-pointer px-4 py-2 border border-gray-400 text-white text-center">
                                Continue shopping
                            </div>


                            {/* Checkout button */}
                            {data?.cartTotalCost ? (
                                <>
                                    {auth.authData.token ? (
                                        <div
                                            onClick={() => {
                                                navigate('/checkout')
                                                dispatch(cartModalToggleAction(false));
                                            }}
                                            className="px-4 py-2 bg-black text-white text-center cursor-pointer"
                                        >
                                            Checkout ${data.cartTotalCost}.00
                                        </div>
                                    ) : (
                                        <div className="px-4 py-2 text-danger text-center font-bold">
                                            Please login for checkout
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div
                                    className="px-4 py-2 bg-black text-white text-center cursor-not-allowed">
                                    Checkout
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                {/* Cart Modal End */}

            </>
            , document.getElementById('root'))
    )
}

export default CartModal;