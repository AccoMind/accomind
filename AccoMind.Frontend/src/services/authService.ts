import http from "@/http-common"
import { LoginRequest, RegisterRequest } from "@/types/requests/auth"

export default class AuthService {

    public static login(loginData: LoginRequest) {
        return http.post("/auth/login", loginData)
    }

    public static register(registerData: RegisterRequest) {
        return http.post("/auth/register", registerData)
    }

}