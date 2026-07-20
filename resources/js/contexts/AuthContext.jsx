import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

// ── Axios default: attach Bearer token from localStorage ─────────────────────
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export function AuthProvider({ children }) {
    const [user, setUser]       = useState(null);
    const [loading, setLoading] = useState(true); // true while checking stored token

    // On mount: if a token exists, fetch the authenticated user
    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            axios
                .get("/api/auth/user")
                .then((res) => setUser(res.data))
                .catch(() => {
                    // Token invalid / expired — clean up
                    localStorage.removeItem("auth_token");
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await axios.post("/api/auth/login", { email, password });
        localStorage.setItem("auth_token", res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const register = async (name, email, password, password_confirmation) => {
        const res = await axios.post("/api/auth/register", {
            name,
            email,
            password,
            password_confirmation,
        });
        localStorage.setItem("auth_token", res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const logout = async () => {
        await axios.post("/api/auth/logout").catch(() => {}); // best-effort
        localStorage.removeItem("auth_token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}
