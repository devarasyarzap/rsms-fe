import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const RegistrationsView = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3005";
  const { user } = useAuth();

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("token");
      const API_URL =
        user.role === "pasien"
          ? `${API_BASE_URL}/api/registrations/self`
          : `${API_BASE_URL}/api/registrations`;

      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setRegistrations(data.data || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Registrations</h2>
        </div>
        {user.role == "pasien" ? (
          <button
            onClick={() => navigate("/panel/registrations/self")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-lg hover:shadow-xl"
          >
            <IoAdd className="w-5 h-5" />
            Registrations Visit
          </button>
        ) : (
          <button
            onClick={() => navigate("/panel/registrations/new")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-lg hover:shadow-xl"
          >
            <IoAdd className="w-5 h-5" />
            Add Registrasions
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Patient ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Doctor ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Complaint
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {console.log(registrations)}
            {registrations.map((reg) => (
              <tr key={reg.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {reg.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reg.Patient.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {reg.Doctor.User.full_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {reg.complaint}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      reg.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : reg.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {reg.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(reg.registration_date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationsView;
