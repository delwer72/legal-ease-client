"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaBriefcase, FaDollarSign } from "react-icons/fa";
import Image from "next/image";

export default function LawyerCard({ lawyer, index = 0 }) {
  const imageSrc =
    typeof lawyer.image === "string" && lawyer.image
      ? lawyer.image
      : `https://placehold.co/400x300/0f172a/fbbf24?text=${encodeURIComponent(lawyer.name?.[0] || "L")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="bg-[#0f172a] rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-white/10 hover:border-cyan-400/30"
    >
      <div className="relative h-48 bg-gradient-to-br from-[#1e293b] to-[#0f172a]">
        <Image src={imageSrc} alt={lawyer.name} fill className="object-cover opacity-90" />
        {lawyer.status === "Busy" && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            Busy
          </span>
        )}
        {lawyer.status === "Available" && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            Available
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-white text-lg">{lawyer.name}</h3>
        <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
          <FaBriefcase className="text-cyan-400" />
          <span>{lawyer.specialization}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
          <FaDollarSign className="text-cyan-400" />
          <span>${lawyer.fee}/hr</span>
        </div>
        <Link
          href={`/lawyers/${lawyer._id}`}
          className="mt-4 block text-center bg-gradient-to-r from-blue-500 to-cyan-400 text-[#070b14] py-2 rounded-full font-semibold text-sm hover:opacity-90 transition"
        >
          View Profile
        </Link>
      </div>
    </motion.div>
  );
}