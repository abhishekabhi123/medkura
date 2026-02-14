import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

export default function ReportDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [report, setReport] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {
        setError("");
        try {
            const res = await api.get(`/reports/${id}`);
            setReport(res.data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to load report");
        }
    };

    const updateStatus = async (status) => {
        setError("");
        try {
            await api.patch(`/reports/${id}/status`, { status });
            fetchReport();
        } catch (err) {
            setError(err.response?.data?.error || "Failed to update status");
        }
    };

    if (!report && !error) return <div>Loading...</div>;
    if (error && !report) return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm mb-4">{error}</div>
                <button onClick={() => navigate("/reports")} className="text-blue-600 hover:underline">← Back to reports</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">

                <h2 className="text-2xl font-bold mb-6">Report Detail</h2>
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm mb-4">
                        {error}
                    </div>
                )}
                <div className="space-y-3">
                    <p>
                        <span className="font-semibold">Name:</span>{" "}
                        {report.name}
                    </p>
                    <p>
                        <span className="font-semibold">Type:</span>{" "}
                        {report.type}
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="font-semibold">Status:</span>

                        <span
                            className={`px-3 py-1 text-sm rounded-full ${report.status === "COMPLETED"
                                ? "bg-green-100 text-green-700"
                                : report.status === "PROCESSING"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {report.status}
                        </span>

                        <span className="text-gray-500 text-sm">
                            {new Date(report.createdAt).toLocaleString()}
                        </span>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm">
                        <span className={report.status !== "UPLOADED" ? "text-green-600" : ""}>
                            Uploaded
                        </span>
                        →
                        <span className={
                            report.status === "PROCESSING" || report.status === "COMPLETED"
                                ? "text-green-600"
                                : ""
                        }>
                            Processing
                        </span>
                        →
                        <span className={report.status === "COMPLETED" ? "text-green-600" : ""}>
                            Completed
                        </span>
                    </div>



                    <div className="mt-6 flex gap-3">
                        <button
                            disabled={report.status === "PROCESSING"}
                            onClick={() => updateStatus("PROCESSING")}
                            className={`px-3 py-1 rounded text-white ${report.status === "PROCESSING"
                                ? "bg-yellow-300 cursor-not-allowed"
                                : "bg-yellow-500 hover:bg-yellow-600"
                                }`}
                        >
                            Set Processing
                        </button>

                        <button
                            disabled={report.status === "COMPLETED"}
                            onClick={() => updateStatus("COMPLETED")}
                            className={`px-3 py-1 rounded text-white ${report.status === "COMPLETED"
                                ? "bg-green-300 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                                }`}
                        >
                            Set Completed
                        </button>
                    </div>


                    <div className="bg-gray-50 border p-4 rounded leading-relaxed">
                        {report.summary || (
                            <span className="text-gray-500">
                                Summary will appear after report processing completes.
                            </span>

                        )}
                    </div>
                    {report.filePath && (<a
                        href={`http://localhost:8080/api/reports/${id}/file`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-4 text-blue-600 hover:underline"
                    >
                        View Report File
                    </a>)}



                    <div>
                        <button
                            onClick={() => navigate("/reports")}
                            className="mt-8 text-blue-600 hover:underline"
                        >
                            ← Back to reports
                        </button>
                    </div>
                </div>


            </div>
        </div >
    );
}