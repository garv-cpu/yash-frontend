import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [chart, setChart] = useState([]);
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7) // YYYY-MM
  );

  useEffect(() => {
    api.get("/analytics/dashboard").then(res => setStats(res.data));
  }, []);

  useEffect(() => {
    api
      .get(`/analytics/daily?month=${month}`)
      .then(res => setChart(res.data));
  }, [month]);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-6">
        <StatCard title="Products" value={stats.totalProducts} />
        <StatCard title="In Stock" value={stats.stock} />
        <StatCard title="Sold" value={stats.sold} />
        <StatCard title="Revenue" value={`₹${stats.revenue}`} />
        <StatCard title="Profit" value={`₹${stats.profit}`} />
        <StatCard
          title="Monthly Revenue"
          value={`₹${stats.monthlyRevenue}`}
        />
        <StatCard
          title="Monthly Profit"
          value={`₹${stats.monthlyProfit}`}
        />
      </div>

      {/* MONTH SELECTOR */}
      <div className="flex items-center gap-4">
        <label className="font-medium">Select Month:</label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      {/* DAILY CHART */}
      <SalesChart data={chart} />
    </div>
  );
}
