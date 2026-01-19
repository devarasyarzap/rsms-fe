import React, { useState, useEffect } from "react";

const Overview = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalRegistrations: 0,
    totalMedicines: 0,
  });
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3005";

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const patientsRes = await fetch(`${API_BASE_URL}/api/patients/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const patientsData = await patientsRes.json();
      const doctorsRes = await fetch(`${API_BASE_URL}/api/master/doctors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const doctorsData = await doctorsRes.json();
      const registrationsRes = await fetch(
        `${API_BASE_URL}/api/registrations`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const registrationsData = await registrationsRes.json();

      const todayRegistrations =
        registrationsData.data?.filter((item) => {
          if (!item.createdAt) return false;

          const itemDate = new Date(item.createdAt);
          const today = new Date();

          return (
            itemDate.getDate() === today.getDate() &&
            itemDate.getMonth() === today.getMonth() &&
            itemDate.getFullYear() === today.getFullYear()
          );
        }) || [];

      const medicinesRes = await fetch(
        `${API_BASE_URL}/api/pharmacy/medicines`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const medicinesData = await medicinesRes.json();

      setStats({
        totalPatients: patientsData.data?.length || 0,
        totalDoctors: doctorsData.data?.length || 0,
        totalRegistrations: todayRegistrations.length || 0,
        totalMedicines: medicinesData.data?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const statsCards = [
    {
      label: "Total Patients",
      value: stats.totalPatients,
      icon: "👥",
      color: "blue",
    },
    {
      label: "Total Doctors",
      value: stats.totalDoctors,
      icon: "👨‍⚕️",
      color: "green",
    },
    {
      label: "Registrations Today",
      value: stats.totalRegistrations,
      icon: "📋",
      color: "yellow",
    },
    {
      label: "Medicine Stock",
      value: stats.totalMedicines,
      icon: "💊",
      color: "purple",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
