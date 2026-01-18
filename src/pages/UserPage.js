import React from "react";
import { Link } from "react-router-dom";

const UserPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">RSMS</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              RSMS
              <span className="block text-teal-600 mt-2">
                Pelayanan Kesehatan Terpercaya
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Memberikan pelayanan kesehatan berkualitas dengan didukung oleh
              tenaga medis profesional dan peralatan medis modern untuk
              kesembuhan Anda.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-800 font-semibold">
                Layanan Gawat Darurat 24 Jam
              </p>
              <p className="text-red-700 text-2xl font-bold mt-1">
                Call: (022) 7272215
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/panel"
                className="bg-teal-600 text-white px-6 py-3 rounded-md text-center font-medium hover:bg-teal-700 transition-colors"
              >
                Daftar Online
              </Link>
              <a
                href="#layanan"
                className="bg-white text-gray-700 px-6 py-3 rounded-md text-center font-medium border-2 border-gray-300 hover:border-teal-600 hover:text-teal-600 transition-colors"
              >
                Lihat Layanan
              </a>
            </div>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Jam Operasional
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>Senin - Jumat</span>
                <span className="font-medium">08:00 - 20:00</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>Sabtu</span>
                <span className="font-medium">08:00 - 16:00</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>Minggu & Libur</span>
                <span className="font-medium">08:00 - 14:00</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-semibold text-red-600">IGD</span>
                <span className="font-semibold text-red-600">24 Jam</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan Section */}
      <section id="layanan" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Layanan Unggulan
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Berbagai layanan kesehatan terlengkap untuk kebutuhan Anda dan
              keluarga
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Rawat Jalan
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Konsultasi dengan dokter spesialis dan umum
              </p>
              <p className="text-teal-600 font-medium text-sm">
                Poliklinik Tersedia →
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Rawat Inap
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Ruang perawatan dengan fasilitas lengkap
              </p>
              <p className="text-teal-600 font-medium text-sm">
                Kelas VIP - III →
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Laboratorium
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Pemeriksaan lab lengkap & akurat
              </p>
              <p className="text-teal-600 font-medium text-sm">Hasil Cepat →</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Medical Check Up
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Paket pemeriksaan kesehatan rutin
              </p>
              <p className="text-teal-600 font-medium text-sm">Lihat Paket →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">RSMS</h2>
              <p className="text-gray-400 mb-4">
                JL. Khp Hasan Mustopa No.23, Neglasari,
                <br />
                Kec. Cibeunying Kaler, Kota Bandung,
                <br />
                Jawa Barat 40124
              </p>
              <div className="space-y-2 text-gray-400">
                <p>📞 Telp: (022) 7272215</p>
                <p>📧 Email: info@rsms-fe.vercel.app</p>
                <p className="text-red-400 font-semibold">
                  🚨 IGD: (022) 7272215
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Layanan</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Rawat Jalan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Rawat Inap
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    IGD
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Medical Check Up
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Informasi</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Jadwal Dokter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fasilitas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Karir
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Hubungi Kami
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 Rumah Sakit Modern. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserPage;
