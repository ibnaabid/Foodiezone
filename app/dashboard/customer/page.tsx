import CustomerDashboardLayout from "./layout";

export default function CustomerDashboard() {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">Total Orders</p>
          <p className="text-5xl font-bold text-teal-600 mt-3">24</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">Favorites</p>
          <p className="text-5xl font-bold text-teal-600 mt-3">8</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">Spent This Month</p>
          <p className="text-5xl font-bold text-teal-600 mt-3">৳4,280</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">Reward Points</p>
          <p className="text-5xl font-bold text-teal-600 mt-3">245</p>
        </div>
      </div>
    </section>
  );
}