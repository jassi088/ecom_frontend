import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;


export const getAllOrders = async () => {
    return await axios.get(`${apiURL}/api/order/get-all-orders`);
}

export const deleteOrder = async (id) => {
    return await axios.post(`${apiURL}/api/order/delete-order`, { oId: id });
}

export const editOrder = async (oId, status) => {
    return await axios.post(`${apiURL}/api/order/update-order`, { oId, status });
}