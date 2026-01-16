import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white shadow flex items-center px-6 justify-between">
      <h2 className="text-xl font-semibold text-gray-700">
        Inventory Management System
      </h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>
  );
}
