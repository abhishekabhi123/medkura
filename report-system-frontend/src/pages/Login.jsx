import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("userId", res.data.userId);
            navigate("/reports");
        } catch (err) {
            alert(err.response?.data?.error || "Login failed");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login
                </h2>

                <div className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">
                            Email
                        </label>
                        <input
                            className="w-full border rounded p-2"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full border rounded p-2"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )

}