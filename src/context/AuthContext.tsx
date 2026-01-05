import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { firebaseAuth } from "@/config/firebase";

interface AuthProviderProps {
    children: ReactNode
}

interface AuthContextType {
    currentUser: User | null
    isCheckingCredentials: boolean
    logout: () => Promise<void>
    // getIdToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isCheckingCredentials, setICheckingCredentials] = useState(true);


    function logout() {
        return signOut(firebaseAuth);
    }

    useEffect(() => {
        const unsubsribe = onAuthStateChanged(firebaseAuth, async(user) => {
            setICheckingCredentials(true);
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }

            setICheckingCredentials(false);
        });

        return unsubsribe;
    }, []);

    const value: AuthContextType = {
        currentUser,
        isCheckingCredentials,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}