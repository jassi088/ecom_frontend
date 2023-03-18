import { useEffect, useState } from "react";
import UserLayoutComponent from "../../../shared/components/UserLayoutComponent";
import { getOrderByUser } from "./apiCall/order";
import TableBodyComponent from "./components/TableBodyComponent";

const UserOrderPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    const fetchOrdersByUser = async () => {
        setIsLoading(true);
        let userId = JSON.parse(localStorage.getItem('jwt'))?.user?._id;
        if (userId) {
            try {
                let { data } = await getOrderByUser(userId);
                // console.log(data)
                setOrders(data.Order);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        fetchOrdersByUser();
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
        <UserLayoutComponent>
            <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
                <div className="border">

                    {/* Heading */}
                    <div className="py-4 px-4 text-lg font-semibold border-t-2 border-yellow-700">Orders</div>

                    <hr />

                    {/* Table */}
                    <div className="overflow-auto bg-white shadow-lg p-4">
                        <table className="table-auto border w-full my-2 text-center">
                            {/* table head */}
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border">Products</th>
                                    <th className="px-4 py-2 border">Status</th>
                                    <th className="px-4 py-2 border">Total</th>
                                    <th className="px-4 py-2 border">Phone</th>
                                    <th className="px-4 py-2 border">Address</th>
                                    <th className="px-4 py-2 border">Transaction Id</th>
                                    <th className="px-4 py-2 border">Checkout</th>
                                    <th className="px-4 py-2 border">Processing</th>
                                </tr>
                            </thead>

                            {/* Table body */}
                            <tbody>
                                {orders && orders.length > 0 ? (
                                    orders.map((item, i) => {
                                        return (
                                            <TableBodyComponent
                                                order={item}
                                                key={i}
                                            />
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-xl text-center font-semibold py-8">No Order found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>


                        {/* Total Orders by user */}
                        <div className="text-sm text-gray-600 mt-2">
                            Total {orders && orders.length} {orders.length > 1 ? "Orders" : "Order"} found
                        </div>

                    </div>

                </div>
            </div>
        </UserLayoutComponent>
    )
}

export default UserOrderPage;