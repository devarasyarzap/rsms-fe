import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiHome, HiUsers, HiClipboardList } from "react-icons/hi";
import { GiMedicines } from "react-icons/gi";
import { HiDotsVertical } from "react-icons/hi";
import { FaHospital, FaHospitalUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Ambil data user dari localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: HiHome },
    { name: "Users", href: "/admin/users", icon: HiUsers },
    { name: "Doctor", href: "/admin/doctor", icon: FaUserDoctor },
    { name: "Patients", href: "/admin/patients", icon: FaHospitalUser },
    { name: "Polyclinics", href: "/admin/polys", icon: FaHospital },
    { name: "Medicines", href: "/admin/medicines", icon: GiMedicines },
    {
      name: "Registrations",
      href: "/admin/registrations",
      icon: HiClipboardList,
    },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RS</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                RSMS Panel
              </h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {userData?.username?.substring(0, 2).toUpperCase() || "AD"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate capitalize">
                  {userData?.username || "Admin"}
                </p>
                <p className="text-xs text-gray-500 truncate capitalize">
                  {userData?.role || "Administrator"}
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <HiDotsVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
