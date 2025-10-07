"use client";

import { useForm } from "react-hook-form";
import { register as registerUser } from "../../../actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await registerUser(data);
      if (res?.success) {
        alert("✅ Registration successful! Please login.");
        router.push("/login");
      } else {
        alert("❌ Registration failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error!");
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <input
          {...register("name")}
          placeholder="Name"
          className="w-full p-2 border rounded mb-3"
        />
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-3"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
        />

        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
