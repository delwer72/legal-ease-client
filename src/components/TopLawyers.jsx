import { getTopLawyers } from "@/lib/api";
import Image from "next/image";
import { FaTrophy } from "react-icons/fa";
import Link from "next/link";

export default async function TopLawyers() {
  const lawyers = await getTopLawyers().catch(() => []);

  return (
    <section className="bg-[#0f172a] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">Hall of Fame</span>
          <h2 className="text-3xl font-bold text-white mt-2">Top Legal Experts</h2>
          <p className="text-gray-400 mt-2">Most hired professionals on our platform</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.isArray(lawyers) && lawyers.map((lawyer, i) => (
            <Link href={`/lawyers/${lawyer._id}`} key={lawyer._id} className="bg-white/10 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:bg-white/20 transition">
              <div className="relative">
                <div className="relative w-16 h-16">
                  <Image src={lawyer.image || "https://placehold.co/200x200/0f172a/fbbf24?text=" + encodeURIComponent(lawyer.name?.[0] || "L")} alt={lawyer.name} fill className="rounded-full object-cover border-2 border-yellow-400" />
                </div>
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-[#0f172a] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <div>
                <h3 className="text-white font-bold">{lawyer.name}</h3>
                <p className="text-gray-400 text-sm">{lawyer.specialization} Law</p>
                <p className="text-yellow-400 text-sm flex items-center gap-1 mt-1">
                  <FaTrophy className="text-xs" />{lawyer.totalHires} hires
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}