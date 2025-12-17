import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let res = await axios.post("http://localhost:3000/api/login", {
      email,
      password,
    }, { withCredentials: true });

    if (res.data.success === true) {
      alert(res.data.message);
      window.location.replace("/");
    } else {
      alert(res.data.message || "Login failed");
    }
  } catch (err) {
    if (err.response) {
      alert(err.response.data.message || "Login failed!");
    } else {
      alert("Something went wrong!");
    }
  }
};


  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
