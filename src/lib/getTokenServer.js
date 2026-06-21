import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getTokenServer = async () => {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.email) return null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/jwt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email }),
      cache: "no-store",
    });
    const data = await res.json();
    return data.token;
  } catch {
    return null;
  }
};