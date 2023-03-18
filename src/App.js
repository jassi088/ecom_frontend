import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUserAction } from "./redux/slices/AuthSlice";
import { cartProductAction } from "./redux/slices/HomeSlice";
import Routers from "./routes";
import { cartListProduct } from "./shared/apiCall/cart";

const App = () => {
  const dispatch = useDispatch();
  const fetchCartProduct = async () => {
    try {
      let { data: responseData } = await cartListProduct();
      if (responseData.Products) {
        dispatch(cartProductAction(responseData.Products));
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      dispatch(authUserAction(JSON.parse(localStorage.getItem('jwt'))));
    }
  }, []);

  useEffect(() => {
    fetchCartProduct();
  }, []);

  return (
    <Routers />
  );
}

export default App;
