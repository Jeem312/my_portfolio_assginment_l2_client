"use server";
import { cookies } from "next/headers";
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



export const login = async (data : FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const body = await res.json();

  console.log("LOGIN RESPONSE:", body);

  const token = body?.data?.accessToken; 

  if (res.ok && body?.success && token) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "accessToken",
      value: token,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      data: {
        accessToken: token,
        user: body.data.user,
      },
    };
  }

  return {
    success: false,
    message: body?.message || "Login failed",
  };
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