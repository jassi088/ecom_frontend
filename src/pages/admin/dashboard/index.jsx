import AdminLayoutComponent from "src/shared/components/AdminLayoutComponent";
import CustomizedComponent from "./components/CustomizedComponent";
import DashboardCardComponent from "./components/DashboardCardComponent";
import SaleTableComponent from "./components/SaleTableComponent";


const AdminDashboardPage = () => {
    return (
        <AdminLayoutComponent>
            <DashboardComponent />
        </AdminLayoutComponent>
    )
};

const DashboardComponent = () => {
    return (
        <>
            <DashboardCardComponent />
            <CustomizedComponent />

            {/* Today Sale */}
            <div className="m-4">
                <SaleTableComponent />
            </div>
        </>
    )
};

export default AdminDashboardPage;