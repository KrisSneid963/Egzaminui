import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Basic ${btoa(email + ":" + password)}`
                },
            });

            if (!response.ok) throw new Error("You are Loged in successfully");

            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            navigate("/my-bookings"); 
        } catch (error) {
            alert(error.message); 
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-neutral-800">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                            required 
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-indigo-400 hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p>Don't have an account? <a href="/register" className="text-red-600 hover:underline">Register</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
