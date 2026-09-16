import Link from "next/link";
import { LayoutDashboard, Users, Calendar, Video, ShieldCheck, CreditCard, Menu, LogOut } from "lucide-react";
import { logout } from "./login/actions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            I
          </div>
          <span className="font-bold text-slate-900 tracking-tight">INSPIRE Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavItem href="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem href="/admin/members" icon={<Users size={20} />} label="Members & Subs" />
          <NavItem href="/admin/schedule" icon={<Calendar size={20} />} label="Live Schedule" />
          <NavItem href="/admin/content" icon={<Video size={20} />} label="Content Library" />
          <NavItem href="/admin/cases" icon={<ShieldCheck size={20} />} label="Case Club Apps" />
          <NavItem href="/admin/perks" icon={<CreditCard size={20} />} label="Partner Perks" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 md:px-8 justify-between md:justify-end">
          <button className="md:hidden text-slate-500">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600">Admin User</span>
              <div className="w-8 h-8 rounded-full bg-slate-200"></div>
            </div>
            <form action={logout}>
              <button className="text-slate-500 hover:text-rose-600 transition-colors p-2 rounded-lg hover:bg-rose-50" title="Logout">
                <LogOut size={20} />
              </button>
            </form>
          </div>
        </header>
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 font-medium transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}
