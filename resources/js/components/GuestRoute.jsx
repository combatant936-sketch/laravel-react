import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Wrap guest-only routes (login, register).
 * - While checking auth: render nothing (spinner handled by ProtectedRoute).
 * - Authenticated: redirect to dashboard.
 * - Not authenticated: render the guest page.
 */
export default function GuestRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return user ? <Navigate to="/" replace /> : <Outlet />;
}
