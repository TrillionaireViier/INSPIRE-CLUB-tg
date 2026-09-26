import prisma from "@/lib/prisma";
import { BroadcastCard } from "./BroadcastCard";
import { NewBroadcastForm } from "./NewBroadcastForm";
import { Send, Users } from "lucide-react";

export default async function BroadcastsPage() {
  const [broadcasts, totalUsers, activeUsers] = await Promise.all([
    prisma.broadcast.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.user.count(),
    prisma.user.count({ where: { subscription: { status: "ACTIVE" } } }),
  ]);

  const sentBroadcasts = broadcasts.filter(function(b) { return b.status === "SENT"; });
  const totalSent = sentBroadcasts.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Розсилки</h1>
          <p className="text-slate-500 text-sm mt-0.5">Надсилайте повідомлення учасникам у Telegram</p>
        </div>
        <NewBroadcastForm />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Users size={20} className="text-indigo-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{totalUsers}</p>
            <p className="text-xs text-slate-500">Всього в базі</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Users size={20} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{activeUsers}</p>
            <p className="text-xs text-slate-500">Активних учасників</p>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
            <Send size={20} className="text-violet-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{totalSent}</p>
            <p className="text-xs text-slate-500">Розсилок надіслано</p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-700">
        <strong>💡 Підказка:</strong> Повідомлення підтримують HTML-форматування: <code>&lt;b&gt;жирний&lt;/b&gt;</code>, <code>&lt;i&gt;курсив&lt;/i&gt;</code>, <code>&lt;a href=&quot;URL&quot;&gt;посилання&lt;/a&gt;</code>. Спочатку збережіть як чернетку, перевірте і тоді надсилайте.
      </div>

      {/* Broadcast list */}
      <div className="space-y-3">
        {broadcasts.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Send size={40} className="mx-auto mb-3 opacity-40" />
            <p className="font-medium">Розсилок ще немає</p>
            <p className="text-sm">Натисніть «Нова розсилка» щоб почати</p>
          </div>
        ) : (
          broadcasts.map((b) => (
            <BroadcastCard key={b.id} broadcast={b} />
          ))
        )}
      </div>
    </div>
  );
}
