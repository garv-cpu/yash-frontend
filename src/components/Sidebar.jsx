import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Add Product", path: "/add-product" },
  { name: "IMEI Entry", path: "/imei" },
  { name: "Products", path: "/products" },
  { name: "Sales", path: "/sales" }
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-gray-100 px-6 py-6">
      <h1 className="text-2xl font-bold mb-8">Mobile Shop</h1>

      <nav className="space-y-2">
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
