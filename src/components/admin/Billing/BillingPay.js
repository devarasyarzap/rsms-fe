import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  IoChevronBack,
  IoAlertCircle,
  IoCash,
  IoCheckmark,
  IoClose,
  IoCard,
  IoWallet,
} from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const BillingPay = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [bill, setBill] = useState(null);
  const [formData, setFormData] = useState({
    invoice_number: bill?.invoice_number || "",
    payment_method: "cash",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3005";

  const fetchBill = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/billing`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const foundBill = data.data?.find((b) => b.id === parseInt(id));
      setBill(foundBill);
      if (foundBill) {
        setFormData((prev) => ({
          ...prev,
          invoice_number: foundBill.invoice_number || "",
          amount_paid: foundBill.total_amount?.toString() || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching bill:", error);
      setError("Failed to load bill details");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchBill();
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

      const response = await fetch(`${API_BASE_URL}/api/billing/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          amount_paid: parseFloat(formData.amount_paid),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Payment processed successfully!", {
          duration: 3000,
        });
        navigate("/panel/billing");
      } else {
        setError(
          data.message || "Failed to process payment. Please try again.",
        );
        toast.error(data.message || "Failed to process payment.", {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <AiOutlineLoading3Quarters className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (!bill) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Bill not found</p>
      </div>
    );
  }

  const change =
    parseFloat(formData.amount_paid || 0) - (bill.total_amount || 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {console.log(formData)}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate("/panel/billing")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <IoChevronBack className="w-5 h-5 mr-2" />
            Back
          </button>
          <h2 className="text-3xl font-bold text-gray-900">Process Payment</h2>
          <p className="text-gray-500 mt-1">
            Complete the payment details below
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

      {/* Bill Info */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Bill Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Bill Number
            </label>
            <p className="text-gray-900 font-semibold">
              {bill.bill_number || `BILL-${bill.id}`}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Patient Name
            </label>
            <p className="text-gray-900 font-semibold">
              {bill.Patient?.name || bill.Registration?.Patient?.name || "-"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Date
            </label>
            <p className="text-gray-900">
              {bill.created_at
                ? new Date(bill.created_at).toLocaleDateString()
                : "-"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">
              Total Amount
            </label>
            <p className="text-gray-900 text-2xl font-bold text-blue-600">
              {formatCurrency(bill.total_amount || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Payment Method */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <IoWallet className="w-4 h-4 text-blue-600" />
                  Payment Method
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                required
              >
                <option value="cash">Cash</option>
                <option value="debit">Debit Card</option>
                <option value="credit">Credit Card</option>
                <option value="transfer">Bank Transfer</option>
              </select>
            </div>

            {/* Amount Paid */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2">
                  <IoCash className="w-4 h-4 text-blue-600" />
                  Amount Paid
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="number"
                name="amount_paid"
                value={formData.amount_paid}
                onChange={handleInputChange}
                placeholder="Enter amount paid..."
                min={bill.total_amount}
                step="0.01"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                required
              />
            </div>

            {/* Change */}
            {change > 0 && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <label className="block text-sm font-semibold text-green-700">
                  Change
                </label>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(change)}
                </p>
              </div>
            )}

            {change < 0 && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600">
                  Amount paid is less than the total amount
                </p>
              </div>
            )}
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
              disabled={loading || change < 0}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                  Processing...
                </>
              ) : (
                <>
                  <IoCheckmark className="w-5 h-5" />
                  Confirm Payment
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillingPay;
