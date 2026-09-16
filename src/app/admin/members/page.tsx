import prisma from "@/lib/prisma";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { subscription: true }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Members & Subs</h1>
          <p className="text-slate-500 mt-1">Manage users and their subscription statuses.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Telegram ID</th>
                <th className="px-6 py-4 font-semibold">Joined Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No members found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{user.firstName} {user.lastName}</div>
                      {user.username && <div className="text-slate-500">@{user.username}</div>}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-mono text-xs">
                      {user.telegramId.toString()}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {format(new Date(user.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full font-medium text-xs ${
                        user.subscription?.status === "ACTIVE" 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {user.subscription?.status || "NO_SUB"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
