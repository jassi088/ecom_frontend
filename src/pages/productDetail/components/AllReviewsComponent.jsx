import { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { singleProductDetailAction } from '../../../redux/slices/HomeSlice';
import { getSingleProduct } from '../../../shared/apiCall/product';
import { postDeleteReview } from '../apiCall/Review';


const AllReviewsComponent = () => {
    const data = useSelector(state => state.home);
    const auth = useSelector(state => state.auth);
    const { pRatingsReviews } = data.singleProductDetail;
    let { id } = useParams();
    const [fData, setFData] = useState({
        success: false
    });
    const dispatch = useDispatch();

    const fetchSingleProduct = async () => {
        try {
            let { data: responseData } = await getSingleProduct(id);
            if (responseData.Product) {
                dispatch(singleProductDetailAction(responseData.Product));
            }
        }
        catch (error) { }
    }

    const deleteReview = async (reviewId, productId) => {
        // console.log(reviewId, productId);
        try {
            let { data: responseData } = await postDeleteReview({
                rId: reviewId,
                pId: productId,
            });
            if (responseData.success) {
                fetchSingleProduct();
                setFData({ success: responseData.success });
                setTimeout(() => {
                    setFData({ success: false });
                }, 2000)
            }
        }
        catch (error) { }
    };


    const alert = (msg, type) => {
        return <div className={`bg-${type}-200 px-4 py-2 my-2 rounded`}>{msg}</div>
    }


    return (
        <>
            {/* Success Message */}
            <div className="md:mx-16 lg:mx-20 xl:mx-24 flex flex-col">
                {
                    fData.success && alert(fData.success, "red")
                }
            </div>


            <div className="mt-6 mb-12 md:mx-16 lg:mx-20 xl:mx-24">
                {
                    pRatingsReviews.length > 0
                        ?
                        pRatingsReviews.map((item, index) => {
                            return (
                                <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-start" key={index}>
                                    <img
                                        className="mx-2 w-16 h-16 rounded-full"
                                        src="https://secure.gravatar.com/avatar/676d90a1574e9d3ebf98dd36f7adad60?s=60&d=mm&r=g"
                                        alt="pic"
                                    />

                                    <div className="mx-2 flex justify-between w-full">
                                        <div className="flex flex-col">
                                            <div className="flex flex-col">
                                                <span>{item.user ? item.user.name : ""}</span>
                                                <span className="text-sm text-yellow-700">
                                                    {moment(item.createdAt).format("lll")}
                                                </span>
                                            </div>
                                            <div className="leading-tight mt-3">{item.review}</div>
                                        </div>


                                        <div className='flex flex-col'>
                                            <div className="flex">
                                                {/* Star ratings */}
                                                {
                                                    [...Array(Number(item.rating))].map((value, index) => {
                                                        return (
                                                            <span key={index}>
                                                                <svg
                                                                    className="w-4 h-4 fill-current text-yellow-700"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            </span>
                                                        )
                                                    })}


                                                {/* White star */}
                                                {[...Array(5 - Number(item.rating))].map(
                                                    (value, index) => {
                                                        return (
                                                            <span key={index}>
                                                                <svg
                                                                    className="w-4 h-4 fill-current text-gray-300"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            </span>
                                                        );
                                                    }
                                                )}
                                            </div>




                                            {item.user &&
                                                auth?.authData?.token &&
                                                item.user._id === auth?.authData?.user?._id
                                                ? (
                                                    <div className="flex justify-center my-2">
                                                        <span
                                                            onClick={() => deleteReview(item._id, data.singleProductDetail._id)}
                                                            className="hover:bg-gray-300 p-2 rounded-full cursor-pointer"
                                                        >
                                                            <svg
                                                                className="w-6 h-6 text-yellow-700"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                )
                                                : (
                                                    <div></div>
                                                )}



                                        </div>

                                    </div>
                                </div>
                            )
                        })
                        :
                        (
                            <div>No Review Found</div>
                        )
                }
            </div>

        </>
    )
}

export default AllReviewsComponent;