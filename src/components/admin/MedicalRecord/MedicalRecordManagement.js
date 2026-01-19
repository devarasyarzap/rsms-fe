import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMedkit, IoEye } from "react-icons/io5";

const MedicalRecordManagement = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3005";

  const fetchMedicalRecords = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/api/master/medical-records`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      setRecords(data.data || []);
    } catch (error) {
      console.error("Error fetching medical records:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medical Records</h2>
          <p className="text-gray-500 mt-1">
            Manage patient medical records and prescriptions
          </p>
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
                Patient Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Diagnosis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Prescription
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  No medical records found
                </td>
              </tr>
            ) : (
              records.map((record, index) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.Registration?.Patient?.name || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {record.diagnosis || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {record.prescription || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        record.pharmacy_status === "completed"
                          ? "bg-green-100 text-green-800"
                          : record.pharmacy_status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {record.pharmacy_status || "pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.created_at
                      ? new Date(record.created_at).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {record.pharmacy_status !== "completed" && (
                      <button
                        onClick={() =>
                          navigate(
                            `/panel/medical-record/dispense/${record.id}`,
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition-colors"
                      >
                        <IoMedkit className="w-4 h-4" />
                        Dispense
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalRecordManagement;
