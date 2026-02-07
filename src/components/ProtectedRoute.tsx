import { addToast, Spinner } from "@heroui/react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { currentUser, isCheckingCredentials } = useAuth();

    if (isCheckingCredentials) {
        return (
            <div className="w-full h-screen flex justify-center">
                <Spinner
                    classNames={{ label: "text-grey-300 text-sm animate-pulse" }}
                    color="default"
                    label="Checking your identity..."
                    variant="wave"
                />
            </div>
        );
    }

    if (!isCheckingCredentials && currentUser === null) {
        addToast({
            title: "Authentication failed.",
            description: "Your token must have expired. Please log in again to continue.",
            color: "warning",
            timeout: 3000
        });

        return <Navigate to="/login" />;
    }

    return <>{ children }</>;
}