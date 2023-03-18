import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../../redux/slices/CategorySlice';
import { deleteCategory, getAllCategory } from '../../../../shared/apiCall/category';
import EditCategoryModal from '../modals/EditCategoryModal';
import CategoryTableComponent from './CategoryTableComponent';

const AllCategoriesComponent = () => {

    const dispatch = useDispatch();
    const allCategories = useSelector(state => state.category.allCategories);

    const [isLoading, setIsLoading] = useState(false);
    const [isEditCategory, setIsEditCategory] = useState(false);
    const [editCategory, setEditCategory] = useState({});

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            let { data: responseData } = await getAllCategory();
            // console.log(responseData);
            if (responseData && responseData.Categories) {
                dispatch(getCategories(responseData.Categories));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };


    const deleteCategoryReq = async (cId) => {
        try {
            let { data } = await deleteCategory(cId);
            if (data.success) {
                fetchCategories();
            }
        } catch (error) {
            console.log(error);
        }
    };



    const editCategoryReq = (cId, type, des, status) => {
        // console.log(cId,type,des,status);
        setEditCategory({
            cId,
            type,
            des,
            status,
        });
        setIsEditCategory(true);
    }



    useEffect(() => {
        fetchCategories();
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
        );
    }


    return (
        <>
            <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
                <table className="table-auto border w-full my-2">
                    <thead className='text-center'>
                        <tr>
                            <th className="px-4 py-2 border">Category</th>
                            <th className="px-4 py-2 border">Description</th>
                            <th className="px-4 py-2 border">Image</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Created at</th>
                            <th className="px-4 py-2 border">Updated at</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allCategories && allCategories.length > 0 ? (
                            allCategories.map((item, key) => {
                                return (
                                    <CategoryTableComponent
                                        category={item}
                                        key={key}
                                        deleteCategoryReq={deleteCategoryReq}
                                        editCategoryReq={editCategoryReq}
                                    />
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-xl text-center font-semibold py-8"
                                >
                                    No category found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="text-sm text-gray-600 mt-2">
                    Total {allCategories && allCategories.length} category found
                </div>
            </div>

            {/* Edit modal  */}
            <EditCategoryModal
                isEditCategory={isEditCategory}
                setIsEditCategory={setIsEditCategory}
                editCategory={editCategory}
                fetchCategories={fetchCategories}
            />
        </>
    )
}

export default AllCategoriesComponent;