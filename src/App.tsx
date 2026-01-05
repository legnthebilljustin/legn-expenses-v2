import { Route, Routes } from "react-router-dom";

import Expenses from "./pages/Expenses";
import AddExpenses from "./pages/AddExpenses";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import IndexPage from "@/pages/index";
import Dashboard from "@/pages/Dashboard";

const protectedAppRoutes = [
    {
        path: "/dashboard",
        component: <Dashboard />
    },
    {
        path: "expenses",
        component: <Expenses />
    },
    {
        path: "/add-expenses",
        component: <AddExpenses />
    }
];

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<IndexPage />} path="/" />
                <Route element={<Login />} path="/login" />
                {protectedAppRoutes.map((item: any) => (
                    <Route key={item.path}
                        element={
                            <ProtectedRoute>
                                {item.component}
                            </ProtectedRoute>
                        }
                        path={item.path}
                    />
                ))}
            </Routes>
        </AuthProvider>
    );
}

export default App;
