import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STAFF"
  });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    try {
      if (isRegister) {
        await api.post("/auth/register", form);
      }
      await login(form.email, form.password);
      navigate("/");
    } catch {
      setError("Authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-96 space-y-4">
        <h2 className="text-xl font-semibold">
          {isRegister ? "Create Account" : "Login"}
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        {isRegister && (
          <>
            <input
              placeholder="Name"
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <select
              className="w-full border px-3 py-2 rounded"
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="STAFF">Staff</option>
              <option value="OWNER">Owner</option>
            </select>
          </>
        )}

        <input
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isRegister ? "Register & Login" : "Login"}
        </button>

        <p
          onClick={() => setIsRegister(!isRegister)}
          className="text-sm text-blue-600 cursor-pointer text-center"
        >
          {isRegister
            ? "Already have an account? Login"
            : "Create new account"}
        </p>
      </div>
    </div>
  );
}
