import { useEffect, useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Reports() {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            navigate("/");
            return;
        }

        fetchReports(userId);
    }, []);

    const fetchReports = async (userId) => {
        try {
            const res = await api.get("/reports", {
                params: { userId },
            });

            setReports(res.data);
        } catch (err) {
            console.error("Fetch failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Reports</h2>
                    <Link to="/upload">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                            Upload Report
                        </button>
                    </Link>
                </div>


                {reports.length === 0 && (
                    <p className="text-gray-500">No reports uploaded yet.</p>
                )}

                <div className="space-y-3">
                    {reports.map((r) => (
                        <Link
                            key={r.id}
                            to={`/reports/${r.id}`}
                            className="block border rounded-md p-4 hover:bg-gray-50"
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{r.name}</span>

                                <span
                                    className={`px-3 py-1 rounded text-sm rounded-full ${r.status === "COMPLETED"
                                        ? "bg-green-100 text-green-700"
                                        : r.status === "PROCESSING"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-gray-200 text-gray-700"
                                        }`}
                                >
                                    {r.status}
                                </span>
                            </div>
                        </Link>

                    ))}
                </div>
            </div>
        </div>

    );
}
