import Link from "next/link";
import { FaGavel, FaBuilding, FaUsers, FaFileInvoiceDollar, FaHome, FaPlane, FaBriefcase, FaHandshake } from "react-icons/fa";

const categories = [
  { name: "Criminal", icon: <FaGavel />, color: "bg-red-500" },
  { name: "Corporate", icon: <FaBuilding />, color: "bg-blue-500" },
  { name: "Family", icon: <FaUsers />, color: "bg-pink-500" },
  { name: "Tax", icon: <FaFileInvoiceDollar />, color: "bg-green-500" },
  { name: "Property", icon: <FaHome />, color: "bg-amber-500" },
  { name: "Immigration", icon: <FaPlane />, color: "bg-purple-500" },
  { name: "Labor", icon: <FaBriefcase />, color: "bg-yellow-500" },
  { name: "Civil", icon: <FaHandshake />, color: "bg-cyan-500" },
];

export default function LegalCategories() {
  return (
    <section className="bg-[#070b14] py-16 relative overflow-hidden">
      {/* Dot grid background, same as hero */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(148,163,184,0.15) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="absolute top-0 right-0 w-[24rem] h-[24rem] bg-blue-500/10 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-300 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Explore
          </span>
          <h2 className="text-3xl font-bold text-white mt-4">Legal Categories</h2>
          <p className="text-gray-400 mt-2">Find experts in your area of legal need</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/lawyers?specialization=${cat.name}`}
              className="flex flex-col items-center gap-3 p-6 bg-[#0f172a] rounded-2xl border border-white/10 hover:border-cyan-400/40 hover:bg-[#1e293b] transition group"
            >
              <div className={`${cat.color} text-white text-2xl p-4 rounded-2xl group-hover:scale-110 transition shadow-lg`}>
                {cat.icon}
              </div>
              <span className="font-semibold text-white text-sm">{cat.name} Law</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}