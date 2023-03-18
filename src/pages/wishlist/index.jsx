import LayoutComponent from '../../shared/components/LayoutComponent';
import ProductComponent from "./components/ProductComponent";


const WishListPage = () => {
    return (
        <LayoutComponent>
            <section className="mx-4 mt-32 md:mx-12">
                <div className="text-2xl mx-2 mb-6">
                    Wishlist
                </div>

                {/* product components */}
                <ProductComponent />
            </section>
        </LayoutComponent>
    )
}

export default WishListPage;