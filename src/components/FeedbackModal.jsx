import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleFeedback } from "../redux/postsSlice";

export default function FeedbackModal() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    country: "",
    email: "",
    phoneNumber: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: ""
  });

  const dispatch = useDispatch();
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(toggleFeedback());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (name === 'email' || name === 'phoneNumber') {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = () => {
    let newErrors = { email: "", phoneNumber: "" };
    let isValid = true;

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Please enter a valid e-mail";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid e-mail";
      isValid = false;
    }

    // Validate phone number
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Please enter a valid number";
      isValid = false;
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid number";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      alert("Feedback submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        country: "",
        email: "",
        phoneNumber: ""
      });
      dispatch(toggleFeedback());
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-gray-100 p-8 rounded-2xl w-full max-w-[420px] shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-2 text-gray-900">
          Thank you so much for taking the time!
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Please provide the below details!
        </p>

        <div className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address:
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full Postal Address"
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white resize-none"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country:
            </label>
            <div className="relative">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="India"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white pr-10"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Email ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email ID:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@example.com"
              className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 bg-white ${
                errors.email
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-emerald-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value="+91"
                readOnly
                className="w-16 border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-gray-100 text-center"
              />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="1234567890"
                maxLength="10"
                className={`flex-1 border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 bg-white ${
                  errors.phoneNumber
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-emerald-400"
                }`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-medium py-3 rounded-lg transition-colors mt-6"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}