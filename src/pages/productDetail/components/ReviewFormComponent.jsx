import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { singleProductDetailAction } from "../../../redux/slices/HomeSlice";
import { getSingleProduct } from "../../../shared/apiCall/product";
import { postAddReview } from "../apiCall/Review";
import '../styles/styles.css';


const ReviewFormComponent = () => {
    const data = useSelector(state => state.home);
    const auth = useSelector(state => state.auth);
    let { id } = useParams();

    const [fData, setFData] = useState({
        rating: '',
        review: '',
        error: false,
        success: false,
        pId: id
    });

    const dispatch = useDispatch();


    const ratingUserList = data.singleProductDetail.pRatingsReviews.map((item) => {
        return (
            item.user ?
                item.user._id :
                ""
        )
    });

    const reviewSubmitHandler = () => {
        // console.log(fData);
        if (!fData.rating || !fData.review) {
            setFData({
                ...fData, error: "Rating and Review must be required"
            })
            setTimeout(() => {
                setFData({
                    ...fData, error: false
                })
            }, 2000)
        } else if (!auth.authData.token) {
            setFData({
                ...fData, error: "You must be login to post a review"
            })
            setTimeout(() => {
                setFData({
                    ...fData, error: false
                })
            }, 2000)
        } else {
            // Add Review
            addReview();
        }
    }

    const fetchSingleProduct = async () => {
        try {
            let { data: responseData } = await getSingleProduct(id);
            if (responseData.Product) {
                dispatch(singleProductDetailAction(responseData.Product));
            }
        }
        catch (error) { }
    }

    const alert = (msg, type) => {
        return <div className={`bg-${type}-200 px-4 py-2 my-2 rounded`}>{msg}</div>
    }


    const addReview = async () => {
        let formData = {
            rating: fData.rating,
            review: fData.review,
            pId: fData.pId,
            uId: auth.authData.user._id
        }

        try {
            let { data: responseData } = await postAddReview(formData);
            if (responseData.success) {
                setFData({
                    ...fData,
                    success: responseData.success,
                    review: '',
                    rating: '',
                });
                fetchSingleProduct();
            } else if (responseData.error) {
                setFData({
                    ...fData,
                    error: responseData.error,
                    review: '',
                    rating: '',
                })
            }
        } catch (error) {

        }
    }


    return (
        <>
            <div className="md:mx-16 lg:mx-20 xl:mx-24 flex flex-col">
                {/* Sucess Message */}
                {/* Error Message */}
                {
                    fData.error && alert(fData.error, "red")
                }
            </div>

            {
                ratingUserList.length > 0
                    && ratingUserList.includes(auth.authData.user._id)
                    ? <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24"></div>
                    : (
                        <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24 flex flex-col">
                            <div className="flex flex-col space-y-2">
                                <span className="text-2xl font-medium">Add a review</span>
                                <span className="text-gray-600 text-sm">
                                    Your email address will not be published. Required fields are
                                    marked *
                                </span>
                            </div>



                            {/* Input rating */}

                            <div className="mb-4">
                                <fieldset
                                    onChange={e => setFData({
                                        ...fData,
                                        rating: e.target.defaultValue
                                    })}

                                    className="rating">
                                    <input
                                        type="radio"
                                        className="rating"
                                        id="star5"
                                        name="rating"
                                        defaultValue={5}
                                    />
                                    <label
                                        className="full"
                                        htmlFor="star5"
                                        title="Awesome - 5 stars"
                                    />
                                    <input
                                        type="radio"
                                        className="rating"
                                        id="star4"
                                        name="rating"
                                        defaultValue={4}
                                    />
                                    <label
                                        className="full"
                                        htmlFor="star4"
                                        title="Pretty good - 4 stars"
                                    />
                                    <input
                                        type="radio"
                                        className="rating"
                                        id="star3"
                                        name="rating"
                                        defaultValue={3}
                                    />
                                    <label className="full" htmlFor="star3" title="Meh - 3 stars" />
                                    <input
                                        type="radio"
                                        className="rating"
                                        id="star2"
                                        name="rating"
                                        defaultValue={2}
                                    />
                                    <label
                                        className="full"
                                        htmlFor="star2"
                                        title="Kinda bad - 2 stars"
                                    />
                                    <input
                                        type="radio"
                                        className="rating"
                                        id="star1"
                                        name="rating"
                                        defaultValue={1}
                                    />
                                    <label
                                        className="full"
                                        htmlFor="star1"
                                        title="Sucks big time - 1 star"
                                    />
                                </fieldset>
                            </div>


                            {/* Review Form */}

                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <label htmlFor="textArea">
                                        Review <span className="text-sm text-gray-600">*</span>
                                    </label>
                                    <textarea
                                        onChange={(e) => setFData({
                                            ...fData,
                                            review: e.target.value
                                        })}
                                        value={fData.review}
                                        className="border px-4 py-2 focus:outline-none"
                                        name="textArea"
                                        id="textArea"
                                        cols={30}
                                        rows={3}
                                        placeholder="Your review..."
                                    />
                                </div>
                                <div
                                    onClick={reviewSubmitHandler}
                                    style={{ background: "#303031" }}
                                    className="inline-block rounded px-4 py-2 text-white text-center cursor-pointer"
                                >
                                    Submit
                                </div>
                            </div>


                        </div>
                    )}
        </>
    )
}

export default ReviewFormComponent;