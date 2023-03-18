import AdminNavbarComponent from "./AdminNavbarComponent";
import AdminSidebarComponent from "./AdminSidebarComponent";
import FooterComponent from "./FooterComponent";

const AdminLayoutComponent = ({ children }) => {
  return (
    <>
      <AdminNavbarComponent />
      <section className="flex bg-gray-100">
        <AdminSidebarComponent />
        <div className="w-full md:w-11/12 h-full">
          {children}
        </div>
      </section>
      <FooterComponent />
    </>
  )
}

export default AdminLayoutComponent;