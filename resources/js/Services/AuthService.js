import axios from "axios";

const AuthService = {
    login: (email, password) =>
        axios.post("/api/auth/login", { email, password }),

    register: (name, email, password, password_confirmation) =>
        axios.post("/api/auth/register", { name, email, password, password_confirmation }),

    logout: () =>
        axios.post("/api/auth/logout"),

    getUser: () =>
        axios.get("/api/auth/user"),
};

export default AuthService;
