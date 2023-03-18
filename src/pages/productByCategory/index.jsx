import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LayoutComponent from "src/shared/components/LayoutComponent";
import { productByCategory } from "./apiCall/productByCategory";
import AllProductComponent from "./components/AllProductComponent";

const ProductByCategoryPage = () => {
    const { catId } = useParams();
    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        try {
            let { data: responseData } = await productByCategory(catId);
            if (responseData && responseData) {
                setProducts(responseData.Products);
            }
            // console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (catId) {
            fetchData();
        }
    }, [catId]);
    
    return (
        <LayoutComponent>
            <AllProductComponent products={products} />
        </LayoutComponent>
    )

};

export default ProductByCategoryPage;