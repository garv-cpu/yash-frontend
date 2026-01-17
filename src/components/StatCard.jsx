export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm min-w-[140px]">
      <p className="text-gray-500 text-xs sm:text-sm">{title}</p>
      <h3 className="text-xl sm:text-2xl font-bold mt-2 break-all">
        {value}
      </h3>
    </div>
  );
}
