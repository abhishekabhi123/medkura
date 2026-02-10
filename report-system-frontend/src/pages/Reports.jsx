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
        <div style={{ padding: 40 }}>
            <h2>Reports</h2>

            <Link to="/upload">
                <button>Upload Report</button>
            </Link>

            <ul>
                {reports.map((r) => (
                    <li key={r.id}>
                        <Link to={`/reports/${r.id}`}>
                            {r.name} — {r.status}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
