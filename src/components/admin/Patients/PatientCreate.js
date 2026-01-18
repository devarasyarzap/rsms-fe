import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoChevronBack,
  IoAlertCircle,
  IoCard,
  IoPersonCircle,
  IoCall,
  IoCalendar,
  IoPeople,
  IoLocationSharp,
  IoClose,
  IoCheckmark,
} from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbGenderBigender } from "react-icons/tb";

const PatientCreate = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nik: "",
    name: "",
    date_of_birth: "",
    gender: "",
    address: "",
    phone: "",
    user_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
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
        `${process.env.REACT_APP_API_URL}/api/patients/create`,
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
        navigate("/panel/patients");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to save patient");
      }
    } catch (error) {
      console.error("Error saving patient:", error);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/master/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/panel/patients")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <IoChevronBack className="w-5 h-5 mr-2" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-gray-900">Add New Patient</h2>
          <p className="text-gray-500 mt-1">
            Fill in the patient details below
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
            {/* NIK */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <IoCard className="w-4 h-4 text-blue-600" />
                  NIK
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="nik"
                value={formData.nik}
                onChange={handleInputChange}
                placeholder="Enter NIK number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <IoPeople className="w-4 h-4 text-blue-600" />
                  Users
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                name="user_id"
                value={formData.user_id}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white"
              >
                <option value="" disabled>
                  Pilih User
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.full_name} ({user.username})
                  </option>
                ))}
              </select>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <IoPersonCircle className="w-4 h-4 text-blue-600" />
                  Full Name
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <IoCall className="w-4 h-4 text-blue-600" />
                  Phone Number
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="08xx-xxxx-xxxx"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <IoCalendar className="w-4 h-4 text-blue-600" />
                  Date of Birth
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <TbGenderBigender className="w-4 h-4 text-blue-600" />
                  Gender
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-white"
              >
                <option value="" disabled>
                  Pilih Gender
                </option>
                <option value="L">Laki Laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>

            {/* Address - Full Width */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <IoLocationSharp className="w-4 h-4 text-blue-600" />
                  Address
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="4"
                placeholder="Enter complete address"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none resize-none"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/panel/patients")}
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
                  Create Patient
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientCreate;
