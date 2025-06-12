import React, { useState } from "react";

import { createUser } from "../api/user";

import { useAuthState } from "@/contexts/userContext";

type Props = {
  onClose: () => void;
};

const CreateUserModal: React.FC<Props> = ({ onClose }) => {
  const { firebaseUser } = useAuthState();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const getAuthToken = async (): Promise<string> => {
    if (!firebaseUser) {
      throw new Error("User not authenticated");
    }
    const token = await firebaseUser.getIdToken();
    if (!token) {
      throw new Error("No authentication token available");
    }
    return token;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const token = await getAuthToken();
      const response = await createUser({ ...form, token });
      if (response.success) {
        alert("Account created successfully");
        onClose();
      } else {
        alert("Error creating account");
        console.error(response.error);
      }
    } catch (err) {
      console.error(err);
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
