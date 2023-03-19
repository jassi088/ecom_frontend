import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoriesPage from "../pages/admin/categories";
import AdminDashboardPage from "../pages/admin/dashboard";
import OrdersPage from "../pages/admin/orders";
import ProductPage from "../pages/admin/products";
import CheckoutPage from "../pages/checkout";
import HomePage from '../pages/home';
import ProductByCategoryPage from '../pages/productByCategory';
import ProductDetailPage from "../pages/productDetail";
import UserOrderPage from "../pages/user/order";
import UserProfilePage from "../pages/user/profile";
import UserSettingPage from "../pages/user/setting";
import WishListPage from "../pages/wishlist";
import ContactPage from "../pages/contact";
import AdminProtectedRoute from "./AdminProtectedRoute";
import CartProtectedRoute from "./CartProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
    return (
        <BrowserRouter>
            {/* Till Testing */}
            {/* <div className="w-100 px-2 bg-gray-200 py-2 text-center text-xs md:text-sm">
                <p className="font-medium font-serif">The Payment is yet in testing, so please use card number - <span className="font-semibold">4111 1111 1111 1111</span> .For testing purposes only</p>
            </div> */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/wish-list" element={<WishListPage />} />

                <Route path="/checkout" element={
                    <CartProtectedRoute>
                        <CheckoutPage />
                    </CartProtectedRoute>
                } />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/products/category/:catId" element={<ProductByCategoryPage />} />


                {/* Admin Routes Start */}
                <Route path="/admin/dashboard" element={<AdminProtectedRoute>
                    <AdminDashboardPage />
                </AdminProtectedRoute>} />

                {/* Category Routes */}
                <Route path="/admin/dashboard/categories" element={<AdminProtectedRoute>
                    <CategoriesPage />
                </AdminProtectedRoute>} />

                {/* Product Routes */}
                <Route path="/admin/dashboard/products" element={<AdminProtectedRoute>
                    <ProductPage />
                </AdminProtectedRoute>} />

                {/* Order Routes */}
                <Route path="/admin/dashboard/orders" element={<AdminProtectedRoute>
                    <OrdersPage />
                </AdminProtectedRoute>} />
                {/* Admin Routes End */}

                {/* User Routes */}
                <Route path="/user/orders" element={<ProtectedRoute>
                    <UserOrderPage />
                </ProtectedRoute>} />
                <Route path="/user/profile" element={<ProtectedRoute>
                    <UserProfilePage />
                </ProtectedRoute>} />
                <Route path="/user/setting" element={<ProtectedRoute>
                    <UserSettingPage />
                </ProtectedRoute>} />

            </Routes>
        </BrowserRouter>
    )
}

export default Routers;