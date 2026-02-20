import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/auth.hook"; 
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const { handleLogin, loading } = useAuth();
   const navigate = useNavigate();
     if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Loading...</h2>
          <p className="text-gray-600">Please wait while we log you in.</p>
        </div>
      </div>
    );
  } 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(email);
            console.log(password);
           
            handleLogin(email, password).then(() => {
              console.log("Login successful");
              navigate("/");

            
            }).catch((error) => {
              console.error("Login failed:", error);
            });
            setEmail("");
            setPassword("");
          }}
          className="space-y-5"
        >
          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-purple-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <span className="text-purple-600 font-medium cursor-pointer hover:underline">
            <Link to="/register">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
