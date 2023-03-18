import AdminLayoutComponent from '../../../shared/components/AdminLayoutComponent';
import AllOrdersComponent from "./components/AllOrdersComponent";
import OrderMenuComponent from "./components/OrderMenuComponent";

const OrdersPage = () => {
    return (
        <AdminLayoutComponent>
            <div className="grid grid-cols-1 space-y-4 p-4">
                {/* Order menu */}
                <OrderMenuComponent />
                {/* All Orders */}
                <AllOrdersComponent />
            </div>
        </AdminLayoutComponent>
    )
}

export default OrdersPage;