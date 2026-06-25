"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/lib/api";
import { imageUpload } from "@/lib/imgUpload";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";

export default function UpdateProfile() {
  const { dbUser, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(dbUser?.image || "");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: dbUser?.name || "",
    phone: dbUser?.phone || "",
    address: dbUser?.address || "",
    city: dbUser?.city || "",
    country: dbUser?.country || "",
    bio: dbUser?.bio || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size must be under 2MB");
        return;
      }
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    else if (form.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";
    if (form.phone && !/^[0-9+\-\s()]{7,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      let imageUrl = dbUser?.image || "";
      if (imageFile) imageUrl = await imageUpload(imageFile);
      await updateProfile(token, { ...form, image: imageUrl });
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0f172a] mb-6">Update Profile</h1>
      <div className="bg-white rounded-2xl shadow p-8">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-3 mb-2">
            <div className="relative w-28 h-28 group">
              <Image
                src={preview || `https://placehold.co/200x200/0f172a/fbbf24?text=${form.name?.[0] || "U"}`}
                alt="Profile"
                fill
                className="rounded-full object-cover border-4 border-yellow-400"
              />
              <label className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer flex items-center justify-center">
                <FiCamera className="text-white text-2xl" />
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <p className="text-xs text-gray-400">Click photo to change • Max 2MB</p>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full border rounded-xl px-4 py-3 outline-none transition text-sm ${
                errors.name ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-yellow-400"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+880 1700 000000"
              className={`w-full border rounded-xl px-4 py-3 outline-none transition text-sm ${
                errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-yellow-400"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* City + Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                placeholder="Dhaka"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-400 transition text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                name="country"
                type="text"
                value={form.country}
                onChange={handleChange}
                placeholder="Bangladesh"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-400 transition text-sm"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              placeholder="123 Main Street"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-400 transition text-sm"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              placeholder="Tell something about yourself..."
              maxLength={300}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-400 resize-none transition text-sm"
            />
            <p className="text-xs text-gray-400 text-right mt-1">{form.bio.length}/300</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f172a] text-yellow-400 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-[#0f172a] transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic'