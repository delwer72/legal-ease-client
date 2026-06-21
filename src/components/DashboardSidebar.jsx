"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  FaHistory, FaUser, FaComments, FaUsers,
  FaCreditCard, FaChartBar, FaGavel, FaBriefcase,
} from "react-icons/fa";

const userLinks = [
  { href: "/dashboard/user/hiring-history", label: "Hiring History", icon: <FaHistory /> },
  { href: "/dashboard/user/comments", label: "My Comments", icon: <FaComments /> },
  { href: "/dashboard/user/update-profile", label: "Update Profile", icon: <FaUser /> },
];

const lawyerLinks = [
  { href: "/dashboard/lawyer/hiring-history", label: "Hiring Requests", icon: <FaBriefcase /> },
  { href: "/dashboard/lawyer/manage-legal-profile", label: "Manage Profile", icon: <FaGavel /> },
];

const adminLinks = [
  { href: "/dashboard/admin/manage-users", label: "Manage Users", icon: <FaUsers /> },
  { href: "/dashboard/admin/all-transactions", label: "All Transactions", icon: <FaCreditCard /> },
  { href: "/dashboard/admin/analytics", label: "Analytics", icon: <FaChartBar /> },
];

export default function DashboardSidebar() {
  const { dbUser } = useAuth();
  const pathname = usePathname();

  const links =
    dbUser?.role === "admin" ? adminLinks :
    dbUser?.role === "lawyer" ? lawyerLinks :
    userLinks;

  return (
    <aside className="w-64 min-h-screen bg-[#0f172a] text-white flex flex-col">
      <div className="p-6 border-b border-white/10">
        <p className="text-yellow-400 font-bold text-lg">Dashboard</p>
        <p className="text-gray-400 text-sm capitalize">{dbUser?.role}</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${
            pathname === "/dashboard" ? "bg-yellow-400 text-[#0f172a]" : "hover:bg-white/10"
          }`}
        >
          <FaUser /> My Profile
        </Link>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium ${
              pathname === link.href ? "bg-yellow-400 text-[#0f172a]" : "hover:bg-white/10"
            }`}
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}