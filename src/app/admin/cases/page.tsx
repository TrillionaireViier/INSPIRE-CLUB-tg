import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { StatusButton } from "./StatusButton";

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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Case Club Apps</h1>
          <p className="text-slate-500 mt-1">Review submissions for personalized teardowns.</p>
        </div>
      </div>

      <div className="space-y-4">
        {cases.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 shadow-sm">
            No case applications found.
          </div>
        ) : (
          cases.map((caseItem) => (
            <div key={caseItem.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">@{caseItem.igHandle}</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Submitted by {caseItem.user.firstName} {caseItem.user.lastName} on {format(new Date(caseItem.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <StatusButton id={caseItem.id} currentStatus={caseItem.status} />
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">Current Situation</h4>
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100">{caseItem.currentSituation}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">Primary Inquiry</h4>
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100">{caseItem.inquiry}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
