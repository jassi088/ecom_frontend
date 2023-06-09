import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { filterOrder } from '../../../../shared/helpers/filterOrder';

const OrderMenuComponent = () => {
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch();

    const selectedFilterType = (type) => {
        filterOrder(type, dispatch, dropdown, setDropdown);
    }

    return (
        <div className='col-span-1 flex items-center'>
            <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0 w-full">


                {/* It's to open the add order modal */}
                <div style={{ background: "#303031" }} className="relative rounded-full text-gray-100 text-sm font-semibold uppercase">

                    {/* Filter button */}
                    <div onClick={() => setDropdown(!dropdown)} className="flex items-center cursor-pointer rounded-full overflow-hidden p-2 justify-center">
                        <svg
                            className="w-6 h-6 text-gray-100 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                        </svg>
                        <span className="pr-2">Filter</span>
                    </div>

                    {/* Dropdown items */}
                    <div style={{ background: "#303031" }} className={`${dropdown ? "" : "hidden"
                        } absolute top-0 left-0 mt-12 rounded-lg overflow-hidden w-full md:w-48 flex flex-col z-10`}>
                        <span
                            onClick={() => selectedFilterType('All')}
                            className="px-4 py-2 hover:bg-black text-center cursor-pointer">All</span>
                        <span
                            onClick={() => selectedFilterType('Not processed')}
                            className="px-4 py-2 hover:bg-black text-center cursor-pointer">Not processed</span>
                        <span
                            onClick={() => selectedFilterType('Processing')}
                            className="px-4 py-2 hover:bg-black text-center cursor-pointer">Processing</span>
                        <span
                            onClick={() => selectedFilterType('Shipped')}
                            className="px-4 py-2 hover:bg-black text-center cursor-pointer">Shipped</span>
                        <span
                            onClick={() => selectedFilterType('Delivered')}
                            className="px-4 py-2 hover:bg-black text-center cursor-pointer">Delivered</span>
                        <span
                            onClick={() => selectedFilterType('Cancelled')}
                            className="px-4 py-2 hover:bg-black text-center cursor-pointer">Cancelled</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderMenuComponent;