import prisma from "@/lib/prisma";
import { Calendar, Video, Clock } from "lucide-react";
import { AddScheduleForm } from "./AddScheduleForm";
import { ScheduleCard } from "./ScheduleCard";

export const dynamic = "force-dynamic";

export default async function SchedulePage() {
  const sessions = await prisma.content.findMany({
    where: {
      type: "LIVE_SESSION"
    },
    orderBy: { scheduledFor: "asc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Розклад трансляцій</h1>
          <p className="text-slate-500 mt-1">Управління майбутніми трансляціями, майстер-класами та Q&A.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Upcoming Sessions</h2>
          {sessions.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
              No live sessions scheduled. Plan your next event!
            </div>
          ) : (
            sessions.map((session) => (
              <ScheduleCard key={session.id} session={session} />
            ))
          )}
        </div>

        <div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm sticky top-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Schedule New Session</h2>
            <AddScheduleForm />
          </div>
        </div>
      </div>
    </div>
  );
}
