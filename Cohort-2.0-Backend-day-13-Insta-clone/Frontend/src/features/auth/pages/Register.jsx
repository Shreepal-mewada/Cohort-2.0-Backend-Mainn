import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/auth.hook";
import { useNavigate } from "react-router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Loading...</h2>
          <p className="text-gray-600">Please wait while we register you.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account 🚀
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(username, email, password);
            handleRegister(username, email, password)
              .then(() => {
                console.log("Registration successful");
                navigate("/");
              })
              .catch((error) => {
                console.error("Registration failed:", error);
              });
            setUsername("");
            setEmail("");
            setPassword("");
          }}
          className="space-y-5"
        >
          {/* Username */}
          <div>
            <label className="block text-gray-600 mb-2 text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

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
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 shadow-md"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <span className="text-purple-600 font-medium cursor-pointer hover:underline">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
