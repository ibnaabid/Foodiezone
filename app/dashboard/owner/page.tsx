import OwnerDashboardLayout from "./layout";

export default function OwnerDashboard() {
  return (
    <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">Today’s Orders</p>
          <p className="text-5xl font-bold text-teal-600 mt-3">24</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">Monthly Revenue</p>
          <p className="text-5xl font-bold text-teal-600 mt-3">৳68,450</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">Active Menu Items</p>
          <p className="text-5xl font-bold text-teal-600 mt-3">42</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow">
          <p className="text-gray-500">Avg. Rating</p>
          <p className="text-5xl font-bold text-teal-600 mt-3">4.8</p>
        </div>
      </div>

      <div className="mt-10 bg-white p-8 rounded-3xl shadow">
        <h3 className="text-xl font-semibold mb-6">Today’s Orders</h3>
        <p className="text-gray-500">Live orders will appear here...</p>
      </div>
        </section>
        
  
  );
}