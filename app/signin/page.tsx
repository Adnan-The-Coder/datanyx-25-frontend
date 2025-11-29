"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit data
    console.log("Form submitted:", formData);
    window.location.href = "/dashboard";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#03142d] via-[#062a4f] to-[#03142d] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/10"
      >
        <div className="p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Brain className="w-8 h-8 text-[#2f80ed]" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#2f80ed] to-[#56cfe1] bg-clip-text text-transparent">
              Grania AI
            </span>
          </div>

          <h2 className="text-2xl font-bold text-center text-[#03142d] mb-2">Patient Intake</h2>
          <p className="text-center text-gray-500 mb-8">Enter your general information to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#2f80ed] focus:ring-2 focus:ring-[#2f80ed]/20 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="age" className="text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#2f80ed] focus:ring-2 focus:ring-[#2f80ed]/20 outline-none transition-all"
                  placeholder="65"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="weight" className="text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  required
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#2f80ed] focus:ring-2 focus:ring-[#2f80ed]/20 outline-none transition-all"
                  placeholder="70"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#2f80ed] focus:ring-2 focus:ring-[#2f80ed]/20 outline-none transition-all appearance-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2f80ed] to-[#56cfe1] text-white font-semibold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 mt-6"
            >
              Continue to Dashboard
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-[#2f80ed] transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
