import {FC, ReactNode} from "react";
import {Navigate} from "react-router-dom";


export const ReauireAuth: FC<{ children: ReactNode }> = ({ children }) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) return <Navigate to="/" replace />;

    return <>{children}</>;
};
