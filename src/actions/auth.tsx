"use server";
import { FieldValues } from "react-hook-form";

export const register = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 Cookie allow
    body: JSON.stringify(data),
  });

  if (!res?.ok) {
    console.error("User Registration Failed", await res.text());
  }
  return await res.json();
};

export const login = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 Cookie allow
    body: JSON.stringify(data),
  });

  if (!res?.ok) {
    console.error("Login Failed", await res.text());
  }
  return await res.json();
};
export const logout = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 🔥 Cookie allow
  });

  if (!res?.ok) {
    console.error("Logout Failed", await res.text());
  }
  return await res.json();
};