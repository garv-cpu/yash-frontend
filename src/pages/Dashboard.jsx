import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [chart, setChart] = useState([]);

  useEffect(() => {
    api.get("/analytics/dashboard").then(res => setStats(res.data));

    api.get("/sales").then(res =>
      setChart(
        res.data.map(s => ({
          date: new Date(s.soldAt).toLocaleDateString(),
          amount: s.salePrice
        }))
      )
    );
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <StatCard title="Products" value={stats.totalProducts} />
        <StatCard title="In Stock" value={stats.stock} />
        <StatCard title="Sold" value={stats.sold} />
        <StatCard title="Revenue" value={`₹${stats.revenue}`} />
        <StatCard title="Profit" value={`₹${stats.profit}`} />
      </div>

      <SalesChart data={chart} />
    </div>
  );
}
