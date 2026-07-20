import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Wrap authenticated-only routes.
 * - While checking auth: show a centered spinner.
 * - Not authenticated: redirect to /login.
 * - Authenticated: render child routes.
 */
export default function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-400 text-sm">Verifying session…</p>
                </div>
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}
