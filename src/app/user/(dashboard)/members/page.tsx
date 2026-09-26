import prisma from "@/lib/prisma";
import { MemberRow } from "./MemberRow";

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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Учасники та підписки</h1>
          <p className="text-slate-500 mt-1">Управління користувачами та статусами їхніх підписок.</p>
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
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No members found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <MemberRow key={user.id} user={user} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
