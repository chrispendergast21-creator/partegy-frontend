export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
      <p className="mt-4 text-gray-600">Partnership analytics and insights.</p>
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <div className="text-2xl font-bold text-blue-600">24</div>
            <div className="text-sm text-blue-800">Active Partnerships</div>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <div className="text-2xl font-bold text-green-600">85%</div>
            <div className="text-sm text-green-800">Avg Health Score</div>
          </div>
        </div>
      </div>
    </div>
  );
}
