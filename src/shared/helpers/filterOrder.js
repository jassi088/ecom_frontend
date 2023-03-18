import { fetchOrdersAction } from "src/redux/slices/OrderSlice";
import { getAllOrders } from "../apiCall/order"


export const filterOrder = async (type, dispatch, dropdown, setDropdown) => {
    let { data: responseData } = await getAllOrders();

    if (responseData && responseData.Orders) {
        let newData;
        if (type === 'All') {
            dispatch(fetchOrdersAction(responseData.Orders))
            setDropdown(false);
        } else if (type === 'Not processed') {
            newData = responseData.Orders.filter(item => item.status === 'Not processed');
            dispatch(fetchOrdersAction(newData));
            setDropdown(false);
        } else if (type === 'Processing') {
            newData = responseData.Orders.filter(item => item.status === 'Processing');
            dispatch(fetchOrdersAction(newData));
            setDropdown(false);
        } else if (type === 'Shipped') {
            newData = responseData.Orders.filter(item => item.status === 'Shipped');
            dispatch(fetchOrdersAction(newData));
            setDropdown(false);
        } else if (type === 'Delivered') {
            newData = responseData.Orders.filter(item => item.status === 'Delivered');
            dispatch(fetchOrdersAction(newData));
            setDropdown(false);
        } else if (type === 'Cancelled') {
            newData = responseData.Orders.filter(item => item.status === 'Cancelled');
            dispatch(fetchOrdersAction(newData));
            setDropdown(false);
        }
    }

}