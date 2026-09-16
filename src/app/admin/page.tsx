import { Users, Video, ShieldCheck, Activity } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [usersCount, contentCount, pendingCasesCount, recentSubs] = await Promise.all([
    prisma.user.count(),
    prisma.content.count(),
    prisma.caseSubmission.count({ where: { status: "PENDING" } }),
    prisma.subscription.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: true }
    })
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome to the INSPIRE CLUB administrative control panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Members" value={usersCount.toString()} icon={<Users className="text-indigo-600" />} />
        <StatCard title="Total Content" value={contentCount.toString()} icon={<Video className="text-emerald-600" />} />
        <StatCard title="Pending Case Apps" value={pendingCasesCount.toString()} icon={<ShieldCheck className="text-amber-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Subscriptions</h2>
          {recentSubs.length === 0 ? (
            <div className="text-sm text-slate-500">No subscriptions yet.</div>
          ) : (
            <div className="space-y-4">
              {recentSubs.map((sub) => (
                <div key={sub.id} className="flex justify-between items-center border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-slate-900">{sub.user.firstName} {sub.user.lastName}</p>
                    <p className="text-sm text-slate-500">@{sub.user.username || sub.user.telegramId.toString()}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${sub.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Broadcast</h2>
          <textarea 
            className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all min-h-[120px]"
            placeholder="Type a message to broadcast to all active members on Telegram..."
          />
          <button className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors">
            Send Broadcast
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center shadow-sm">
      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}
