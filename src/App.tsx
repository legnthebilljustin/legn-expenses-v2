import { Route, Routes } from "react-router-dom";

import Expenses from "./pages/Expenses";
import AddExpenses from "./pages/AddExpenses";

import IndexPage from "@/pages/index";
import Dashboard from "@/pages/Dashboard";

function App() {
    return (
        <Routes>
            <Route element={<IndexPage />} path="/" />
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<Expenses />} path="/expenses" />
            <Route element={<AddExpenses />} path="/add-expenses" />
        </Routes>
    );
}

export default App;
