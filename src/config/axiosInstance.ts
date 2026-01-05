import axios from "axios";
import { getAuth, signOut } from "firebase/auth";

import { APP_ERROR_CODES } from "@/constants/appErrorCodes";
import AppError from "@/utils/errorService";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use(async(config) => {
    const user = getAuth().currentUser;

    if (!user) {
        throw new AppError(401, "User not found.");
    }

    const token = await user.getIdToken();
    if(!token) {
        throw new AppError(401, `[${APP_ERROR_CODES.A100}] User token not found.`);
    }
    config.headers?.set("Authorization", `Bearer ${token}`);

    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    (response) => response.data,
    async(error) => {
        const status = error.response?.status;

        if (status === 401 && window.location.pathname !== "/login") {
            await signOut(getAuth());
            localStorage.clear();
            location.replace("/401");
        }

        return Promise.reject(error.response);
    }
);

export default api;