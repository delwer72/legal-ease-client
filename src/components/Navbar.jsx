"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaBalanceScale } from "react-icons/fa";

export default function Navbar() {
  const { dbUser, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const isActive = (path) =>
    pathname === path
      ? "text-yellow-400 font-semibold"
      : "text-white hover:text-yellow-300";

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) router.push(`/lawyers?search=${search}`);
  };

  const dashboardLink =
    dbUser?.role === "admin"
      ? "/dashboard/admin/manage-users"
      : dbUser?.role === "lawyer"
        ? "/dashboard/lawyer/hiring-history"
        : "/dashboard/user/hiring-history";

  return (
    <nav className="bg-[#0f172a] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white text-xl font-bold"
        >
          <FaBalanceScale className="text-yellow-400 text-2xl" />
          <span>
            Legal<span className="text-yellow-400">Ease</span>
          </span>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-white/10 rounded-full px-3 py-1 gap-2"
        >
          <FiSearch className="text-gray-300" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lawyers..."
            className="bg-transparent text-white placeholder-gray-400 outline-none text-sm w-48"
          />
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className={isActive("/")}>
            Home
          </Link>
          <Link href="/lawyers" className={isActive("/lawyers")}>
            Browse Lawyers
          </Link>
          {dbUser && (
            <Link href={dashboardLink} className={isActive(dashboardLink)}>
              Dashboard
            </Link>
          )}
          {loading ? null : dbUser ? (
            <div className="flex items-center gap-3">
              <img
                src={
                  typeof dbUser.image === "string" && dbUser.image
                    ? dbUser.image
                    : `https://placehold.co/100x100/0f172a/fbbf24?text=${encodeURIComponent(dbUser.name?.[0] || "U")}`
                }
                alt={dbUser.name}
                className="w-8 h-8 rounded-full border-2 border-yellow-400 object-cover"
              />
              <button
                onClick={logout}
                className="bg-yellow-400 text-[#0f172a] px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-yellow-300 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/signin"
              className="bg-yellow-400 text-[#0f172a] px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-yellow-300 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-2xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1e293b] px-4 pb-4 flex flex-col gap-3">
          <Link href="/" className="text-white py-2 border-b border-white/10">
            Home
          </Link>
          <Link
            href="/lawyers"
            className="text-white py-2 border-b border-white/10"
          >
            Browse Lawyers
          </Link>
          {dbUser && (
            <Link
              href={dashboardLink}
              className="text-white py-2 border-b border-white/10"
            >
              Dashboard
            </Link>
          )}
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 mt-2"
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lawyers..."
              className="bg-white/10 text-white rounded-full px-3 py-1.5 flex-1 outline-none text-sm"
            />
            <button type="submit" className="text-yellow-400">
              <FiSearch />
            </button>
          </form>
          {dbUser ? (
            <button
              onClick={logout}
              className="bg-yellow-400 text-[#0f172a] py-2 rounded-full font-semibold"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/signin"
              className="bg-yellow-400 text-[#0f172a] py-2 rounded-full font-semibold text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
