import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  IoChevronBack,
  IoAlertCircle,
  IoMedkit,
  IoCheckmark,
  IoClose,
  IoPersonCircle,
} from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const MedicalRecordDispense = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [record, setRecord] = useState(null);
  const [pharmacy, setPharmacy] = useState([]);
  const [formData, setFormData] = useState({
    medical_record_id: id,
    medicine_id: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3005";

  const fetchMedicalRecord = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_BASE_URL}/api/master/medical-records`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      const foundRecord = data.data?.find((r) => r.id === parseInt(id));
      setRecord(foundRecord);
    } catch (error) {
      console.error("Error fetching medical record:", error);
      setError("Failed to load medical record");
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchPharmacy = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/pharmacy/medicines`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setPharmacy(data.data || []);
    } catch (error) {
      console.error("Error fetching pharmacy data:", error);
      setError("Failed to load pharmacy data");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicalRecord();
    fetchPharmacy();
  }, [id]);

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

      const response = await fetch(`${API_BASE_URL}/api/pharmacy/dispense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/panel/medical-record");
      } else {
        const data = await response.json();
        setError(
          data.message || "Failed to dispense medicine. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error dispensing medicine:", error);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <AiOutlineLoading3Quarters className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (!record) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Medical record not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/panel/medical-record")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <IoChevronBack className="w-5 h-5 mr-2" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-gray-900">
            Dispense Medicine
          </h2>
          <p className="text-gray-500 mt-1">
            Fill in the dispensing details below
          </p>
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

      {/* Medical Record Info */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Medical Record Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Patient Name
            </label>
            <p className="text-gray-900 font-semibold">
              {record.Registration?.Patient?.name || "-"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Date
            </label>
            <p className="text-gray-900">
              {record.created_at
                ? new Date(record.created_at).toLocaleDateString()
                : "-"}
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500">
              Diagnosis
            </label>
            <p className="text-gray-900">{record.diagnosis || "-"}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500">
              Prescription
            </label>
            <p className="text-gray-900 whitespace-pre-wrap">
              {record.prescription || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Dispense Form */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Notes */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <IoMedkit className="w-4 h-4 text-blue-600" />
                  Medicine
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                name="medicine_id"
                value={formData.medicine_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white"
              >
                <option value="" disabled selected>
                  Pilih Medicine
                </option>
                {pharmacy.map((medicine) => (
                  <option key={medicine.id} value={medicine.id}>
                    {medicine.name} ({medicine.stock} in stock)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <IoPersonCircle className="w-4 h-4 text-blue-600" />
                  Quantity
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/panel/medical-record")}
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
                  Dispensing...
                </>
              ) : (
                <>
                  <IoCheckmark className="w-5 h-5" />
                  Confirm Dispense
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecordDispense;
