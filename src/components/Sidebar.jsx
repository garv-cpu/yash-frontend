import { NavLink } from "react-router-dom";
import { useState } from "react";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Add Product", path: "/add-product" },
  { name: "IMEI Entry", path: "/imei" },
  { name: "Products", path: "/products" },
  { name: "Sales", path: "/sales" }
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-gray-900 text-white flex items-center justify-between px-4 z-40 md:hidden">
        <h1 className="font-bold">Mobile Shop</h1>
        <button onClick={() => setOpen(true)} className="text-2xl">
          ☰
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-100 px-6 py-6 z-50
        transform transition-transform
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-8 hidden md:block">
          Mobile Shop
        </h1>

        <nav className="space-y-2">
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
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
    </>
  );
}
