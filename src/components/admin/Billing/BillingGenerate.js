import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoChevronBack,
  IoAlertCircle,
  IoCheckmark,
  IoClose,
} from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const BillingGenerate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    registration_id: "",
    medicine_cost: "",
    room_cost: "",
  });
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3005";

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/registrations`, {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const payload = {
        registration_id: parseInt(formData.registration_id),
        medicine_cost: parseFloat(formData.medicine_cost) || 0,
        room_cost: parseFloat(formData.room_cost) || 0,
      };

      const response = await fetch(`${API_BASE_URL}/api/billing/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate("/panel/billing");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to generate bill. Please try again.");
      }
    } catch (error) {
      console.error("Error generating bill:", error);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/panel/billing")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <IoChevronBack className="w-5 h-5 mr-2" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-gray-900">Generate Bill</h2>
          <p className="text-gray-500 mt-1">Create a new bill for patient</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <IoAlertCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Registration Selection (Optional) */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Registration <span className="text-red-500">*</span>
              </label>
              <select
                name="registration_id"
                value={formData.registration_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
              >
                <option value="" selected disabled>
                  Pilih Registrations
                </option>
                {registrations.map((reg) => (
                  <option key={reg.id} value={reg.id}>
                    {reg.Patient?.name} -{" "}
                    {new Date(reg.created_at).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  {/* <IoDocument className="w-4 h-4 text-blue-600" /> */}
                  Medicine Cost
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="medicine_cost"
                value={formData.medicine_cost}
                onChange={handleInputChange}
                placeholder="Enter medicine cost"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  {/* <IoDocument className="w-4 h-4 text-blue-600" /> */}
                  Room Cost
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="room_cost"
                value={formData.room_cost}
                onChange={handleInputChange}
                placeholder="Enter room cost"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/panel/billing")}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center gap-2"
              disabled={loading}
            >
              <IoClose className="w-5 h-5" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                  Generating...
                </>
              ) : (
                <>
                  <IoCheckmark className="w-5 h-5" />
                  Generate Bill
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingGenerate;
