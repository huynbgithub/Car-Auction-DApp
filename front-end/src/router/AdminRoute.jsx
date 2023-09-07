import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    // return adminName == 'admin' && password == "1" ? (
    //     <Outlet />
    // ) : (
    //     <Navigate to="/login" replace />
    // );
    return <Outlet />
};

export default AdminRoute;
