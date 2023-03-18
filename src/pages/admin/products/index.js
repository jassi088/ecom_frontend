import AdminLayoutComponent from "src/shared/components/AdminLayoutComponent";
import AllProductComponent from "./components/AllProductComponent";
import ProductMenuComponent from "./components/ProductMenuComponent";

const ProductPage = () => {
    return (
        <AdminLayoutComponent>
            <div className="grid grid-col-1 space-y-4 p-4">
                {/* Add Product */}
                <ProductMenuComponent />
                {/* All Products */}
                <AllProductComponent />

            </div>
        </AdminLayoutComponent>
    )

};

export default ProductPage;