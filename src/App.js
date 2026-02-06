import React, { useState } from 'react';
import { MapPin, Clock, Leaf, Trophy, Navigation } from 'lucide-react';

const GreenRouteDashboard = () => {
  const [selectedDriver, setSelectedDriver] = useState(0);
  const [optimized, setOptimized] = useState(false);
  const [trafficIncident, setTrafficIncident] = useState(null);

  const initialDrivers = [
    {
      name: "Driver A",
      stops: [
        { id: 1, address: "123 Main St", lat: -1.2921, lng: 36.8219, eta: "9:00 AM" },
        { id: 2, address: "456 Oak Ave", lat: -1.2864, lng: 36.8172, eta: "9:30 AM" },
        { id: 3, address: "789 Pine Rd", lat: -1.2795, lng: 36.8145, eta: "10:00 AM" },
        { id: 4, address: "321 Elm St", lat: -1.2921, lng: 36.8100, eta: "10:30 AM" },
        { id: 5, address: "654 Birch Ln", lat: -1.2850, lng: 36.8050, eta: "11:00 AM" }
      ],
      metrics: { miles: 45, time: 180, co2: 22 }
    },
    {
      name: "Driver B",
      stops: [
        { id: 6, address: "111 Cedar Dr", lat: -1.2900, lng: 36.8300, eta: "9:15 AM" },
        { id: 7, address: "222 Maple Ct", lat: -1.2950, lng: 36.8250, eta: "9:45 AM" },
        { id: 8, address: "333 Spruce Way", lat: -1.2980, lng: 36.8200, eta: "10:15 AM" },
        { id: 9, address: "444 Ash Blvd", lat: -1.3000, lng: 36.8150, eta: "10:45 AM" },
        { id: 10, address: "555 Willow St", lat: -1.2920, lng: 36.8280, eta: "11:15 AM" }
      ],
      metrics: { miles: 38, time: 165, co2: 19 }
    },
    {
      name: "Driver C",
      stops: [
        { id: 11, address: "777 Poplar Ave", lat: -1.2800, lng: 36.8320, eta: "9:20 AM" },
        { id: 12, address: "888 Hickory Ln", lat: -1.2750, lng: 36.8270, eta: "9:50 AM" },
        { id: 13, address: "999 Walnut Dr", lat: -1.2700, lng: 36.8220, eta: "10:20 AM" },
        { id: 14, address: "100 Chestnut Rd", lat: -1.2650, lng: 36.8170, eta: "10:50 AM" },
        { id: 15, address: "200 Sycamore St", lat: -1.2780, lng: 36.8120, eta: "11:20 AM" }
      ],
      metrics: { miles: 42, time: 172, co2: 21 }
    }
  ];

  const [drivers, setDrivers] = useState(initialDrivers);

  const optimizeRoute = () => {
    const optimizedDrivers = drivers.map(driver => ({
      ...driver,
      stops: [...driver.stops].sort((a, b) => a.lat - b.lat),
      metrics: {
        miles: Math.round(driver.metrics.miles * 0.85),
        time: Math.round(driver.metrics.time * 0.88),
        co2: Math.round(driver.metrics.co2 * 0.85)
      }
    }));
    setDrivers(optimizedDrivers);
    setOptimized(true);
  };

  const simulateTraffic = () => {
    setTrafficIncident({ location: "Main St & Oak Ave", delay: 15 });
    setTimeout(() => setTrafficIncident(null), 5000);
  };

  const totalMetrics = drivers.reduce((acc, driver) => ({
    miles: acc.miles + driver.metrics.miles,
    time: acc.time + driver.metrics.time,
    co2: acc.co2 + driver.metrics.co2
  }), { miles: 0, time: 0, co2: 0 });

  const savings = optimized ? {
    miles: Math.round((initialDrivers.reduce((sum, d) => sum + d.metrics.miles, 0) - totalMetrics.miles)),
    time: Math.round((initialDrivers.reduce((sum, d) => sum + d.metrics.time, 0) - totalMetrics.time)),
    co2: Math.round((initialDrivers.reduce((sum, d) => sum + d.metrics.co2, 0) - totalMetrics.co2))
  } : { miles: 0, time: 0, co2: 0 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-green-800 flex items-center gap-3">
            <Leaf className="w-10 h-10" />
            GreenRoute Logistics
          </h1>
          <p className="text-gray-600 mt-2">Sustainable Delivery Route Optimization</p>
        </header>

        {trafficIncident && (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 rounded">
            <p className="font-bold text-red-800">Traffic Incident Alert!</p>
            <p className="text-red-700">Incident at {trafficIncident.location} - {trafficIncident.delay} min delay</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Miles</p>
                <p className="text-3xl font-bold text-green-600">{totalMetrics.miles}</p>
                {optimized && <p className="text-sm text-green-500">↓ {savings.miles} miles saved</p>}
              </div>
              <Navigation className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Time</p>
                <p className="text-3xl font-bold text-blue-600">{totalMetrics.time} min</p>
                {optimized && <p className="text-sm text-blue-500">↓ {savings.time} min saved</p>}
              </div>
              <Clock className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">CO₂ Emissions</p>
                <p className="text-3xl font-bold text-purple-600">{totalMetrics.co2} kg</p>
                {optimized && <p className="text-sm text-purple-500">↓ {savings.co2} kg reduced</p>}
              </div>
              <Leaf className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Route Map
            </h2>
            <div className="bg-gray-100 rounded-lg h-96 relative overflow-hidden">
              <svg className="w-full h-full">
                {drivers[selectedDriver].stops.map((stop, idx) => {
                  const x = ((stop.lng + 74.01) * 3000) % 500;
                  const y = ((stop.lat + 1.3) * 3000) % 400;
                  
                  return (
                    <g key={stop.id}>
                      {idx > 0 && (() => {
                        const prev = drivers[selectedDriver].stops[idx - 1];
                        const x1 = ((prev.lng + 74.01) * 3000) % 500;
                        const y1 = ((prev.lat + 1.3) * 3000) % 400;
                        return <line x1={x1} y1={y1} x2={x} y2={y} stroke="#10b981" strokeWidth="2" />;
                      })()}
                      <circle cx={x} cy={y} r="8" fill="#10b981" />
                      <text x={x + 12} y={y + 5} fontSize="12" fill="#374151">{idx + 1}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
            
            <div className="mt-4 flex gap-2">
              {drivers.map((driver, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDriver(idx)}
                  className={`px-4 py-2 rounded ${selectedDriver === idx ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                >
                  {driver.name}
                </button>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={optimizeRoute}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700"
              >
                Optimize Route
              </button>
              <button
                onClick={simulateTraffic}
                className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700"
              >
                Simulate Traffic
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Delivery Stops</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {drivers[selectedDriver].stops.map((stop, idx) => (
                  <div key={stop.id} className="border-l-4 border-green-500 pl-4 py-2 bg-gray-50 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">Stop {idx + 1}</p>
                        <p className="text-sm text-gray-600">{stop.address}</p>
                      </div>
                      <span className="text-sm text-gray-500">{stop.eta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                Driver Leaderboard
              </h2>
              <div className="space-y-3">
                {[...drivers]
                  .sort((a, b) => a.metrics.co2 - b.metrics.co2)
                  .map((driver, idx) => (
                    <div key={driver.name} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-gray-300' : 'bg-orange-300'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="font-semibold">{driver.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{driver.metrics.co2} kg CO₂</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenRouteDashboard;