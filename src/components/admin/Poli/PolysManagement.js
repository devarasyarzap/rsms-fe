import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

const PolysManagement = () => {
  const navigate = useNavigate();
  const [polys, setPolys] = useState([]);

  const fetchPoli = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/master/polys`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setPolys(data.data || []);
    } catch (error) {
      console.error("Error fetching poli:", error);
    }
  };

  useEffect(() => {
    fetchPoli();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Polys Management</h2>
        </div>
        <button
          onClick={() => navigate("/panel/polys/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-lg hover:shadow-xl"
        >
          <IoAdd className="w-5 h-5" />
          Add Polys
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
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {polys.map((poly, index) => (
              <tr key={poly.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {poly.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {poly.location}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() =>
                      navigate(`/panel/patients/edit/${patient.id}`)
                    }
                    className="text-blue-600 hover:text-blue-800 font-medium mr-3 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className="text-red-600 hover:text-red-800 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PolysManagement;
