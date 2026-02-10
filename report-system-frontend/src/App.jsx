import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Reports from "./pages/Reports";

function Home() {
  return <h1>Home</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}
