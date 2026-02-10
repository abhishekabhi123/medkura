import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Upload() {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const navigate = useNavigate();

    const handleUpload = async () => {
        const userId = localStorage.getItem("userId");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("type", type);
        formData.append("userId", userId);

        await api.post("/reports", formData);

        navigate("/reports");
    };

    return (
        <div style={{ padding: 40 }}>
            <h2>Upload Report</h2>

            <input
                placeholder="Report Name"
                onChange={(e) => setName(e.target.value)}
            />
            <br /><br />

            <input
                placeholder="Report Type"
                onChange={(e) => setType(e.target.value)}
            />
            <br /><br />

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <br /><br />

            <button onClick={handleUpload}>
                Upload
            </button>
        </div>
    )

}