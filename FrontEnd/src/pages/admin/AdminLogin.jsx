import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { loginAdmin } = useContext(AdminAuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:7000/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed!");
            }

            // Admin authenticated successfully
            loginAdmin(data.accessToken, data.refreshToken);
            navigate("/");
            setTimeout(() => {
              window.location.reload();
          }, 300);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700">Admin Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                
                <form onSubmit={handleLogin} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                            className="w-full p-2 border rounded"
                            placeholder="Enter Admin Email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            placeholder="Enter Password"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
