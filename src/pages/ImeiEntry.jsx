import { useEffect, useState } from "react";
import api from "../api/axios";
import ImeiScanner from "../components/ImeiScanner";

export default function ImeiEntry() {
  const [imei, setImei] = useState("");
  const [product, setProduct] = useState("");
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  const saveImei = async () => {
    setMsg("");
    try {
      await api.post("/imei", { imei, product });
      setMsg("✅ IMEI saved");
      setImei("");
    } catch {
      setMsg("❌ IMEI already exists");
    }
  };

  return (
    <div className="p-6 max-w-xl space-y-4">
      <h2 className="text-xl font-semibold">IMEI Entry</h2>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <input
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          placeholder="Enter or Scan IMEI"
          className="w-full border px-4 py-2 rounded"
        />

        <select
          onChange={(e) => setProduct(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        >
          <option>Select Product</option>
          {products.map(p => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowScanner(!showScanner)}
          className="w-full bg-gray-800 text-white py-2 rounded"
        >
          {showScanner ? "Close Scanner" : "Open Camera Scanner"}
        </button>

        {showScanner && <ImeiScanner onScan={setImei} />}

        {msg && <p className="text-sm">{msg}</p>}

        <button
          onClick={saveImei}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Save IMEI
        </button>
      </div>
    </div>
  );
}
