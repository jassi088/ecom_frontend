import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { editOrder } from '../../../../shared/apiCall/order';

const UpdateOrderModal = ({ isEditOrder, setIsEditOrder, editOrderData, fetchAllOrders }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState("");
    const [oId, setOid] = useState("");

    const submitForm = async () => {
        setIsLoading(true);
        try {
            await editOrder(oId, state);
            fetchAllOrders();
            setIsEditOrder(false);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (isEditOrder) {
            setOid(editOrderData.oId);
            setState(editOrderData.status);
        }
    }, [isEditOrder]);


    return ReactDOM.createPortal(
        <>
            {/* Black Overlay */}
            <div
                className={`${!isEditOrder && "hidden"
                    } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
            />
            {/* End Black Overlay */}

            {/* Modal Start */}
            <div className={`${!isEditOrder && "hidden"
                } fixed inset-0 m-4  flex items-center z-30 justify-center`}>
                <div className="relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4  overflow-y-auto px-4 py-4 md:px-8">

                    {/* Modal header */}
                    <div className="flex items-center justify-between w-full pt-4">
                        <span className="text-left font-semibold text-2xl tracking-wider">
                            Update Order
                        </span>
                        {/* Close Modal */}
                        <span
                            onClick={() => setIsEditOrder(false)}
                            style={{ background: "#303031" }} className="cursor-pointer text-gray-100 py-2 px-2 rounded-full">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </span>
                    </div>

                    {/* Status Options */}
                    <div className="flex flex-col space-y-1 w-full">
                        <label htmlFor="status">Order Status</label>
                        <select
                            value={state}
                            name="status"
                            onChange={(e) => setState(e.target.value)}
                            className="px-4 py-2 border focus:outline-none"
                            id="status"
                        >
                            <option name="status" value="Not processed">
                                Not processed
                            </option>
                            <option name="status" value="Processing">
                                Processing
                            </option>
                            <option name="status" value="Shipped">
                                Shipped
                            </option>
                            <option name="status" value="Delivered">
                                Delivered
                            </option>
                            <option name="status" value="Cancelled">
                                Cancelled
                            </option>
                        </select>
                    </div>

                    {/* Button */}
                    <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6">
                        <button
                            style={{ background: "#303031" }}
                            onClick={() => submitForm()}
                            className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Update category"}
                        </button>
                    </div>

                </div>
            </div>
        </>

        , document.getElementById('root')
    )
}

export default UpdateOrderModal;