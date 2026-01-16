import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function SalesChart({ data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4">Daily Revenue & Profit</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="revenue" strokeWidth={3} />
          <Line dataKey="profit" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
