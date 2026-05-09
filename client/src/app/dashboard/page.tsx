export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Welcome to the NHIA Pharmacy Inventory System. From here you can manage inventory, transfers, and view reports.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Inventory</h2>
            <p className="text-sm text-gray-500">Manage drug stock, batches, and reorder levels.</p>
          </div>
          <div className="p-6 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Transfers</h2>
            <p className="text-sm text-gray-500">View and approve internal pharmacy transfers.</p>
          </div>
          <div className="p-6 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <h2 className="text-xl font-semibold mb-2">Reports</h2>
            <p className="text-sm text-gray-500">Generate reports on stock levels and expiring drugs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
