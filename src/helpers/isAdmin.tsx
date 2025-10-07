import { Session } from "next-auth";

export const isAdmin = (session: Session | null | undefined) => {
  if (!session || !session.user) return false;

  return session.user?.role === "admin";
};
