import { cartTotalCostAction, inCartAction } from "src/redux/slices/HomeSlice";

export const updateQuantity = (type, totalQuantity, quantity, setQuantity, setAlertq) => {
    if (type === 'increase') {
        if (quantity === totalQuantity) {
            setQuantity(totalQuantity)
        } else {
            setQuantity(quantity + 1);
        }
    } else if (type === 'decrease') {
        if (quantity === 1) {
            setQuantity(1);
            setAlertq(false);
        } else {
            setQuantity(quantity - 1);
        }
    }
}


export const cartListId = () => {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    let list = [];

    if (cart.length > 0) {
        for (let item of cart) {
            list.push(item.id);
        }
        return list;
    } else {
        return list = null;
    }
}

// console.log(cartListId());

export const addToCart = (id, quantity, price, dispatch, setQuantity, setAlertq, fetchSingleProduct, totalCost) => {
    let isObj = false;
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    if (cart.length) {
        cart.forEach(item => {
            if (item.id === id) {
                isObj = true;
            }
        });
        if (!isObj) {
            cart.push({ id, quantity, price });
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    } else {
        cart.push({ id, quantity, price });
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    dispatch(inCartAction(cartListId()))
    dispatch(cartTotalCostAction(totalCost()))
    setQuantity(1);
    setAlertq(false);
    fetchSingleProduct();
}