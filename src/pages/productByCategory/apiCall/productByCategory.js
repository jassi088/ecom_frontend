import axios from "axios";
// import Headers from "../helpers/requestHeaders";

const apiURL = process.env.REACT_APP_API_URL;


export const productByCategory = async (catId) => {
    return await axios.post(`${apiURL}/api/product/product-by-category`, {catId});
}