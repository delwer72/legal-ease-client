"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAllUsers, changeUserRole, deleteUser } from "@/lib/api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function ManageUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getAllUsers(token).then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      });
    }
  }, [token]);

  const handleRoleChange = async (id, role) => {
    try {
      await changeUserRole(token, id, role);
      setUsers((prev) => prev.map((u) => u._id === id ? { ...u, role } : u));
      toast.success("Role updated!");
    } catch {
      toast.error("Failed");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });
    if (result.isConfirmed) {
      await deleteUser(token, id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    }
  };

  if (loading) return <div className="text-center py-20"><div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0f172a] mb-6">Manage Users</h1>
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#0f172a] text-yellow-400">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Change Role</th>
              <th className="px-6 py-4 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="px-6 py-4 text-gray-500">{i + 1}</td>
                <td className="px-6 py-4 font-medium">{u.name}</td>
                <td className="px-6 py-4 text-gray-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="capitalize bg-yellow-100 text-yellow-700 px-3 py-0.5 rounded-full text-xs font-semibold">{u.role}</span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm outline-none focus:border-yellow-400"
                  >
                    <option value="user">User</option>
                    <option value="lawyer">Lawyer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(u._id)} className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-red-600 transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic'