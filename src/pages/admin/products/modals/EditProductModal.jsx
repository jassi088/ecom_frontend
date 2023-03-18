import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getAllCategory } from 'src/shared/apiCall/category';
import { editProduct } from 'src/shared/apiCall/product';

const EditProductModal = ({ isEditProduct, setIsEditProduct, editProductData, fetchProducts }) => {

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editFormdata, setEditFormdata] = useState({
        pId: '',
        pName: '',
        pDescription: '',
        pStatus: '',
        pImages: null,
        pEditImages: null,
        pCategory: '',
        pPrice: '',
        pOffer: '',
        pQuantity: '',
        success: false,
        error: false,
    });

    const fetchCategories = async () => {
        try {
            let { data: responseData } = await getAllCategory();
            if (responseData.Categories) {
                setCategories(responseData.Categories);
            }
        } catch (error) { }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let { data: responseData } = await editProduct(editFormdata);
            // console.log(responseData);
            if (responseData.error) {
                setEditFormdata({
                    ...editFormdata,
                    error: responseData.error
                })
            } else if (responseData.success) {
                setEditFormdata({
                    ...editFormdata,
                    success: responseData.success,
                });
                setTimeout(() => {
                    setEditFormdata({
                        ...editFormdata,
                        success: false,
                    });
                    fetchProducts();
                    setIsEditProduct(false);
                }, 1000);
            }
        } catch (error) { }
        finally {
            setIsLoading(false);
        }
    };

    const alert = (msg, type) => {
        return (
            <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
        )
    }

    useEffect(() => {
        fetchCategories();
    }, []);


    useEffect(() => {
        if (isEditProduct) {
            setEditFormdata({
                pId: editProductData.pId,
                pName: editProductData.pName,
                pDescription: editProductData.pDescription,
                pStatus: editProductData.pStatus,
                pImages: editProductData.pImages,
                // pEditImages: null,
                pCategory: editProductData.pCategory,
                pPrice: editProductData.pPrice,
                pOffer: editProductData.pOffer,
                pQuantity: editProductData.pQuantity,
                // success: false,
                // error: false,
            })
        }
    }, [isEditProduct]);


    return ReactDOM.createPortal(
        <>
            {/* Black overlay */}
            <div className={`${!isEditProduct && "hidden"} fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`} />
            {/* End black overlay */}

            {/* Modal start */}
            <div className={`${!isEditProduct && "hidden"} fixed inset-0 flex items-center justify-center z-30 overflow-auto`}>
                <div style={{ height: "90vh" }}
                    className=" overflow-auto mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
                    {/* Header of modal */}
                    <div className="flex items-center justify-between w-full pt-4">
                        {/* Title of the modal */}
                        <span className="text-left font-semibold text-2xl tracking-wider">
                            Edit Product
                        </span>
                        {/* Close Modal */}
                        <span
                            style={{ background: "#303031" }}
                            className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
                            onClick={() => setIsEditProduct(false)}
                        >
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
                    <form className="w-full" onSubmit={onSubmit}>

                        <div className="flex space-x-1 py-4">
                            {/* Name */}
                            <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                                <label htmlFor="name">Product Name *</label>
                                <input
                                    value={editFormdata.pName}
                                    onChange={e => setEditFormdata({
                                        ...editFormdata,
                                        error: false,
                                        success: false,
                                        pName: e.target.value
                                    })}
                                    className="px-4 py-2 border focus:outline-none"
                                    type="text"
                                />
                            </div>

                            {/* Price */}
                            <div className="w-1/2 flex flex-col space-y-1 space-x-1">
                                <label htmlFor="price">Product Price *</label>
                                <input
                                    value={editFormdata.pPrice}
                                    onChange={e => setEditFormdata({
                                        ...editFormdata,
                                        error: false,
                                        success: false,
                                        pPrice: e.target.value
                                    })}
                                    type="number"
                                    className="px-4 py-2 border focus:outline-none"
                                    id="price"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="description">Product Description *</label>
                            <textarea
                                value={editFormdata.pDescription}
                                onChange={e => setEditFormdata({
                                    ...editFormdata,
                                    error: false,
                                    success: false,
                                    pDescription: e.target.value
                                })}
                                className="px-4 py-2 border focus:outline-none"
                                name="description"
                                id="description"
                                cols={5}
                                rows={2}
                            />
                        </div>

                        {/* Most Important part for uploading multiple image */}
                        <div className="flex flex-col mt-4">
                            <label htmlFor="image">Product Images *</label>
                            {
                                editFormdata.pImages && (
                                    <div className='flex'>
                                        {
                                            editFormdata.pImages.map((image, i) => {
                                                return <img
                                                    className='h-16 w-16 object-cover'
                                                    key={i}
                                                    src={image}
                                                    alt="product_image"
                                                />
                                            })
                                        }
                                    </div>
                                )
                            }
                            <span className="text-gray-600 text-xs">Must need 2 images</span>
                            <input
                                onChange={e => setEditFormdata({
                                    ...editFormdata,
                                    error: false,
                                    success: false,
                                    pEditImages: [...e.target.files]
                                })}
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                className="px-4 py-2 border focus:outline-none"
                                id="image"
                                multiple
                            />
                        </div>
                        {/* Most Important part for uploading multiple image */}


                        <div className="flex space-x-1 py-4">

                            {/* Status */}
                            <div className="w-1/2 flex flex-col space-y-1">
                                <label htmlFor="status">Product Status *</label>
                                <select
                                    value={editFormdata.pStatus}
                                    onChange={e => setEditFormdata({
                                        ...editFormdata,
                                        error: false,
                                        success: false,
                                        pStatus: e.target.value
                                    })}
                                    name="status"
                                    className="px-4 py-2 border focus:outline-none"
                                    id="status"
                                >
                                    <option name="status" value="Active">
                                        Active
                                    </option>
                                    <option name="status" value="Disabled">
                                        Disabled
                                    </option>
                                </select>
                            </div>

                            {/* Category */}
                            <div className="w-1/2 flex flex-col space-y-1">
                                <label htmlFor="Category">Product Category *</label>
                                <select
                                    value={editFormdata?.pCategory?._id}
                                    onChange={e => {
                                        let matchCat = categories.find(c => c._id === e.target.value);
                                        let _id = matchCat._id;
                                        let cName = matchCat.cName;
                                        setEditFormdata({
                                            ...editFormdata,
                                            error: false,
                                            success: false,
                                            pCategory: { _id, cName },
                                        }
                                        )
                                    }}
                                    name="Category"
                                    className="px-4 py-2 border focus:outline-none"
                                    id="Category">
                                    <option disabled value="">
                                        Select a category
                                    </option>
                                    {
                                        categories && categories.length > 0 && categories.map(c => <option key={c._id} value={c._id}>
                                            {c.cName}
                                        </option>)
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="flex space-x-1 py-4">

                            {/* Stock */}
                            <div className="w-1/2 flex flex-col space-y-1">
                                <label htmlFor="quantity">Product in Stock *</label>
                                <input
                                    value={editFormdata.pQuantity}
                                    onChange={e => setEditFormdata({
                                        ...editFormdata,
                                        error: false,
                                        success: false,
                                        pQuantity: e.target.value
                                    })}
                                    type="number"
                                    className="px-4 py-2 border focus:outline-none"
                                    id="quantity"
                                />
                            </div>

                            {/* Offer */}
                            <div className="w-1/2 flex flex-col space-y-1">
                                <label htmlFor="offer">Product Offer (%) *</label>
                                <input
                                    value={editFormdata.pOffer}
                                    onChange={e => setEditFormdata({
                                        ...editFormdata,
                                        error: false,
                                        success: false,
                                        pOffer: e.target.value
                                    })}
                                    type="number"
                                    className="px-4 py-2 border focus:outline-none"
                                    id="offer"
                                />
                            </div>

                        </div>

                        {
                            editFormdata.error && alert(editFormdata.error, "red")
                        }
                        {
                            editFormdata.success && alert(editFormdata.success, "green")
                        }

                        {/* update button */}
                        <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
                            <button
                                style={{ background: "#303031" }}
                                type="submit"
                                className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
                                disabled={isLoading}
                            >
                                {
                                    isLoading ? 'Loading...' : "Update product"
                                }
                            </button>
                        </div>

                    </form>

                </div>
            </div >
        </>,
        document.getElementById("root")
    );
};

export default EditProductModal;