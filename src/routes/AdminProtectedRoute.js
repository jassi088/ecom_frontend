import { Navigate } from "react-router-dom";
import { isAdmin } from "../shared/helpers/isAdmin";
import { isAuthenticate } from "../shared/helpers/isAuthenticate";

const AdminProtectedRoute = ({ children }) => {
    const isAdminUser = isAuthenticate() && isAdmin();

    if (!isAdminUser) {
        return <Navigate to='/' replace />
    }

    return children;
}

export default AdminProtectedRoute;