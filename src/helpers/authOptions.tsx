import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import jwt from "jsonwebtoken";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email: string;
      role: string;
      accessToken: string;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    email: string;
    role: string;
    accessToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.error("Email or password missing");
          return null;
        }

        try {
          // Backend login request
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            console.error("Login failed:", await res.text());
            return null;
          }

          const data = await res.json();

          // Expect backend returns: { user: { id, name, email, role }, accessToken, refreshToken }
          const { user, accessToken } = data;

          if (!accessToken || !user) return null;

          // Decode JWT (to verify role/email if needed)
          const decoded = jwt.decode(accessToken) as {
            userId: string;
            email: string;
            role: string;
          };

          // Return user info without password
          return {
            id: decoded?.userId || user.id,
            name: user.name,
            email: decoded?.email || user.email,
            role: decoded?.role || user.role,
            accessToken,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};
