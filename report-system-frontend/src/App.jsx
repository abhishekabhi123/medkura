import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Upload from "./pages/Upload";
import ReportDetail from "./pages/ReportDetail";

function Home() {
  return <h1>Home</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="upload" element={<Upload />} />
        <Route path="/reports/:id" element={<ReportDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
