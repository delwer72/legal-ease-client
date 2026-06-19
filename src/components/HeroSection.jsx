"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Scale,
  Users,
} from "lucide-react";
import Link from "next/link";

const slides = [
  {
    title: "Find Trusted Lawyers For Every Legal Need",
    subtitle:
      "Connect with verified legal professionals specializing in family law, criminal defense, corporate law, immigration, and more.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Hire Experienced Legal Experts With Confidence",
    subtitle:
      "Browse lawyer profiles, compare expertise, and book consultations securely through LegalEase.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Grow Your Legal Practice And Reach More Clients",
    subtitle:
      "Join LegalEase as a verified lawyer and connect with people actively looking for legal services.",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function HeroSection() {
  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">

          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_100%]"
            >
              <div className="relative min-h-[700px]">

                {/* Background Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-blue-950/80 to-slate-900/60" />

                {/* Content */}
                <div className="relative z-10 mx-auto flex min-h-[700px] max-w-7xl items-center px-6">
                  <div className="max-w-3xl text-white">
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                      ⚖️ Trusted Legal Marketplace
                    </span>

                    <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
                      {slide.title}
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-gray-200 md:text-xl">
                      {slide.subtitle}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link
                        href="/lawyers"
                        className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:scale-105"
                      >
                        Browse Lawyers
                      </Link>

                      <Link
                        href="/signup"
                        className="rounded-xl border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-700"
                      >
                        Become a Lawyer
                      </Link>
                    </div>

                    {/* Stats */}
                    <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                        <Users className="mb-2" />
                        <h3 className="text-3xl font-bold">500+</h3>
                        <p className="text-sm text-gray-300">
                          Verified Lawyers
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                        <Scale className="mb-2" />
                        <h3 className="text-3xl font-bold">10K+</h3>
                        <p className="text-sm text-gray-300">
                          Legal Consultations
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                        <ShieldCheck className="mb-2" />
                        <h3 className="text-3xl font-bold">98%</h3>
                        <p className="text-sm text-gray-300">
                          Client Satisfaction
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Prev Button */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition hover:scale-110"
      >
        <ChevronLeft />
      </button>

      {/* Next Button */}
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition hover:scale-110"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-3 rounded-full transition-all ${
              selectedIndex === index
                ? "w-8 bg-white"
                : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}