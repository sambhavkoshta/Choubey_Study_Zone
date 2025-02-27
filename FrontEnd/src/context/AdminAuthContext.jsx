import { createContext, useState, useEffect } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || "");
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");

    const loginAdmin = (accessToken, refreshToken) => {
        setAdminToken(accessToken);
        setRefreshToken(refreshToken);
        localStorage.setItem("adminToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
    };

    const logoutAdmin = () => {
        setAdminToken("");
        setRefreshToken("");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("refreshToken");
    };

    return (
        <AdminAuthContext.Provider value={{ adminToken, loginAdmin, logoutAdmin }}>
            {children}
        </AdminAuthContext.Provider>
    );
};
