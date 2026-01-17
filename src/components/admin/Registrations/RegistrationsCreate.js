import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoChevronBack,
  IoAlertCircle,
  IoPersonCircle,
  IoMedkit,
  IoDocumentText,
  IoClose,
  IoCheckmark,
} from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const RegistrationsCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    complaint: "",
  });
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/registrations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        navigate("/admin/registrations");
      } else {
        const data = await response.json();
        setError(
          data.message || "Failed to create registration. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error creating registration:", error);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/patients/data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setPatients(data.data || []);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/master/doctors`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setDoctors(data.data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/admin/registrations")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <IoChevronBack className="w-5 h-5 mr-2" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-gray-900">
            Register Patient Visit
          </h2>
          <p className="text-gray-500 mt-1">
            Fill in the registration details below
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

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <IoPersonCircle className="w-4 h-4 text-blue-600" />
                  Patient
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                name="patient_id"
                value={formData.patient_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white"
                required
              >
                <option value="" disabled>
                  Select Patient
                </option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.nik}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <IoMedkit className="w-4 h-4 text-blue-600" />
                  Doctor
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white"
                required
              >
                <option value="" disabled>
                  Select Doctor
                </option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>

            {/* Complaint */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <IoDocumentText className="w-4 h-4 text-blue-600" />
                  Complaint
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <textarea
                name="complaint"
                value={formData.complaint}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe the patient's complaint..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-none"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/admin/registrations")}
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
                  Saving...
                </>
              ) : (
                <>
                  <IoCheckmark className="w-5 h-5" />
                  Register Visit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationsCreate;
