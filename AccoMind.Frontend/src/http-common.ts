import axios from "axios"
import useAuthStore from "./stores/AuthStore"

const http = axios.create({
    baseURL: "http://localhost:8000"
})


http.interceptors.request.use((config) => {
    // get the token from zustand
    const token = useAuthStore.getState().user?.token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized errors
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)

export default http
