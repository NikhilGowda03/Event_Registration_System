import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function RegisterForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  // 🔹 Validation logic
  const validate = (values) => {
    const errs = {};

    if (!values.name.trim()) {
      errs.name = "Name is required";
    } else if (!/^[A-Za-z ]{2,}$/.test(values.name)) {
      errs.name = "Name should contain only letters and spaces";
    }

    if (!values.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errs.email = "Enter a valid email address";
    }

    if (!values.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(values.phone)) {
      errs.phone = "Phone number must be 10 digits";
    }

    return errs;
  };

  const handleChange = (field, value) => {
    const updatedForm = { ...form, [field]: value };
    setForm(updatedForm);
    setErrors(validate(updatedForm));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await registerUser({
        eventId: id,
        name: form.name,
        email: form.email,
        phone: form.phone,
      });

      navigate("/success");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const isFormValid =
    form.name &&
    form.email &&
    form.phone &&
    Object.keys(errors).length === 0;

  return (
    <div className="max-w-md mx-auto p-8 mt-10 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Register for Event
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 outline-none transition-all ${
              errors.name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-500"
            }`}
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 outline-none transition-all ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-500"
            }`}
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            inputMode="numeric"
            maxLength="10"
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 outline-none transition-all ${
              errors.phone
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-500"
            }`}
            placeholder="9876543210"
            value={form.phone}
            onChange={(e) =>
              handleChange(
                "phone",
                e.target.value.replace(/\D/g, "")
              )
            }
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full font-semibold py-2 px-4 rounded-md transition-colors mt-2 ${
            isFormValid
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Complete Registration
        </button>
      </form>
    </div>
  );
}
