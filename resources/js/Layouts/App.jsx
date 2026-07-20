import { BrowserRouter, NavLink, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute    from "../components/GuestRoute";

// Pages
import PostsIndex  from "../Pages/Posts/Index";
import PostsCreate from "../Pages/Posts/Create";
import PostsEdit   from "../Pages/Posts/Edit";
import Login       from "../Pages/Auth/Login";
import Register    from "../Pages/Auth/Register";

// ── Authenticated shell layout ────────────────────────────────────────────────
function AuthLayout() {
    const { user, logout } = useAuth();
    const navigate         = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800 shadow-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow shadow-indigo-500/40">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <span className="text-white font-bold text-lg tracking-tight">PostManager</span>
                    </div>

                    {/* Nav + User */}
                    <div className="flex items-center gap-4">
                        <nav className="flex items-center gap-1">
                            <NavLink
                                to="/"
                                end
                                id="nav-all-posts"
                                className={({ isActive }) =>
                                    `px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
                                    ${isActive
                                        ? "bg-indigo-600/20 text-indigo-400 ring-1 ring-indigo-500/40"
                                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                                    }`
                                }
                            >
                                All Posts
                            </NavLink>

                            <NavLink
                                to="/posts/create"
                                id="nav-create-post"
                                className={({ isActive }) =>
                                    `px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
                                    ${isActive
                                        ? "bg-indigo-600/20 text-indigo-400 ring-1 ring-indigo-500/40"
                                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                                    }`
                                }
                            >
                                + Create Post
                            </NavLink>
                        </nav>

                        {/* User avatar + logout */}
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold uppercase">
                                    {user?.name?.charAt(0)}
                                </div>
                                <span className="text-sm text-gray-300 hidden sm:block font-medium">{user?.name}</span>
                            </div>
                            <button
                                id="logout-btn"
                                onClick={handleLogout}
                                className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-400 hover:text-white hover:bg-red-600/20
                                    ring-1 ring-red-500/30 transition-all duration-150 active:scale-95"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Page content */}
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-900 border border-gray-800 shadow-xl rounded-2xl overflow-hidden">
                        <div className="p-6 text-gray-100">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// ── Root App ──────────────────────────────────────────────────────────────────
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Guest routes (redirect to / if already logged in) */}
                    <Route element={<GuestRoute />}>
                        <Route path="/login"    element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    {/* Protected routes (redirect to /login if not authenticated) */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<AuthLayout />}>
                            <Route index               element={<PostsIndex />} />
                            <Route path="posts/create" element={<PostsCreate />} />
                            <Route path="posts/edit/:id" element={<PostsEdit />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;