import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
    
        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
    
      
            let result;
            const contentType = response.headers.get("content-type");
            
            if (contentType && contentType.includes("application/json")) {
                result = await response.json();
            } else {
                result = await response.text(); 
            }
    
            if (!response.ok) throw new Error(result.message || result || "Registration failed");
    
            localStorage.setItem("userEmail", data.email);
            reset();
            setSuccessMessage(result.message || result || "Registration successful! Redirecting...");
            
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setErrorMessage(error.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-neutral-800">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" placeholder="Enter your name" {...register("name", { required: "Name is required" })} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" placeholder="Enter your email" {...register("email", { required: "Email is required" })} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" placeholder="Enter your password" {...register("password", { required: "Password is required", minLength: 6 })} className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-200" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                    {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
                    {successMessage && <p className="mt-2 text-sm text-green-600 text-center">{successMessage}</p>}
                </form>

                <div className="mt-4 text-center">
                    <p>Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
