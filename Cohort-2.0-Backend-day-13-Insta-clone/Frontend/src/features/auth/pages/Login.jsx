import { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post(
                "http://localhost:3000/api/auth/login",
                {
                  email,
                  password,
                },
                {
                  withCredentials: true,
                },
              )
              .then((res) => {
                console.log(res.data);
                alert("Login successful: " + res.data.message);
                // localStorage.setItem("token", res.data.token);
                // window.location.href = "/home";
              })
              .catch((err) => {
                alert(
                  "Login failed: " +
                    (err.response?.data?.message || err.message),
                );
              });

            console.log(email);
            console.log(password);
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
