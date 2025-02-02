import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import AuthService from "@/services/authService";
import useAuthStore from "@/stores/AuthStore";
import { useNavigate } from "react-router";


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    AuthService.login({ email, password })
      .then((response) => {
        setUser(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex h-screen">

      <div className="min-h-screen flex flex-col justify-center mx-80 bg-gray-100 p-10">

        <div className="flex flex-1 items-center justify-center px-30">
          <Card className="w-full max-w-full bg-white rounded-lg shadow-lg p-6">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="flex flex-col space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
