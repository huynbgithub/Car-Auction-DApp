import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import PublicRoute from "./PublicRoute"
import EmployeeRoute from "./EmployeeRoute"
import AdminRoute from "./AdminRoute"
import PublicLayout from "../components/PublicLayout";
import Home from "../page/Home"
import Detail from "../page/Detail";
import Wallet from "../page/Wallet";
import PostCar from "../page/PostCar";
const publicRoute = [
    {
        index: true,
        path: "home",
        component: <Home />,
        exact: true,
        restrict: true,
    },
    {
        index: true,
        path: "detail",
        component: <Detail />,
        exact: true,
        restrict: true,
    },
    {
        index: true,
        path: "wallet",
        component: <Wallet />,
        exact: true,
        restrict: true,
    },
    {
        index: true,
        path: "postcar",
        component: <PostCar />,
        exact: true,
        restrict: true,
    },
];
const adminRoute = [];
const employeeRoute = [];

const RouterComponent = () => {
    // useAutoLogout(jwt);
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Navigate to="home" />} />
                <Route exact path="/" element={<PublicRoute />}>
                    <Route exact element={<PublicLayout />}>
                        {publicRoute.map((route) => (
                            <Route
                                index={route.index}
                                key={route.path}
                                path={route.path}
                                element={route.component}
                                exact={route.exact}
                                restrict={route.restrict}
                            />
                        ))}
                    </Route>
                </Route>
                {/* <Route exact element={<EmployeeRoute />}>
                    <Route exact element={<LayoutComponent />}>
                        {employeeRoute.map((route) => (
                            <Route
                                index={route.index}
                                key={route.path}
                                path={route.path}
                                element={route.component}
                                exact={route.exact}
                                restrict={route.restrict}
                            />
                        ))}
                    </Route>
                </Route>
                <Route exact element={<AdminRoute />}>
                    <Route exact element={<LayoutComponent />}>
                        {adminRoute.map((route) => (
                            <Route
                                index={route.index}
                                key={route.path}
                                path={route.path}
                                element={route.component}
                                exact={route.exact}
                                restrict={route.restrict}
                            />
                        ))}
                    </Route>
                </Route>
                <Route path="/payment/result" element={<Payment />} />

                <Route path="/404" element={<ErrorPage />} />
                <Route path="/403" element={<Error403Page />} />
                <Route path="*" element={<ErrorPage />} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default RouterComponent;
