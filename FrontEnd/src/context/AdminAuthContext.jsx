import { createContext, useState, useEffect } from "react";
export const AdminAuthContext = createContext();

const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const storedAdmin = JSON.parse(localStorage.getItem("adminToken"));
        if (storedAdmin) {
            setAdmin(storedAdmin);
            setAccessToken(storedAdmin.accessToken);
        }
    }, []);

    const loginAdmin = (accessToken) => {
        setAccessToken(accessToken);
        setAdmin({ accessToken });
        localStorage.setItem("adminToken", JSON.stringify({ accessToken }));
    };

    const logoutAdmin = async () => {
        await fetch("http://localhost:7000/api/admin/logout", { method: "POST", credentials: "include" });
        localStorage.removeItem("adminData");
        setAdmin(null);
        setAccessToken(null);
    };

    return (
        <AdminAuthContext.Provider value={{ admin, accessToken, loginAdmin, logoutAdmin }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export default AdminAuthProvider;
