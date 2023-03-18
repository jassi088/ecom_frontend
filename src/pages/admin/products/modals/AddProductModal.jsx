import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { fetchProductsAction } from '../../../../redux/slices/ProductSlice';
import { getAllCategory } from '../../../../shared/apiCall/category';
import { createProduct, getAllProducts } from '../../../../shared/apiCall/product';



const AddProductModal = ({ isAddProductModal, setIsAddProductModal }) => {

    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [fData, setFData] = useState({
        pName: '',
        pDescription: '',
        pStatus: 'Active',
        pImage: null,
        pCategory: '',
        pPrice: '',
        pOffer: 0,
        pQuantity: '',
        success: false,
        error: false,
    });


    const alert = (msg, type) => {
        return <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
    }

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


    const submitForm = async (e) => {
        e.preventDefault();
        if (!fData.pImage) {
            setFData({
                ...fData,
                error: "Please upload at least 2 images"
            });
            setTimeout(() => {
                setFData({
                    ...fData,
                    error: false,
                });
            }, 2000);
            return;
        }

        setIsLoading(true);
        try {
            let { data: responseData } = await createProduct(fData);
            // console.log(responseData);
            if (responseData.success) {
                fetchProducts();
                setFData({
                    pName: '',
                    pDescription: '',
                    pStatus: 'Active',
                    pImage: null,
                    pCategory: '',
                    pPrice: '',
                    pOffer: 0,
                    pQuantity: '',
                    success: responseData.success,
                    error: false,
                });
                setTimeout(() => {
                    setFData({
                        ...fData,
                        pName: "",
                        pDescription: "",
                        pImage: "",
                        pStatus: "Active",
                        pCategory: "",
                        pPrice: "",
                        pQuantity: "",
                        pOffer: 0,
                        success: false,
                        error: false,
                    });
                }, 2000);
            }

            else if (responseData.error) {
                setFData({
                    ...fData,
                    success: false,
                    error: responseData.error
                });
            }
        }
        catch (error) { }
        finally {
            setIsLoading(false);
        }




    };

    const fetchCategory = async () => {
        try {
            let { data: responseData } = await getAllCategory();
            if (responseData.Categories) {
                setCategories(responseData.Categories);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchCategory();
    }, []);


    return (
        ReactDOM.createPortal(
            <>
                {/* Black Overlay */}
                <div className={`${!isAddProductModal && "hidden"} fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`} />
                {/* End Black Overlay */}

                {/* Modal Start */}
                <div className={`${!isAddProductModal && "hidden"} fixed inset-0 flex items-center justify-center z-30 overflow-auto`}>
                    <div style={{ height: '90vh' }}
                        className="overflow-auto mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
                        <div className='flex items-center justify-between w-full p-4'>
                            <span className='text-left font-semibold text-2xl tracking-wider'>
                                Add Product
                            </span>
                            {/* Close Modal ICON */}
                            <span className='cursor-pointer text-gray-100 py-2 px-2 rounded-full'
                                style={{ background: "#303031" }}
                                onClick={() => setIsAddProductModal(false)}>
                                <svg
                                    className="w-6 h-6"
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
                            </span>
                        </div>

                        {/* FORM */}



                        <form className="w-full" onSubmit={submitForm}>

                            <div className="flex space-x-1 py-4">

                                {/* Product Name */}
                                <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                                    <label htmlFor="name">Product Name *</label>
                                    <input
                                        className="px-4 py-2 border focus:outline-none"
                                        type="text"
                                        value={fData.pName}
                                        onChange={(e) => setFData({
                                            ...fData,
                                            error: false,
                                            success: false,
                                            pName: e.target.value
                                        })}
                                    />
                                </div>

                                {/* Product Price */}
                                <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                                    <label htmlFor="price">Product Price *</label>
                                    <input
                                        type="number"
                                        className="px-4 py-2 border focus:outline-none"
                                        id="price"
                                        value={fData.pPrice}
                                        onChange={(e) => setFData({
                                            ...fData,
                                            error: false,
                                            success: false,
                                            pPrice: e.target.value
                                        })}
                                    />
                                </div>

                            </div>

                            {/* Product Description */}
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="description">Product Description *</label>
                                <textarea
                                    className="px-4 py-2 border focus:outline-none"
                                    name="description"
                                    id="description"
                                    cols={5}
                                    rows={2}
                                    value={fData.pDescription}
                                    onChange={(e) => setFData({
                                        ...fData,
                                        error: false,
                                        success: false,
                                        pDescription: e.target.value,
                                    })}
                                />
                            </div>

                            {/* Most Important part for uploading multiple image */}
                            <div className="flex flex-col mt-4">
                                <label htmlFor="image">Product Images *</label>
                                <span className="text-gray-600 text-xs">Must need 2 images</span>
                                <input
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    className="px-4 py-2 border focus:outline-none"
                                    id="image"
                                    multiple
                                    onChange={(e) => setFData({
                                        ...fData,
                                        error: false,
                                        success: false,
                                        pImage: [...e.target.files]
                                    })}
                                />
                            </div>
                            {/* Most Important part for uploading multiple image */}


                            <div className="flex space-x-1 py-4">

                                {/* Product Status */}
                                <div className="w-1/2 flex flex-col space-y-1">
                                    <label htmlFor="status">Product Status *</label>
                                    <select
                                        name="status"
                                        className="px-4 py-2 border focus:outline-none"
                                        id="status"
                                        value={fData.pStatus}
                                        onChange={(e) => setFData({
                                            ...fData,
                                            error: false,
                                            success: false,
                                            pStatus: e.target.value
                                        })}
                                    >
                                        <option name="status" value="Active">
                                            Active
                                        </option>
                                        <option name="status" value="Disabled">
                                            Disabled
                                        </option>
                                    </select>
                                </div>

                                {/* Product Category */}
                                <div className="w-1/2 flex flex-col space-y-1">
                                    <label htmlFor="category">Product Category *</label>
                                    <select
                                        name="caetgory"
                                        className="px-4 py-2 border focus:outline-none"
                                        id="category"
                                        value={fData.pCategory}
                                        onChange={(e) => setFData({
                                            ...fData,
                                            error: false,
                                            success: false,
                                            pCategory: e.target.value
                                        })}>
                                        <option disabled value="">
                                            Select a category
                                        </option>
                                        {
                                            categories.length > 0 && categories.map(c => {
                                                return <option
                                                    key={c._id} value={c._id}>
                                                    {c.cName}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>

                            </div>

                            <div className="flex space-x-1 py-4">

                                {/* Product Stock */}
                                <div className="w-1/2 flex flex-col space-y-1">
                                    <label htmlFor="quantity">Product in Stock *</label>
                                    <input
                                        type="number"
                                        className="px-4 py-2 border focus:outline-none"
                                        id="quantity"
                                        value={fData.pQuantity}
                                        onChange={(e) => setFData({
                                            ...fData,
                                            error: false,
                                            success: false,
                                            pQuantity: e.target.value
                                        })}
                                    />
                                </div>

                                {/* Product Offer */}
                                <div className="w-1/2 flex flex-col space-y-1">
                                    <label htmlFor="offer">Product Offfer (%) *</label>
                                    <input
                                        type="number"
                                        className="px-4 py-2 border focus:outline-none"
                                        id="offer"
                                        value={fData.pOffer}
                                        onChange={(e) => setFData({
                                            ...fData,
                                            error: false,
                                            success: false,
                                            pOffer: e.target.value
                                        })}
                                    />
                                </div>

                            </div>

                            {/* form errors */}
                            {
                                fData.error && alert(fData.error, "red")
                            }

                            {/* form success */}
                            {
                                fData.success && alert(fData.success, "green")
                            }

                            {/* Submit Form button */}
                            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
                                <button
                                    style={{ background: "#303031" }}
                                    type="submit"
                                    className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "loading..." : "Create product"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </>,
            document.getElementById('root')
        )
    )
}

export default AddProductModal;