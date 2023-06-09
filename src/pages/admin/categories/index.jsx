import AdminLayoutComponent from '../../../shared/components/AdminLayoutComponent';
import AllCategoriesComponent from "./components/AllCategoriesComponent";
import CategoryMenuComponent from "./components/CategoryMenuComponent";



const CategoriesPage = () => {
    return (
        <AdminLayoutComponent>
            <div className="grid grid-cols-1 space-y-4 p-4">

                {/* Category Menu */}
                <CategoryMenuComponent />

                {/* All Categories */}
                <AllCategoriesComponent />

            </div>
        </AdminLayoutComponent>
    )
};

export default CategoriesPage;