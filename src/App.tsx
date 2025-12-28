import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import Dashboard from "@/pages/Dashboard";
import Expenses from "./pages/Expenses";

function App() {
    return (
        <Routes>
            <Route element={<IndexPage />} path="/" />
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<Expenses />} path="/expenses" />
        </Routes>
    );
}

export default App;
