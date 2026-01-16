import { useState } from "react";
import api from "../api/axios";
import ImeiScanner from "../components/ImeiScanner";

export default function Sales() {
  const [imei, setImei] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  const sell = async () => {
    setMsg("");
    try {
      await api.post("/sales", {
        imei,
        salePrice: Number(price)
      });
      setMsg("✅ Sale completed");
      setImei("");
      setPrice("");
    } catch {
      setMsg("❌ Invalid or already sold IMEI");
    }
  };

  return (
    <div className="p-6 max-w-xl space-y-4">
      <h2 className="text-xl font-semibold mb-2">Sales Entry</h2>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <input
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          placeholder="Scan or Enter IMEI"
          className="w-full border px-4 py-2 rounded"
        />

        <button
          onClick={() => setShowScanner(!showScanner)}
          className="w-full bg-gray-800 text-white py-2 rounded"
        >
          {showScanner ? "Close Scanner" : "Open Camera Scanner"}
        </button>

        {showScanner && <ImeiScanner onScan={setImei} />}

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Sale Price"
          className="w-full border px-4 py-2 rounded"
        />

        {msg && <p className="text-sm font-medium">{msg}</p>}

        <button
          onClick={sell}
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          Mark as Sold
        </button>
      </div>
    </div>
  );
}
