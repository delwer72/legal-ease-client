"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  const { dbUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !dbUser) router.push("/signin");
  }, [dbUser, loading, router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!dbUser) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 p-6 md:p-10 overflow-auto">{children}</main>
    </div>
  );
}