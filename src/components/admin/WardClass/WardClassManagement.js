import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

const WardClassManagement = () => {
  const navigate = useNavigate();
  const [wardClasses, setWardClasses] = useState([]);

  const fetchWardClasses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/master/ward-classes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setWardClasses(data.data || []);
    } catch (error) {
      console.error("Error fetching ward classes:", error);
    }
  };

  useEffect(() => {
    fetchWardClasses();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Ward Classes Management
          </h2>
        </div>
        <button
          onClick={() => navigate("/panel/ward-classes/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-lg hover:shadow-xl"
        >
          <IoAdd className="w-5 h-5" />
          Add Ward Class
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
                Class Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {wardClasses.map((wardClass, index) => (
              <tr key={wardClass.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {wardClass.class_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {wardClass.price_per_day}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WardClassManagement;
