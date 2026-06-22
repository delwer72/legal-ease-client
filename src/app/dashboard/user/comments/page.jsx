"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getMyComments, updateComment, deleteComment } from "@/lib/api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function MyComments() {
  const { token } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    if (token) {
      getMyComments(token).then((data) => {
        setComments(Array.isArray(data) ? data : []);
        setLoading(false);
      });
    }
  }, [token]);

  const handleEdit = async (id) => {
    try {
      await updateComment(token, id, editText);
      setComments((prev) => prev.map((c) => c._id === id ? { ...c, comment: editText } : c));
      setEditing(null);
      toast.success("Comment updated!");
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Comment?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });
    if (result.isConfirmed) {
      await deleteComment(token, id);
      setComments((prev) => prev.filter((c) => c._id !== id));
      toast.success("Comment deleted");
    }
  };

  if (loading) return <div className="text-center py-20"><div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0f172a] mb-6">My Comments</h1>
      {comments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">No comments yet.</div>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c._id} className="bg-white rounded-2xl shadow p-6">
              {editing === c._id ? (
                <div className="space-y-3">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-400 resize-none"
                  />
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(c._id)} className="bg-green-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition">Save</button>
                    <button onClick={() => setEditing(null)} className="border border-gray-300 px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-50 transition">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-700 mb-3">{c.comment}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => { setEditing(c._id); setEditText(c.comment); }}
                      className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-blue-600 transition"
                    >Edit</button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-red-600 transition"
                    >Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}