import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoChevronBack,
  IoAlertCircle,
  IoClose,
  IoCheckmark,
  IoMedkit,
} from "react-icons/io5";
import {
  AiOutlineFieldNumber,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";
import { TbGenderBigender } from "react-icons/tb";
import { MdOutlineClass } from "react-icons/md";

const InpatientCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patient_id: "",
    diagnosis: "",
    doctor_id: "",
    bed_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wardClasses, setWardClasses] = useState([]);
  const [beds, setBeds] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

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

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/inpatient/admit`,
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
        navigate("/panel/inpatients");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to save beds");
      }
    } catch (error) {
      console.error("Error saving beds:", error);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      setError("Failed to fetch ward classes. Please try again.");
    }
  };

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
      setError("Failed to fetch beds. Please try again.");
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
      setError("Failed to fetch doctors. Please try again.");
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
      setError("Failed to fetch patients. Please try again.");
    }
  };

  useEffect(() => {
    fetchWardClasses();
    fetchBeds();
    fetchDoctors();
    fetchPatients();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/panel/inpatients")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <IoChevronBack className="w-5 h-5 mr-2" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-gray-900">
            Add New Inpatient
          </h2>
          <p className="text-gray-500 mt-1">
            Fill in the inpatient details below
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
            {/* Bed Number */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <MdOutlineClass className="w-4 h-4 text-blue-600" />
                  Patient
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                name="patient_id"
                value={formData.patient_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white"
              >
                <option value="" disabled selected>
                  Pilih Patient
                </option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <MdOutlineClass className="w-4 h-4 text-blue-600" />
                  Doctor
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                name="doctor_id"
                value={formData.doctor_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white"
              >
                <option value="" disabled selected>
                  Pilih Doctor
                </option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Beds */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <MdOutlineClass className="w-4 h-4 text-blue-600" />
                  Beds
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                name="bed_id"
                value={formData.bed_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white"
              >
                <option value="" disabled selected>
                  Pilih Beds
                </option>
                {beds.map((bed) => (
                  <option key={bed.id} value={bed.id}>
                    {bed.bed_number}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <IoMedkit className="w-4 h-4 text-blue-600" />
                  Diagnosis
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <textarea
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleInputChange}
                rows="4"
                placeholder="Enter diagnosis details..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-none"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/panel/inpatients")}
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
                  Create Inpatient
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InpatientCreate;
