import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { StatusButton } from "./StatusButton";
import { DeleteCaseButton } from "./DeleteCaseButton";

export const dynamic = "force-dynamic";

export default async function CasesPage() {
  const cases = await prisma.caseSubmission.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Заявки на розбір</h1>
          <p className="text-slate-500 mt-1">Усього заявок: {cases.length}</p>
        </div>
      </div>

      <div className="space-y-4">
        {cases.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 shadow-sm">
            Заявок поки немає.
          </div>
        ) : (
          cases.map((caseItem) => (
            <div key={caseItem.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                    {caseItem.name || `${caseItem.user.firstName ?? ""} ${caseItem.user.lastName ?? ""}`.trim() || "—"}
                    {caseItem.user.username && (
                      <a 
                        href={`https://t.me/${caseItem.user.username}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-sm font-normal text-sky-500 hover:underline bg-sky-50 px-2 py-0.5 rounded-full"
                      >
                        @{caseItem.user.username}
                      </a>
                    )}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {format(new Date(caseItem.createdAt), "dd.MM.yyyy, HH:mm")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusButton id={caseItem.id} currentStatus={caseItem.status} />
                  <DeleteCaseButton id={caseItem.id} />
                </div>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Професія</span>
                  <p className="text-sm text-slate-800 mt-1 font-medium">{caseItem.profession || "—"}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Напрям</span>
                  <p className="text-sm text-slate-800 mt-1 font-medium">{caseItem.direction || "—"}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Готові до ефіру</span>
                  <p className="text-sm mt-1 font-medium">
                    {caseItem.readyForLive ? (
                      <span className="text-emerald-600">✅ Так</span>
                    ) : (
                      <span className="text-rose-500">❌ Ні</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Detail sections */}
              <div className="space-y-4">
                {caseItem.currentSituation && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">🔎 Ситуація</h4>
                    <p className="text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm leading-relaxed whitespace-pre-wrap">{caseItem.currentSituation}</p>
                  </div>
                )}
                {caseItem.previousAttempts && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">🔧 Що пробували</h4>
                    <p className="text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm leading-relaxed whitespace-pre-wrap">{caseItem.previousAttempts}</p>
                  </div>
                )}
                {caseItem.mainQuestion && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">❓ Головне питання</h4>
                    <p className="text-slate-700 bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-sm leading-relaxed font-medium whitespace-pre-wrap">{caseItem.mainQuestion}</p>
                  </div>
                )}
                {caseItem.igHandle && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">🔗 Посилання</h4>
                    <p className="text-sm text-indigo-600 font-mono">{caseItem.igHandle}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
