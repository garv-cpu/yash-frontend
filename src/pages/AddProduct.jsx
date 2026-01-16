import { useState } from "react";
import api from "../api/axios";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    ram: "",
    rom: "",
    color: "",
    price: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      await api.post("/products", {
        ...form,
        price: Number(form.price)
      });

      setMessage("✅ Product added successfully");

      setForm({
        name: "",
        ram: "",
        rom: "",
        color: "",
        price: ""
      });
    } catch (err) {
      setMessage("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-xl font-semibold mb-6">Add New Product</h2>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        {["name", "ram", "rom", "color", "price"].map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key.toUpperCase()}
            value={form[key]}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring focus:ring-blue-200"
          />
        ))}

        {message && (
          <p className="text-sm font-medium">
            {message}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </div>
    </div>
  );
}
