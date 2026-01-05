import { addToast, Button, Form, Input } from "@heroui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { firebaseAuth } from "@/config/firebase";

export default function Login() {
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/dashboard", { replace: true });
        }
    }, [currentUser, navigate]);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        const email = data.email;
        const password = data.password;

        try {
            if (typeof email !== "string" || !validateEmail(email)) {
                return setError("Email address must be a valid email.");

            }

            if (typeof password !== "string" || password.trim() === "") {
                return setError("Password must be a valid string.");
            }

            await signInWithEmailAndPassword(firebaseAuth, email, password);
            navigate("/dashboard", { replace: true });
        } catch (error: any) {
            return addToast({
                title: "Log in failed.",
                description: error.message || "Invalid credentials.",
                timeout: 5000
            });
        } finally {
            setIsLoading(false);
        }
    };

    const validateEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full h-full max-w-[400px] max-h-[600px] text-center">
                <h1 className="text-4xl font-bold mb-8 tracking-tight">Log In</h1>
                <div className="my-4">
                    {error &&
                        <div className="text-red-400">
                            { error }
                        </div>
                    }
                </div>
                <Form onSubmit={handleSubmit}>
                    <Input isRequired
                        isReadOnly={isLoading}
                        label="Email Address"
                        name="email"
                        placeholder="Email address."
                        type="text"
                    />
                    <Input isRequired
                        isReadOnly={isLoading}
                        label="Password"
                        name="password"
                        placeholder="Enter password."
                        type="password"
                    />
                    <div className="flex gap-3 mt-4 w-full justify-center">
                        <Button color="primary" isDisabled={isLoading} isLoading={isLoading} type="submit">Log In</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}