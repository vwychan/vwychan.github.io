'use client';

import { signInWithPopup, signOut, User } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface LoginButtonProps {
    user: User | null;
}

export function LoginButton({ user }: LoginButtonProps) {
    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please try again.");
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (user) {
        return (
            <div className="flex items-center gap-2">
                {user.photoURL && (
                    <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-8 h-8 rounded-full border border-gray-300"
                        title={user.email || ""}
                    />
                )}
                <button
                    onClick={handleLogout}
                    className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-gray-700"
                >
                    Sign Out
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleLogin}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded shadow-sm transition-colors"
        >
            Sign In
        </button>
    );
}
