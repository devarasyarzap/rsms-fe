import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import Overview from "../components/admin/Overview";
import PatientsManagement from "../components/admin/Patients/PatientsManagement";
import PatientCreate from "../components/admin/Patients/PatientCreate";
import RegistrationsView from "../components/admin/RegistrationsView";
import MedicinesManagement from "../components/admin/MedicinesManagement";
import UsersManagement from "../components/admin/Users/UsersManagement";
import UsersCreate from "../components/admin/Users/UsersCreate";
import PolysManagement from "../components/admin/Poli/PolysManagement";
import PolysCreate from "../components/admin/Poli/PolysCreate";

const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="lg:pl-64">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/users" element={<UsersManagement />} />
            <Route path="/users/new" element={<UsersCreate />} />
            <Route path="/polys" element={<PolysManagement />} />
            <Route path="/polys/new" element={<PolysCreate />} />
            <Route path="/patients" element={<PatientsManagement />} />
            <Route path="/patients/new" element={<PatientCreate />} />
            <Route path="/registrations" element={<RegistrationsView />} />
            <Route path="/medicines" element={<MedicinesManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
