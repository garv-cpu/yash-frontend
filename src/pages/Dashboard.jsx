import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [chart, setChart] = useState([]);
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    api.get("/analytics/dashboard").then(res => setStats(res.data));
  }, []);

  useEffect(() => {
    api.get(`/analytics/daily?month=${month}`).then(res => setChart(res.data));
  }, [month]);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* STATS */}
      <div className="grid gap-4
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    2xl:grid-cols-7
  ">
        <StatCard title="Products" value={stats.totalProducts} />
        <StatCard title="In Stock" value={stats.stock} />
        <StatCard title="Sold" value={stats.sold} />
        <StatCard title="Revenue" value={`₹${stats.revenue}`} />
        <StatCard title="Profit" value={`₹${stats.profit}`} />
        <StatCard title="Monthly Revenue" value={`₹${stats.monthlyRevenue}`} />
        <StatCard title="Monthly Profit" value={`₹${stats.monthlyProfit}`} />
      </div>


      {/* MONTH SELECTOR */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <label className="font-medium">Select Month:</label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-auto"
        />
      </div>

      {/* DAILY CHART */}
      <div className="bg-white rounded-xl shadow p-3 sm:p-6">
        <SalesChart data={chart} />
      </div>
    </div>
  );
}
