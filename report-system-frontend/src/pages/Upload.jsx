import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleUpload = async () => {
        setError("");
        const userId = localStorage.getItem("userId");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("type", type);
        formData.append("userId", userId);

        try {
            await api.post("/reports", formData);
            navigate("/reports");
        } catch (err) {
            setError(err.response?.data?.error || "Upload failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">

                <h2 className="text-2xl font-bold mb-6">Upload Report</h2>
                <div className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">
                            Report Name
                        </label>
                        <input
                            className="w-full border rounded p-2"
                            placeholder="Enter report name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Report Type
                        </label>
                        <input
                            className="w-full border rounded p-2"
                            placeholder="Enter report type"
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>

                    <div>

                        <label className="block mb-1 font-medium">
                            Report File
                        </label>

                        <label className="border rounded p-2 w-full block cursor-pointer bg-white hover:bg-gray-50">
                            <span className="text-gray-600">
                                📄 {file ? file.name : "Click to choose file"}
                            </span>

                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            disabled={!file || !name.trim() || !type.trim()}
                            onClick={handleUpload}
                            className={`px-4 py-2 rounded text-white ${file && name.trim() && type.trim()
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-blue-300 cursor-not-allowed"
                                }`}
                        >
                            Upload
                        </button>

                        <button
                            onClick={() => navigate("/reports")}
                            className="border px-4 py-2 rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )

}