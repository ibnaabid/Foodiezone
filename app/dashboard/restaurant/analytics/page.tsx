"use client";

export default function AnalyticsPage() {
  const stats = [
    { label: "Total Revenue", value: "৳85,420", color: "text-emerald-600" },
    { label: "Total Orders", value: "1,240", color: "text-blue-600" },
    { label: "Active Customers", value: "342", color: "text-orange-600" },
    { label: "Avg Order Value", value: "৳250", color: "text-purple-600" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Business Analytics</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <h3 className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-80 flex items-center justify-center">
        <p className="text-gray-400">📊 Chart Implementation Area (Recharts/Chart.js)</p>
      </div>
    </div>
  );
}