import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;


export const cartListProduct = async () => {
    let cart = JSON.parse(localStorage.getItem('cart'));

    let productArray = [];

    if (cart) {
        for (const product of cart) {
            productArray.push(product.id);
        }
    }

    return await axios.post(`${apiURL}/api/product/cart-product`, { productArray });
}