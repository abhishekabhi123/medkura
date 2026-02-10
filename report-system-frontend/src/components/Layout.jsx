import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("userId");
        navigate("/");
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-white shadow">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">
                    <Link to="/reports" className="font-bold text-lg">
                        MedKura Reports
                    </Link>

                    <button
                        onClick={logout}
                        className="text-red-600 font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto p-6">{children}</div>
        </div>
    );
}