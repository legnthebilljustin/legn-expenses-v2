import { Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Expenses from "./pages/Expenses";
import AddExpenses from "./pages/AddExpenses";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import queryClient from "./config/queryClient";
import Income from "./pages/Income";

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
    },
    {
        path: "/income",
        component: <Income />
    }
];

function App() {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
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
            </QueryClientProvider>
            
        </AuthProvider>
    );
}

export default App;
