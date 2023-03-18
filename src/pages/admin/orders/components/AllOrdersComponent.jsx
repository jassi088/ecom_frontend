import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersAction } from "src/redux/slices/OrderSlice";
import { deleteOrder, getAllOrders } from "src/shared/apiCall/order";
import UpdateOrderModal from "../modals/UpdateOrderModal";
import OrderTableComponent from "./OrderTableComponent";

const AllOrdersComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditOrder, setIsEditOrder] = useState(false);
    const [editOrderData, setEditOrderData] = useState({});
    const allOrders = useSelector(state => state.order.allOrders);
    const dispatch = useDispatch();


    const fetchAllOrders = async () => {
        try {
            setIsLoading(true);
            let { data } = await getAllOrders();
            dispatch(fetchOrdersAction(data.Orders));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    // Delete Order
    const deleteOrderReq = async (id) => {
        try {
            setIsLoading(true);
            await deleteOrder(id);
            fetchAllOrders();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    // Edit Order
    const editOrderReq = (oId, type, status) => {
        setEditOrderData({ oId, type, status });
        setIsEditOrder(true);
    };

    useEffect(() => {
        fetchAllOrders();
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
        <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
            <table className="table-auto border w-full my-2 text-center">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">Products</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Total</th>
                        <th className="px-4 py-2 border">Transaction Id</th>
                        <th className="px-4 py-2 border">Customer</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Phone</th>
                        <th className="px-4 py-2 border">Address</th>
                        <th className="px-4 py-2 border">Created at</th>
                        <th className="px-4 py-2 border">Updated at</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>

                {/* Body */}
                <tbody>
                    {
                        allOrders && allOrders.length > 0
                            ?
                            (
                                allOrders.map(order => {
                                    return (
                                        <OrderTableComponent
                                            order={order}
                                            key={order._id}
                                            deleteOrderReq={deleteOrderReq}
                                            editOrderReq={editOrderReq}
                                        />
                                    );
                                })
                            )
                            :
                            (
                                <tr>
                                    <td colSpan="12" className="text-xl text-center font-semibold py-8">No order found</td>
                                </tr>
                            )
                    }
                </tbody>

            </table>


            <div className="text-sm text-gray-600 mt-2">
                Total {allOrders && allOrders.length} {allOrders.length > 1 ? 'Orders' : 'Order'} found
            </div>


            {/* Update Order Modal  */}
            <UpdateOrderModal
                isEditOrder={isEditOrder}
                setIsEditOrder={setIsEditOrder}
                editOrderData={editOrderData}
                fetchAllOrders={fetchAllOrders}
            />

        </div>
    )
}

export default AllOrdersComponent