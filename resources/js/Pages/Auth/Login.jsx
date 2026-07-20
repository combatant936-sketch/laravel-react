import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate  = useNavigate();

    const [form, setForm]     = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        try {
            await login(form.email, form.password);
            navigate("/", { replace: true });
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors ?? {});
            } else {
                setErrors({ email: ["Something went wrong. Please try again."] });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/40 mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back</h1>
                    <p className="text-gray-400 mt-1 text-sm">Sign in to your account</p>
                </div>

                {/* Card */}
                <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8">
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">

                        {/* Email */}
                        <div>
                            <label htmlFor="login-email" className="block text-sm font-medium text-gray-300 mb-1.5">
                                Email address
                            </label>
                            <input
                                id="login-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className={`w-full px-4 py-2.5 rounded-xl bg-gray-800 border text-white placeholder-gray-500
                                    text-sm transition-all duration-200 outline-none
                                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                    ${errors.email ? "border-red-500" : "border-gray-700"}`}
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.email[0]}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="login-password" className="block text-sm font-medium text-gray-300 mb-1.5">
                                Password
                            </label>
                            <input
                                id="login-password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className={`w-full px-4 py-2.5 rounded-xl bg-gray-800 border text-white placeholder-gray-500
                                    text-sm transition-all duration-200 outline-none
                                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                    ${errors.password ? "border-red-500" : "border-gray-700"}`}
                            />
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-400">{errors.password[0]}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            id="login-submit"
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-white
                                bg-indigo-600 hover:bg-indigo-500 active:scale-95
                                transition-all duration-200 shadow-lg shadow-indigo-500/30
                                disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            )}
                            {loading ? "Signing in…" : "Sign in"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-800" />
                        <span className="text-xs text-gray-500">OR</span>
                        <div className="flex-1 h-px bg-gray-800" />
                    </div>

                    {/* Register link */}
                    <p className="text-center text-sm text-gray-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/register"
                            id="go-to-register"
                            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
