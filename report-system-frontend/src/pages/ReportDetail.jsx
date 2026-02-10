import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

export default function ReportDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [report, setReport] = useState(null);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {
        const res = await api.get(`/reports/${id}`);
        setReport(res.data);
    };

    if (!report) return <div>Loading...</div>;

    return (
        <div style={{ padding: 40 }}>
            <h2>Report Detail</h2>

            <p><b>Name:</b> {report.name}</p>
            <p><b>Type:</b> {report.type}</p>
            <p><b>Status:</b> {report.status}</p>

            <p><b>Summary:</b></p>
            <p>{report.summary || "Not generated yet"}</p>

            <br />

            <button onClick={() => navigate("/reports")}>
                Back
            </button>
        </div>
    );
}