"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBalanceScale, FaFacebook, FaLinkedin, FaTwitter, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-12 pb-6 relative">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white text-xl font-bold mb-3">
            <FaBalanceScale className="text-yellow-400" />
            <span>Legal<span className="text-yellow-400">Ease</span></span>
          </div>
          <p className="text-sm text-gray-400">Connecting you with expert legal counsel. Fast, secure, and trusted.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link href="/lawyers" className="hover:text-yellow-400 transition">Browse Lawyers</Link></li>
            <li><Link href="#" className="hover:text-yellow-400 transition">About Us</Link></li>
            <li><Link href="#" className="hover:text-yellow-400 transition">Contact</Link></li>
            <li><Link href="#" className="hover:text-yellow-400 transition">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Legal Categories</h3>
          <ul className="space-y-2 text-sm">
            {["Criminal", "Corporate", "Family", "Tax", "Property", "Immigration"].map((cat) => (
              <li key={cat}>
                <Link href={`/lawyers?specialization=${cat}`} className="hover:text-yellow-400 transition">{cat} Law</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-3">Subscribe for legal tips and updates.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="bg-white/10 text-white px-3 py-2 rounded-l-full text-sm outline-none flex-1"
            />
            <button className="bg-yellow-400 text-[#0f172a] px-4 py-2 rounded-r-full text-sm font-semibold hover:bg-yellow-300 transition">
              Subscribe
            </button>
          </div>
          <div className="flex gap-4 mt-5 text-xl">
            <a href="#" className="hover:text-yellow-400 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaLinkedin /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaTwitter /></a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-white/10 pt-5">
        © {new Date().getFullYear()} LegalEase. All rights reserved.
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-yellow-400 text-[#0f172a] flex items-center justify-center shadow-lg shadow-yellow-400/30 hover:bg-yellow-300 transition-all duration-300 ${
          showTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <FaArrowUp />
      </button>
    </footer>
  );
}