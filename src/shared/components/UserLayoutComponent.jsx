import CartModal from "../modals/CartModal"
import FooterComponent from "./FooterComponent"
import NavbarComponent from "./NavbarComponent"
import UserSidebarComponent from "./UserSidebarComponent"

const UserLayoutComponent = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh' }} className='flex flex-col'>
            <div className='flex-1'>
                <NavbarComponent />
                <CartModal />
                <div className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24 flex flex-col md:flex-row">
                    {/* UserSideBar */}
                    <UserSidebarComponent />
                    {children}
                </div>
            </div>
            <FooterComponent />
        </div>
    )
}

export default UserLayoutComponent;