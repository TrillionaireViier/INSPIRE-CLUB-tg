import prisma from "@/lib/prisma";
import { Calendar, Video, Clock } from "lucide-react";
import { AddScheduleForm } from "./AddScheduleForm";
import { DeleteScheduleButton } from "./DeleteScheduleButton";
import { format } from "date-fns";

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
              <div key={session.id} className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-rose-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg">{session.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{session.description}</p>
                  
                  <div className="flex items-center gap-4 mt-4 text-sm font-medium text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} className="text-slate-400" />
                      {session.scheduledFor ? format(session.scheduledFor, "MMM d, yyyy h:mm a") : "TBA"}
                    </div>
                  </div>
                  
                  {session.url && (
                    <a href={session.url} target="_blank" rel="noreferrer" className="text-sm bg-indigo-50 text-indigo-700 font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-100 mt-4 inline-block transition-colors">
                      Join Stream URL &rarr;
                    </a>
                  )}
                  <div className="mt-2 flex justify-end">
                    <DeleteScheduleButton id={session.id} />
                  </div>
                </div>
              </div>
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
