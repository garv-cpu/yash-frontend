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
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 h-[360px]">
      <h3 className="font-semibold mb-4 text-sm sm:text-base">
        Daily Revenue & Profit
      </h3>

      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="revenue" strokeWidth={2} />
            <Line dataKey="profit" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
