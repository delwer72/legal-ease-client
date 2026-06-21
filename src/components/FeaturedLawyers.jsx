import { getFeaturedLawyers } from "@/lib/api";
import LawyerCard from "./LawyerCard";

export default async function FeaturedLawyers() {
  const lawyers = await getFeaturedLawyers().catch(() => []);

  return (
    <section className="bg-[#070b14] py-16 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(148,163,184,0.15) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="absolute bottom-0 left-0 w-[24rem] h-[24rem] bg-cyan-400/10 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-300 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Top Professionals
          </span>
          <h2 className="text-3xl font-bold text-white mt-4">Featured Lawyers</h2>
          <p className="text-gray-400 mt-2">Browse our latest verified legal experts</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {Array.isArray(lawyers) && lawyers.map((lawyer, i) => (
            <LawyerCard key={lawyer._id} lawyer={lawyer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}