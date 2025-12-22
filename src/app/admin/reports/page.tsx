"use client";
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

export default function AdminReports() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/admin/reports');
      const result = await res.json();
      setData(result);
    };
    fetchData();
    const interval = setInterval(fetchData, 90000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="p-8 text-center">Loading Real-time Analytics...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-red-700">Admin Analytics & Reports</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
          <p className="text-gray-500">Total Active Donors</p>
          <h2 className="text-4xl font-bold">{data.stats.totalDonors}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
          <p className="text-gray-500">Pending Blood Requests</p>
          <h2 className="text-4xl font-bold">{data.stats.pendingRequests}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-gray-500">Units Collected Today</p>
          <h2 className="text-4xl font-bold">12 Units</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inventory Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Blood Inventory Level (Units)</h3>
          <Bar 
            data={{
              labels: data.inventory.map((i: any) => i._id),
              datasets: [{
                label: 'Stock Level',
                data: data.inventory.map((i: any) => i.totalUnits),
                backgroundColor: 'rgba(220, 38, 38, 0.6)',
              }]
            }} 
          />
        </div>

        {/* Trends Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Weekly Donation Activity</h3>
          <Line 
            data={{
              labels: data.trends.map((t: any) => t._id),
              datasets: [{
                label: 'Donations',
                data: data.trends.map((t: any) => t.count),
                borderColor: '#dc2626',
                tension: 0.3,
                fill: true
              }]
            }} 
          />
        </div>
      </div>
    </div>
  );
}