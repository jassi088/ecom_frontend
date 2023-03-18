import OrderSuccessMessageComponent from "../../pages/home/components/OrderSuccessMessageComponent";
import CartModal from "../modals/CartModal";
import LoginSignupModal from "../modals/LoginSignupModal";
import FooterComponent from "./FooterComponent";
import NavbarComponent from "./NavbarComponent";


const LayoutComponent = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: "flex", flexDirection: "column" }}>
            <div style={{ flex: '1' }}>
                <NavbarComponent />
                {children}
                <LoginSignupModal />
                <CartModal />
                <OrderSuccessMessageComponent />
            </div>
            <FooterComponent />
        </div>
    )
}

export default LayoutComponent;