import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAction } from 'src/redux/slices/ProductSlice';
import { deleteProduct, getAllProducts } from 'src/shared/apiCall/product';
import EditProductModal from '../modals/EditProductModal';
import ProductTableComponent from './ProductTableComponent';


const AllProductComponent = () => {

    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.product.allProducts);

    const [isLoading, setIsLoading] = useState();
    const [isEditProduct, setIsEditProduct] = useState(false);
    const [editProductData, setEditProductData] = useState({});

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            let { data: responseData } = await getAllProducts();
            // console.log(responseData.Products);
            if (responseData && responseData.Products) {
                dispatch(fetchProductsAction(responseData.Products));
            }
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    const deleteProductReq = async (pId) => {
        try {
            await deleteProduct(pId);
            fetchProducts();
        } catch (error) {
            console.log(error);
        }
    }

    const editProduct = (pId, product, type) => {
        // console.log(pId, product, type);
        setEditProductData({
            pId,
            type,
            ...product
        })
    }

    useEffect(() => {
        fetchProducts()
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
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
            <div className='col-span-1 overflow-auto bg-white shadow-lg p-4'>
                <table className='table-auto border w-full my-2'>
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Product</th>
                            <th className="px-4 py-2 border">Price</th>
                            <th className="px-4 py-2 border">Description</th>
                            <th className="px-4 py-2 border">Image</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Stock</th>
                            <th className="px-4 py-2 border">Category</th>
                            <th className="px-4 py-2 border">Offer</th>
                            <th className="px-4 py-2 border">Created at</th>
                            <th className="px-4 py-2 border">Updated at</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts && allProducts.length > 0 ? (
                            allProducts.map((item, key) => {
                                return (
                                    <ProductTableComponent
                                        product={item}
                                        key={key}
                                        deleteProduct={deleteProductReq}
                                        editProduct={editProduct}
                                        setIsEditProduct={setIsEditProduct}
                                    />
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan="10"
                                    className="text-xl text-center font-semibold py-8"
                                >
                                    No product found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="text-sm text-gray-600 mt-2">
                    Total {
                        allProducts && allProducts.length
                    } product{
                        allProducts.length > 1 ? "s" : ""
                    } found
                </div>
            </div>

            {/* Edit product */}
            <EditProductModal
                isEditProduct={isEditProduct}
                setIsEditProduct={setIsEditProduct}
                editProductData={editProductData}
                fetchProducts={fetchProducts}
            />

        </>
    )
}

export default AllProductComponent;