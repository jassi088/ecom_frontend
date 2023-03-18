import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { unWishReq } from '../../../shared/utils/wishList';
import { wishListProducts } from '../apiCall/wishList';

const ProductComponent = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [products, setproducts] = useState([]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            let { data } = await wishListProducts();
            setproducts(data.Products);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };


    const removeFromWishlist = (id) => {
        unWishReq(id);
        fetchData();
    }


    useEffect(() => {
        fetchData();
    }, []);


    if (isLoading) {
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
            // <div className='my-32 text-2xl text-center '></div>
        )
    }



    return (
        <div className="grid grid-cols-2 md:grid-cols-1">
            {
                products?.length > 0 ? (
                    products.map(product => {
                        return (
                            <div
                                key={product._id}
                                className="relative m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 col-span-1 md:flex md:items-center md:justify-between">


                                <div className="md:w-1/2 md:flex md:items-center">
                                    <img
                                        onClick={() => navigate(`/products/${product._id}`)}
                                        className="cursor-pointer md:h-20 md:w-20 object-cover object-center"
                                        src={product?.pImages[0]}
                                        alt={product.pName}
                                    />
                                    <div className="text-lg md:ml-6 truncate">{product.pName}</div>
                                </div>


                                <div className="md:w-1/2 md:flex md:items-center md:justify-around">
                                    <div className="font-semibold text-gray-600">
                                        ${product.pPrice}.00
                                    </div>
                                    {product.pQuantity > 0 ? (
                                        <div className="text-green-500 my-1 md:my-0">In Stock</div>
                                    ) : (
                                        <div className="text-red-500 my-1 md:my-0">Out Stock</div>
                                    )}

                                    <div style={{ background: "#303031" }}
                                    onClick={() => navigate(`/products/${product._id}`)}
                                        className="inline-block px-4 py-2 text-white text-xs md:text-base text-center cursor-pointer hover:opacity-75">View</div>
                                </div>



                                {/* Remove from wishlist */}
                                <div className="absolute top-0 right-0 mx-2 my-2 md:relative">
                                    <svg
                                        onClick={() => removeFromWishlist(product._id)}
                                        className="w-6 h-6 cursor-pointer"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>

                            </div>
                        )
                    })
                ) : (
                    <div className='mx-2'>No products found in wishlist.</div>
                )
            }

        </div>
    )
}

export default ProductComponent;