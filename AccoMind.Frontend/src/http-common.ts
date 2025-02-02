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

http.interceptors.response.use((response) => {
    // if unauthorized, log out

    if (response.status === 401) {
        useAuthStore.getState().logout()
        window.location = "/login"
    }

    return response
})

export default http
