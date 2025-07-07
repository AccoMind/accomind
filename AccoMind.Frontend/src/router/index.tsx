import LoginScreen from "@/pages/LoginScreen.tsx"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LandingScreen from "@/pages/LandingScreen";
import ChatScreen from "@/pages/ChatScreen";
import CompanyDashboard from "@/pages/CompanyDashboard";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" Component={LoginScreen}/>
                <Route path="/" Component={LandingScreen}/>
                <Route path="/company/:id" Component={CompanyDashboard} />
                <Route path="/c/:id?" Component={ChatScreen}/>
            </Routes>
        </BrowserRouter>
    )
}

// function ProtectedRoute() {
//     const isAuthenticated = useAuthStore(state => state.isAuthenticated)
//
//     return isAuthenticated() ? <Outlet/> : <Navigate to="/login" replace/>
// }