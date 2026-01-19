import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import Overview from "../components/admin/Dashboard/Overview";
import PatientsManagement from "../components/admin/Patients/PatientsManagement";
import PatientCreate from "../components/admin/Patients/PatientCreate";
import RegistrationsView from "../components/admin/Registrations/RegistrationsView";
import MedicinesManagement from "../components/admin/Medicine/MedicinesManagement";
import UsersManagement from "../components/admin/Users/UsersManagement";
import UsersCreate from "../components/admin/Users/UsersCreate";
import PolysManagement from "../components/admin/Poli/PolysManagement";
import PolysCreate from "../components/admin/Poli/PolysCreate";
import MedicineCreate from "../components/admin/Medicine/MedicineCreate";
import DoctorManagement from "../components/admin/Doctor/DoctorManagement";
import DoctorCreate from "../components/admin/Doctor/DoctorCreate";
import RegistrationsCreate from "../components/admin/Registrations/RegistrationsCreate";
import ProtectedRoute from "../components/ProtectedRoute";
import RegistrationsSelf from "../components/admin/Registrations/RegistrationsSelf";
import QueueManagement from "../components/admin/Queue/QueueManagement";
import QueueExamine from "../components/admin/Queue/QueueExamine";
import WardClassManagement from "../components/admin/WardClass/WardClassManagement";
import WardClassCreate from "../components/admin/WardClass/WardClassCreate";
import BedsManagement from "../components/admin/Beds/BedsManagement";
import BedsCreate from "../components/admin/Beds/BedsCreate";
import InpatientManagement from "../components/admin/Inpatient/InpatientManagement";
import InpatientCreate from "../components/admin/Inpatient/InpatientCreate";
import MedicalRecordManagement from "../components/admin/MedicalRecord/MedicalRecordManagement";
import MedicalRecordDispense from "../components/admin/MedicalRecord/MedicalRecordDispense";
import BillingManagement from "../components/admin/Billing/BillingManagement";
import BillingPay from "../components/admin/Billing/BillingPay";
import BillingGenerate from "../components/admin/Billing/BillingGenerate";

const PanelPage = () => {
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
            {/* Public Dashboard */}
            <Route path="/" element={<Overview />} />

            {/* Admin Only Routes */}
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={["admin", "kasir"]}>
                  <UsersManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/new"
              element={
                <ProtectedRoute allowedRoles={["admin", "kasir"]}>
                  <UsersCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/polys"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <PolysManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/polys/new"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <PolysCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/medicines"
              element={
                <ProtectedRoute allowedRoles={["apoteker"]}>
                  <MedicinesManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/medicines/new"
              element={
                <ProtectedRoute allowedRoles={["apoteker"]}>
                  <MedicineCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ward-classes"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <WardClassManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ward-classes/new"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <WardClassCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/beds"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <BedsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/beds/new"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <BedsCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inpatients"
              element={
                <ProtectedRoute allowedRoles={["kasir"]}>
                  <InpatientManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inpatients/new"
              element={
                <ProtectedRoute allowedRoles={["kasir"]}>
                  <InpatientCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <DoctorManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/new"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <DoctorCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/registrations/new"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <RegistrationsCreate />
                </ProtectedRoute>
              }
            />

            {/* Admin & Patient Routes */}
            <Route
              path="/patients"
              element={
                <ProtectedRoute allowedRoles={["admin", "kasir", "dokter"]}>
                  <PatientsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patients/new"
              element={
                <ProtectedRoute allowedRoles={["admin", "kasir"]}>
                  <PatientCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/registrations"
              element={
                <ProtectedRoute allowedRoles={["admin", "pasien", "kasir"]}>
                  <RegistrationsView />
                </ProtectedRoute>
              }
            />

            {/* Patient Only Routes */}
            <Route
              path="/registrations/self"
              element={
                <ProtectedRoute allowedRoles={["pasien"]}>
                  <RegistrationsSelf />
                </ProtectedRoute>
              }
            />

            {/* Doctor Only Routes */}
            <Route
              path="/queue"
              element={
                <ProtectedRoute allowedRoles={["dokter"]}>
                  <QueueManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/queue/:id"
              element={
                <ProtectedRoute allowedRoles={["dokter"]}>
                  <QueueExamine />
                </ProtectedRoute>
              }
            />

            {/* Apoteker Only Routes */}
            <Route
              path="/medical-record"
              element={
                <ProtectedRoute allowedRoles={["apoteker"]}>
                  <MedicalRecordManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/medical-record/dispense/:id"
              element={
                <ProtectedRoute allowedRoles={["apoteker"]}>
                  <MedicalRecordDispense />
                </ProtectedRoute>
              }
            />

            {/* Kasir Only Routes */}
            <Route
              path="/billing"
              element={
                <ProtectedRoute allowedRoles={["kasir"]}>
                  <BillingManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/billing/generate"
              element={
                <ProtectedRoute allowedRoles={["kasir"]}>
                  <BillingGenerate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/billing/pay/:id"
              element={
                <ProtectedRoute allowedRoles={["kasir"]}>
                  <BillingPay />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default PanelPage;
