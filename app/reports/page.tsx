export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
      <p className="mt-4 text-gray-600">Generate and download partnership reports.</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Executive Summary</h3>
          <p className="text-gray-600 mb-4">High-level partnership overview</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Generate Report
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-2">Health Analysis</h3>
          <p className="text-gray-600 mb-4">Detailed health score breakdown</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}
