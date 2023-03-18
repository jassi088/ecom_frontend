import axios from "axios";
// import Headers from "../helpers/requestHeaders";

const apiURL = process.env.REACT_APP_API_URL;

export const postAddReview = async (data) => {
    return await axios.post(`${apiURL}/api/product/add-review`, data);
}
export const postDeleteReview = async (data) => {
    return await axios.post(`${apiURL}/api/product/delete-review`, data);
}
