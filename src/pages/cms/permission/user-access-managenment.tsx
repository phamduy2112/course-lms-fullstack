import React, { useState } from "react";
import type { RoleKey, UserRow } from "./components/multi-role-select";
import MultiRoleSelect from "./components/multi-role-select";

const initialUsers: UserRow[] = [
  {
    id: "u1",
    name: "Alex Rivera",
    email: "alex.r@techai.edu",
    joinedDate: "Oct 12, 2023",
    lastActive: "2 mins ago",
    status: "Active",
    roles: ["admin", "moderator"],
  },
  {
    id: "u2",
    name: "Sarah Chen",
    email: "s.chen@techai.edu",
    joinedDate: "Jan 05, 2024",
    lastActive: "5 hours ago",
    status: "Active",
    roles: ["moderator"],
  },
  {
    id: "u3",
    name: "Marcus Thorne",
    email: "m.thorne@external.com",
    joinedDate: "Mar 22, 2024",
    lastActive: "3 days ago",
    status: "Pending",
    roles: ["student", "instructor"],
  },
  {
    id: "u4",
    name: "Jordan Lee",
    email: "j.lee@techai.edu",
    joinedDate: "Nov 30, 2023",
    lastActive: "1 month ago",
    status: "Suspended",
    roles: ["instructor"],
  },
];

export default function UserAccessManagement() {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);

  const updateUserRoles = (userId: string, roles: RoleKey[]) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, roles } : u)));

    // ✅ Nếu có API:
    // await fetch(`/api/users/${userId}/roles`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ roles }),
    // });
  };

  const statusBadge = (s: UserRow["status"]) => {
    if (s === "Active")
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (s === "Pending")
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    return "bg-red-500/10 text-red-400 border-red-500/20";
  };

  return (
    <main className="flex-1 overflow-y-auto bg-[#0e1020]">
      <div className="max-w-6xl mx-auto py-8 px-6">
        <div className="flex flex-wrap justify-between items-end gap-3 mb-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-black tracking-[-0.033em] text-white">
              User Access Management
            </h1>
            <p className="text-[#909acb] text-base">
              Assign roles and manage granular permissions for staff and learners.
            </p>
          </div>

          <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-primary/90 transition-all">
            <span className="material-symbols-outlined">person_add</span>
            Invite New User
          </button>
        </div>

        <div className="bg-[#1a1f37] rounded-xl border border-[#222949] overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#222949] bg-[#222949]/30">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#909acb]">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#909acb]">
                  Current Roles
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#909acb]">
                  Joined Date
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#909acb]">
                  Last Active
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#909acb]">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#909acb] text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#222949]">
              {users.map((u) => (
                <tr key={u.id} className="transition-all group hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full border border-primary/20 bg-[#222949]" />
                      <div>
                        <p className="text-sm font-bold text-white">{u.name}</p>
                        <p className="text-xs text-[#909acb]">{u.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* ✅ changed: select -> multi role */}
                  <td className="px-6 py-4">
                    <MultiRoleSelect
                      value={u.roles}
                      onChange={(next) => updateUserRoles(u.id, next)}
                    />
                  </td>

                  <td className="px-6 py-4 text-sm text-[#909acb]">{u.joinedDate}</td>
                  <td className="px-6 py-4 text-sm text-[#909acb]">{u.lastActive}</td>

                  <td className="px-6 py-4">
                    <span
                      className={[
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        statusBadge(u.status),
                      ].join(" ")}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button className="text-xs font-bold text-primary hover:text-white hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-all">
                        Log
                      </button>
                      <button className="p-1.5 text-[#909acb] hover:text-white hover:bg-[#222949] rounded-lg transition-all">
                        <span className="material-symbols-outlined text-[20px]">
                          settings_suggest
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-6 py-4 bg-[#222949]/10">
            <p className="text-xs text-[#909acb]">Showing 1 to 4 of 128 users</p>
            <div className="flex gap-2">
              <button className="flex items-center justify-center size-8 rounded bg-[#222949] text-[#909acb] hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="flex items-center justify-center size-8 rounded bg-primary text-white">
                1
              </button>
              <button className="flex items-center justify-center size-8 rounded bg-[#222949] text-[#909acb] hover:text-white transition-colors">
                2
              </button>
              <button className="flex items-center justify-center size-8 rounded bg-[#222949] text-[#909acb] hover:text-white transition-colors">
                3
              </button>
              <button className="flex items-center justify-center size-8 rounded bg-[#222949] text-[#909acb] hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
