import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { menuAction } from '../../../redux/slices/HomeSlice';
import AllReviewsComponent from './AllReviewsComponent';
import ReviewFormComponent from './ReviewFormComponent';

const ProductDetailSectionTwoComponent = () => {
    const data = useSelector(state => state.home);
    const [singleProduct, setSingleProduct] = useState({});
    const dispatch = useDispatch();



    useEffect(() => {
        setSingleProduct(data.singleProductDetail ? data.singleProductDetail : '');
    }, []);
    return (
        <section className='m-4 md:mx-12 md:my-8'>
            {/* Menu */}
            <Menu data={data} dispatch={dispatch} />
            {
                data.menu
                    ?
                    (
                        <div className='mt-6 mb-12 md:mx-16 lg:mx-20 xl:mx-24'>
                            {singleProduct.pDescription}
                        </div>
                    )
                    :
                    (
                        <RatingReview />
                    )

            }
        </section>
    )
}

export default ProductDetailSectionTwoComponent;




// Menu
const Menu = ({ data, dispatch }) => {
    return (
        <div className='flex flex-col md:flex-row items-center justify-center'>


            <div
                onClick={() => dispatch(menuAction(true))}
                className={`${data.menu && 'border-b-2 border-yellow-700 '} p-3 cursor-pointer`}>
                Description
            </div>

            <div
                onClick={() => dispatch(menuAction(false))}
                className={`${!data.menu && 'border-b-2 border-yellow-700 '} p-3 relative flex cursor-pointer`}>
                <span>Reviews</span>
                <span className='absolute text-xs top-0 right-0 mt-2 bg-yellow-700 text-white rounded px-1'>
                    {data?.singleProductDetail?.pRatingsReviews?.length}
                </span>
            </div>


        </div>
    )

}


// Ratings Reviews
const RatingReview = () => {
    const auth = useSelector(state => state.auth);
    return (
        <>
            {/* AllReviewsComponent */}
            <AllReviewsComponent />
            {
                auth.authData.token
                    ?
                    <ReviewFormComponent />
                    :
                    <div className='my-12 md:mx-16 lg:mx-20 xl:mx-24 bg-red-200 px-4 py-2 rounded'>
                        You need to Login For Reviews
                    </div>
            }
        </>

    )
}