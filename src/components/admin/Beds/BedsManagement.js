import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

const BedsManagement = () => {
  const navigate = useNavigate();
  const [beds, setBeds] = useState([]);

  // Fetch patients
  const fetchBeds = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/master/beds`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setBeds(data || []);
    } catch (error) {
      console.error("Error fetching beds:", error);
    }
  };

  useEffect(() => {
    fetchBeds();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Beds Management</h2>
        </div>
        <button
          onClick={() => navigate("/panel/beds/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-lg hover:shadow-xl"
        >
          <IoAdd className="w-5 h-5" />
          Add Beds
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Beds Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ward Class
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {beds.map((bed, index) => (
              <tr key={bed.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {bed.bed_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {bed.WardClass?.class_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      bed.status === "available"
                        ? "bg-green-100 text-green-800"
                        : bed.status === "occupied"
                          ? "bg-red-100 text-red-800"
                          : bed.status === "maintenance"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {bed.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BedsManagement;
