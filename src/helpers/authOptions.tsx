import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
    token?: string;
  }
  interface Session {
    user: {
      id?: string;
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    token?: string;
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
        if (!credentials?.email || !credentials.password) return null;

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
            credentials: "include", // <--- cookie forward
          });

          if (!res.ok) return null;

          const data = await res.json();
          const user = data.data.user; // <-- backend থেকে user data

          if (!user) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: data.data.accessToken, // optional
          };
        } catch (err) {
          console.error(err);
          return null;
        }
      },
    }),
  ],

 callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.role = user.role;
      token.token = user.token; 
    }
    return token;
  },

  async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
    }
    session.token = token.token as string 
    return session;
  },
},

  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
};
