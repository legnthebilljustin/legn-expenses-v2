import { Route, Routes } from "react-router-dom";

import Expenses from "./pages/Expenses";
import AddExpenses from "./pages/AddExpenses";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";

import IndexPage from "@/pages/index";
import Dashboard from "@/pages/Dashboard";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<IndexPage />} path="/" />
                <Route element={<Login />} path="/login" />
                <Route element={<Dashboard />} path="/dashboard" />
                <Route element={<Expenses />} path="/expenses" />
                <Route element={<AddExpenses />} path="/add-expenses" />
            </Routes>
        </AuthProvider>
    );
}

export default App;
