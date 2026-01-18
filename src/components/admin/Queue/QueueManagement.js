import React, { useState, useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const QueueManagement = () => {
  const navigate = useNavigate();
  const [queues, setQueues] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3005";

  const fetchQueues = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/doctor/queue`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setQueues(data.data || []);
    } catch (error) {
      console.error("Error fetching queues:", error);
    }
  };

  useEffect(() => {
    fetchQueues();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Queues</h2>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Complaint
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {queues.map((queue, index) => (
              <tr key={queue.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {queue.Patient.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {queue.complaint ?? "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      queue.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : queue.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {queue.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => navigate(`/panel/queue/${queue.id}`)}
                    className="text-blue-600 hover:text-blue-800 font-medium mr-3 transition-colors"
                  >
                    Examine
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueueManagement;
