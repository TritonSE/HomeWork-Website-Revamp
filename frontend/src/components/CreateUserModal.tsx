import React, { useState } from "react";

import { createUser } from "../api/user";

type Props = {
  onClose: () => void;
};

const CreateUserModal: React.FC<Props> = ({ onClose }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const result = await createUser(form);

    if (result.success) {
      alert("Account created successfully");
      onClose();
    } else {
      alert(`Error creating account: ${result.error}`);
      console.error(result.error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-8 relative">
        <img src="/logo-dark.png" alt="Logo" className="w-32 mb-6" />

        <h2 className="text-2xl font-semibold mb-6">Create an Account</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter an email address"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => void handleSubmit()}
            className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
