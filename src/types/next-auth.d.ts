import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      role?: string | null;
    } & DefaultSession["user"];
    token?: string; 
  }

  interface User extends DefaultUser {
    id: string;
    role?: string | null;
    token?: string;
  }

  interface JWT {
    id?: string;
    role?: string;
    token?: string;
  }
}
