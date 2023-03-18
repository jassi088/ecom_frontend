import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoriesPage from "src/pages/admin/categories";
import AdminDashboardPage from "src/pages/admin/dashboard";
import OrdersPage from "src/pages/admin/orders";
import ProductPage from "src/pages/admin/products";
import CheckoutPage from "../pages/checkout";
import HomePage from "src/pages/home";
import ProductByCategoryPage from "src/pages/productByCategory";
import ProductDetailPage from "src/pages/productDetail";
import UserOrderPage from "src/pages/user/order";
import UserProfilePage from "src/pages/user/profile";
import UserSettingPage from "src/pages/user/setting";
import WishListPage from "src/pages/wishlist";
import AdminProtectedRoute from "./AdminProtectedRoute";
import CartProtectedRoute from "./CartProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
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