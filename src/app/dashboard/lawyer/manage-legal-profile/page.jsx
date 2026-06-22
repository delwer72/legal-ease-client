"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getMyLawyerProfile,
  createLawyerProfile,
  updateMyLawyerProfile,
  togglePublishProfile,
} from "@/lib/api";
import { imageUpload } from "@/lib/imgUpload";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiCamera, FiCheck, FiEye, FiEyeOff } from "react-icons/fi";
import {
  FaGavel, FaPhone, FaMapMarkerAlt, FaGlobe,
  FaLinkedin, FaTwitter, FaClock, FaLanguage,
  FaBriefcase, FaUniversity,
} from "react-icons/fa";

// ════════════════════════════════════════════
// Sub-components — OUTSIDE main function
// ════════════════════════════════════════════

const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl shadow p-6 space-y-4">
    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
      <span className="text-yellow-500 text-lg">{icon}</span>
      <h2 className="font-bold text-[#0f172a] text-base">{title}</h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, required, error, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const inputClass = (hasError) =>
  `w-full border rounded-xl px-4 py-3 outline-none transition text-sm ${
    hasError ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-yellow-400"
  }`;

// ════════════════════════════════════════════
// Constants
// ════════════════════════════════════════════

const specializations = [
  "Criminal", "Corporate", "Family", "Tax",
  "Property", "Immigration", "Civil", "Labor",
  "Intellectual Property", "Environmental", "Human Rights",
];

const languages = ["English", "Bengali", "Hindi", "Arabic", "French", "Urdu"];
const experienceOptions = ["1-2 years", "3-5 years", "6-10 years", "10+ years"];
const availabilityOptions = ["Available", "Busy", "Part-time"];

// ════════════════════════════════════════════
// Main Component
// ════════════════════════════════════════════

export default function ManageLegalProfile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    bio: "",
    specialization: "",
    fee: "",
    phone: "",
    city: "",
    country: "",
    experience: "",
    education: "",
    languages: [],
    availability: "Available",
    linkedin: "",
    twitter: "",
    consultationTime: "",
    achievements: "",
  });

  useEffect(() => {
    if (token) {
      getMyLawyerProfile(token).then((data) => {
        if (data && !data.message) {
          setProfile(data);
          setForm({
            name: data.name || "",
            bio: data.bio || "",
            specialization: data.specialization || "",
            fee: data.fee || "",
            phone: data.phone || "",
            city: data.city || "",
            country: data.country || "",
            experience: data.experience || "",
            education: data.education || "",
            languages: data.languages || [],
            availability: data.availability || "Available",
            linkedin: data.linkedin || "",
            twitter: data.twitter || "",
            consultationTime: data.consultationTime || "",
            achievements: data.achievements || "",
          });
          setPreview(data.image || "");
        }
        setLoading(false);
      });
    }
  }, [token]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleLanguageToggle = (lang) => {
    setForm((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error("Image must be under 2MB"); return; }
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.specialization) e.specialization = "Specialization is required";
    if (!form.fee || Number(form.fee) <= 0) e.fee = "Enter a valid fee";
    if (!form.bio.trim()) e.bio = "Bio is required";
    if (form.bio.trim().length < 30) e.bio = "Bio must be at least 30 characters";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors below");
      return;
    }
    setSaving(true);
    try {
      let imageUrl = profile?.image || "";
      if (imageFile) imageUrl = await imageUpload(imageFile);
      const data = { ...form, image: imageUrl };
      if (profile) {
        await updateMyLawyerProfile(token, data);
        toast.success("Profile updated!");
      } else {
        await createLawyerProfile(token, data);
        toast.success("Profile created!");
      }
      const updated = await getMyLawyerProfile(token);
      setProfile(updated);
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      await togglePublishProfile(token, !profile.published);
      setProfile((prev) => ({ ...prev, published: !prev.published }));
      toast.success(profile.published ? "Profile unpublished" : "Profile published!");
    } catch {
      toast.error("Action failed");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Manage Legal Profile</h1>
          <p className="text-gray-400 text-sm mt-1">
            {profile ? "Update your professional listing" : "Create your professional listing"}
          </p>
        </div>
        {profile && (
          <button
            onClick={handlePublish}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition ${
              profile.published
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {profile.published ? <FiEyeOff /> : <FiEye />}
            {profile.published ? "Unpublish" : "Publish Profile"}
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>

        {/* ── Photo ── */}
        <Section title="Profile Photo" icon={<FaGavel />}>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 group flex-shrink-0">
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="rounded-full object-cover border-4 border-yellow-400"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-yellow-400 flex items-center justify-center text-gray-300 text-4xl font-bold">
                  {form.name?.[0]?.toUpperCase() || "?"}
                </div>
              )}
              <label className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer flex items-center justify-center">
                <FiCamera className="text-white text-2xl" />
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Professional Photo</p>
              <p className="text-xs text-gray-400 mt-1">JPG or PNG • Max 2MB</p>
              <label className="mt-2 inline-block cursor-pointer bg-yellow-50 text-yellow-600 border border-yellow-200 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-yellow-100 transition">
                Choose Photo
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>
        </Section>

        {/* ── Basic Info ── */}
        <Section title="Basic Information" icon={<FaBriefcase />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <Field label="Full Name" required error={errors.name}>
              <input
                name="name" type="text" value={form.name}
                onChange={handleChange} placeholder="Adv. John Doe"
                className={inputClass(errors.name)}
              />
            </Field>

            <Field label="Specialization" required error={errors.specialization}>
              <select
                name="specialization" value={form.specialization}
                onChange={handleChange} className={inputClass(errors.specialization)}
              >
                <option value="">Select area of law</option>
                {specializations.map((s) => (
                  <option key={s} value={s}>{s} Law</option>
                ))}
              </select>
            </Field>

            <Field label="Consultation Fee ($/hr)" required error={errors.fee}>
              <input
                name="fee" type="number" min="1" value={form.fee}
                onChange={handleChange} placeholder="e.g. 150"
                className={inputClass(errors.fee)}
              />
            </Field>

            <Field label="Years of Experience">
              <select
                name="experience" value={form.experience}
                onChange={handleChange} className={inputClass(false)}
              >
                <option value="">Select experience</option>
                {experienceOptions.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </Field>

            <Field label="Availability">
              <select
                name="availability" value={form.availability}
                onChange={handleChange} className={inputClass(false)}
              >
                {availabilityOptions.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </Field>

            <Field label="Consultation Duration">
              <input
                name="consultationTime" type="text" value={form.consultationTime}
                onChange={handleChange} placeholder="e.g. 30 mins / 1 hour"
                className={inputClass(false)}
              />
            </Field>
          </div>

          <Field label="Bio / Professional Summary" required error={errors.bio}>
            <textarea
              name="bio" value={form.bio} onChange={handleChange}
              rows={4} maxLength={500}
              placeholder="Describe your expertise, background, and what clients can expect..."
              className={`${inputClass(errors.bio)} resize-none`}
            />
            <p className="text-xs text-gray-400 text-right mt-1">{form.bio.length}/500</p>
          </Field>
        </Section>

        {/* ── Education & Achievements ── */}
        <Section title="Education & Achievements" icon={<FaUniversity />}>
          <Field label="Educational Background">
            <input
              name="education" type="text" value={form.education}
              onChange={handleChange} placeholder="e.g. LLB, University of Dhaka"
              className={inputClass(false)}
            />
          </Field>
          <Field label="Key Achievements / Bar Memberships">
            <textarea
              name="achievements" value={form.achievements} onChange={handleChange}
              rows={3} maxLength={300}
              placeholder="e.g. Member of Bangladesh Bar Council, Won 200+ cases..."
              className={`${inputClass(false)} resize-none`}
            />
            <p className="text-xs text-gray-400 text-right mt-1">
              {(form.achievements || "").length}/300
            </p>
          </Field>
        </Section>

        {/* ── Languages ── */}
        <Section title="Languages Spoken" icon={<FaLanguage />}>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => {
              const selected = form.languages.includes(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => handleLanguageToggle(lang)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border-2 transition ${
                    selected
                      ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                      : "border-gray-200 text-gray-500 hover:border-yellow-200"
                  }`}
                >
                  {selected && <FiCheck className="text-yellow-600 text-xs" />}
                  {lang}
                </button>
              );
            })}
          </div>
        </Section>

        {/* ── Contact & Location ── */}
        <Section title="Contact & Location" icon={<FaMapMarkerAlt />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <Field label="Phone Number">
              <div className="relative">
                <FaPhone className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                <input
                  name="phone" type="tel" value={form.phone}
                  onChange={handleChange} placeholder="+880 1700 000000"
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 outline-none focus:border-yellow-400 transition text-sm"
                />
              </div>
            </Field>

            <Field label="City">
              <input
                name="city" type="text" value={form.city}
                onChange={handleChange} placeholder="Dhaka"
                className={inputClass(false)}
              />
            </Field>

            <Field label="Country">
              <div className="relative">
                <FaGlobe className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                <input
                  name="country" type="text" value={form.country}
                  onChange={handleChange} placeholder="Bangladesh"
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 outline-none focus:border-yellow-400 transition text-sm"
                />
              </div>
            </Field>

            <Field label="Consultation Hours">
              <div className="relative">
                <FaClock className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                <input
                  name="consultationTime" type="text" value={form.consultationTime}
                  onChange={handleChange} placeholder="e.g. Mon-Fri 9am-5pm"
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 outline-none focus:border-yellow-400 transition text-sm"
                />
              </div>
            </Field>
          </div>
        </Section>

        {/* ── Social Links ── */}
        <Section title="Social / Professional Links" icon={<FaLinkedin />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <Field label="LinkedIn Profile">
              <div className="relative">
                <FaLinkedin className="absolute left-3 top-3.5 text-blue-500 text-sm" />
                <input
                  name="linkedin" type="url" value={form.linkedin}
                  onChange={handleChange} placeholder="https://linkedin.com/in/..."
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 outline-none focus:border-yellow-400 transition text-sm"
                />
              </div>
            </Field>

            <Field label="Twitter / X Profile">
              <div className="relative">
                <FaTwitter className="absolute left-3 top-3.5 text-sky-400 text-sm" />
                <input
                  name="twitter" type="url" value={form.twitter}
                  onChange={handleChange} placeholder="https://twitter.com/..."
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 outline-none focus:border-yellow-400 transition text-sm"
                />
              </div>
            </Field>
          </div>
        </Section>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-[#0f172a] text-yellow-400 py-4 rounded-full font-bold text-base hover:bg-yellow-400 hover:text-[#0f172a] transition disabled:opacity-60 shadow-lg"
        >
          {saving ? "Saving..." : profile ? "✓ Update Profile" : "✓ Create Profile"}
        </button>

      </form>
    </div>
  );
}