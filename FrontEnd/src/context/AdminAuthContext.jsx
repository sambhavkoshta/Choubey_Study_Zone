// import { createContext, useState, useEffect } from "react";

// export const AdminAuthContext = createContext();

// export const AdminAuthProvider = ({ children }) => {
//     const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || "");
//     const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");

//     const loginAdmin = (accessToken, refreshToken) => {
//         setAdminToken(accessToken);
//         setRefreshToken(refreshToken);
//         localStorage.setItem("adminToken", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);
//     };

//     const logoutAdmin = () => {
//         setAdminToken("");
//         setRefreshToken("");
//         localStorage.removeItem("adminToken");
//         localStorage.removeItem("refreshToken");
//     };

//     return (
//         <AdminAuthContext.Provider value={{ adminToken, loginAdmin, logoutAdmin }}>
//             {children}
//         </AdminAuthContext.Provider>
//     );
// };


// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// export const AdminAuthContext = createContext();

// export const AdminAuthProvider = ({ children }) => {
//     const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken") || "");
//     const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "");
//     const [admin, setAdmin] = useState(null);
    
//     let logoutTimer;

//     // ✅ Login Admin & Store Tokens
//     const loginAdmin = (accessToken, refreshToken) => {
//         setAdminToken(accessToken);
//         setRefreshToken(refreshToken);
//         localStorage.setItem("adminToken", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);
//     };

//     // ✅ Logout Admin
//     const logoutAdmin = () => {
//         setAdminToken("");
//         setRefreshToken("");
//         setAdmin(null);
//         localStorage.removeItem("adminToken");
//         localStorage.removeItem("refreshToken");
//     };

//     // ✅ Function: Refresh Token
//     const refreshAccessToken = async () => {
//         try {
//             const { data } = await axios.post("http://localhost:7000/api/auth/refresh-token", { token: refreshToken });
//             setAdminToken(data.accessToken);
//             localStorage.setItem("adminToken", data.accessToken);
//         } catch (error) {
//             logoutAdmin();
//         }
//     };

//     // ✅ Function: Load Admin Data
//     const loadAdmin = async () => {
//         if (!adminToken) return;

//         try {
//             const { data } = await axios.get("http://localhost:7000/api/admin/profile", {
//                 headers: { Authorization: `Bearer ${adminToken}` }
//             });
//             setAdmin(data);
//         } catch (error) {
//             refreshAccessToken();
//         }
//     };

//     // ✅ Auto Logout on 15 Min Inactivity
//     const resetTimer = () => {
//         clearTimeout(logoutTimer);
//         logoutTimer = setTimeout(logoutAdmin, 15 * 60 * 1000);
//     };

//     useEffect(() => {
//         loadAdmin();

//         window.addEventListener("mousemove", resetTimer);
//         window.addEventListener("keydown", resetTimer);
        
//         return () => {
//             clearTimeout(logoutTimer);
//             window.removeEventListener("mousemove", resetTimer);
//             window.removeEventListener("keydown", resetTimer);
//         };
//     }, [adminToken]);

//     return (
//         <AdminAuthContext.Provider value={{ admin, adminToken, loginAdmin, logoutAdmin }}>
//             {children}
//         </AdminAuthContext.Provider>
//     );
// };

// export const useAdminAuth = () => useContext(AdminAuthContext);


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
