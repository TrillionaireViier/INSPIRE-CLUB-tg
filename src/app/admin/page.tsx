import { Users, Video, ShieldCheck, Activity } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome to the INSPIRE CLUB administrative control panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Members" value="128" icon={<Users className="text-indigo-600" />} />
        <StatCard title="Total Content" value="45" icon={<Video className="text-emerald-600" />} />
        <StatCard title="Pending Case Apps" value="12" icon={<ShieldCheck className="text-amber-600" />} />
        <StatCard title="Monthly MRR" value="$12,800" icon={<Activity className="text-rose-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Subscriptions</h2>
          <div className="text-sm text-slate-500">Database connected. Data will appear here once users subscribe via Telegram.</div>
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
