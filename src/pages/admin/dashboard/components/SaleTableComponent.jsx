import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from 'src/shared/apiCall/order';
import TodayOrderTableComponent from './TodayOrderTableComponent';

const SaleTableComponent = () => {
    const navigate = useNavigate();
    const [totalOrder, setTotalOrder] = useState([]);

    const fetchAllOrders = async () => {
        try {
            let { data } = await getAllOrders();
            // console.log(data);
            setTotalOrder(data.Orders);
        } catch (error) {
            console.log(error);
        }
    }


    const ordersList = () => {
        let newList = [];
        if (totalOrder.length > 0) {
            totalOrder.forEach(order => {
                if (moment(order.createdAt).format('LL') === moment().format('LL')) {
                    newList = [...newList, order];
                }
            });
        }
        return newList;
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <>
            <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
                <div className="text-2xl font-semibold mb-6 text-center">
                    Today's Orders : {totalOrder.length > 0 ? ordersList().length : 0}
                </div>
                <table className="table-auto border w-full my-2 text-center">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Products</th>
                            <th className="px-4 py-2 border">Image</th>
                            <th className="px-4 py-2 border">Status</th>
                            <th className="px-4 py-2 border">Order Address</th>
                            <th className="px-4 py-2 border">Ordered at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {totalOrder.length > 0 ? (
                            ordersList().map((order) => {
                                return (
                                    <TodayOrderTableComponent
                                        key={order._id}
                                        order={order}
                                    />
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-xl text-center font-semibold py-8">No Orders found today</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="text-sm text-gray-600 mt-2">
                    Total {totalOrder.length > 0 ? ordersList().length : 0} {ordersList().length > 1 ? "Orders" : "Order"} found
                </div>
                <div className="flex justify-center">
                    <span
                        onClick={e => navigate("/admin/dashboard/orders")}
                        style={{ background: "#303031" }}
                        className="cursor-pointer px-4 py-2 text-white rounded-full"
                    >
                        View All
                    </span>
                </div>
            </div>
        </>
    )
}

export default SaleTableComponent;