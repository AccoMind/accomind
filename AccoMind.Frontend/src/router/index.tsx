import ChatBotInterface from "@/components/ChatBotInterface"
import LoginPage from "@/pages/LoginPage"
import useAuthStore from "@/stores/AuthStore"
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" Component={ProtectedRoute}>
                    <Route path="/:id?" element={<ChatBotInterface />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

function ProtectedRoute() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)

    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />
}