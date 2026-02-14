import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import Upload from "./pages/Upload";
import ReportDetail from "./pages/ReportDetail";
import Layout from "./components/Layout";

function Home() {
  return <h1>Home</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/reports"
          element={
            <Layout>
              <Reports />
            </Layout>
          }
        />
        <Route
          path="/upload"
          element={
            <Layout>
              <Upload />
            </Layout>
          }
        />
        <Route
          path="/reports/:id"
          element={
            <Layout>
              <ReportDetail />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
