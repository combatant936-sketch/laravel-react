import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// ── Field must live OUTSIDE Register so React doesn't recreate it on every
//    render (which would unmount/remount the input, losing focus after each keystroke)
function Field({ id, name, label, type = "text", placeholder, autoComplete, value, onChange, error }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-2.5 rounded-xl bg-gray-800 border text-white placeholder-gray-500
                    text-sm transition-all duration-200 outline-none
                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                    ${error ? "border-red-500" : "border-gray-700"}`}
            />
            {error && (
                <p className="mt-1.5 text-xs text-red-400">{error[0]}</p>
            )}
        </div>
    );
}

export default function Register() {
    const { register } = useAuth();
    const navigate     = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors]   = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        try {
            await register(form.name, form.email, form.password, form.password_confirmation);
            navigate("/", { replace: true });
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors ?? {});
            } else {
                setErrors({ name: ["Something went wrong. Please try again."] });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/40 mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Create account</h1>
                    <p className="text-gray-400 mt-1 text-sm">Start your journey today</p>
                </div>

                {/* Card */}
                <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8">
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        <Field
                            id="register-name"
                            name="name"
                            label="Full name"
                            placeholder="John Doe"
                            autoComplete="name"
                            value={form.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <Field
                            id="register-email"
                            name="email"
                            label="Email address"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <Field
                            id="register-password"
                            name="password"
                            label="Password"
                            type="password"
                            placeholder="Min. 8 characters"
                            autoComplete="new-password"
                            value={form.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <Field
                            id="register-password-confirm"
                            name="password_confirmation"
                            label="Confirm password"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            error={errors.password_confirmation}
                        />

                        <button
                            id="register-submit"
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm text-white
                                bg-indigo-600 hover:bg-indigo-500 active:scale-95
                                transition-all duration-200 shadow-lg shadow-indigo-500/30
                                disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                            {loading && (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            )}
                            {loading ? "Creating account…" : "Create account"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-800" />
                        <span className="text-xs text-gray-500">OR</span>
                        <div className="flex-1 h-px bg-gray-800" />
                    </div>

                    <p className="text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            id="go-to-login"
                            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
