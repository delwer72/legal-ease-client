import Link from "next/link";
import { FaBalanceScale } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center text-center p-4">
      <div>
        <FaBalanceScale className="text-yellow-400 text-8xl mx-auto mb-6" />
        <h1 className="text-9xl font-bold text-yellow-400">404</h1>
        <h2 className="text-3xl font-bold text-white mt-4 mb-3">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="bg-yellow-400 text-[#0f172a] px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
          Back to Home
        </Link>
      </div>
    </div>
  );
}