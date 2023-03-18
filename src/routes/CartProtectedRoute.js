import { Navigate } from "react-router-dom";
const { isAuthenticate } = require("src/shared/helpers/isAuthenticate");


const CartProtectedRoute = ({ children }) => {
    const isCheckoutUser = isAuthenticate() && localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'))?.length !== 0;
    if (!isCheckoutUser) {
        return <Navigate to='/' replace />
    }
    return children;
}

export default CartProtectedRoute;