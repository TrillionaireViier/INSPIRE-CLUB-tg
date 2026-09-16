import prisma from "@/lib/prisma";
import { Tag } from "lucide-react";
import { AddPerkForm } from "./AddPerkForm";
import { TogglePerkButton } from "./TogglePerkButton";

export const dynamic = "force-dynamic";

export default async function PerksPage() {
  const perks = await prisma.partnerPerk.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Бонуси від партнерів</h1>
          <p className="text-slate-500 mt-1">Керуйте знижками на ПЗ та пропозиціями партнерів для учасників.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Current Perks</h2>
          {perks.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 shadow-sm">
              No partner perks added yet.
            </div>
          ) : (
            perks.map((perk) => (
              <div key={perk.id} className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Tag className="text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900 text-lg">{perk.title}</h3>
                    <TogglePerkButton id={perk.id} isActive={perk.isActive} />
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{perk.description}</p>
                  
                  {(perk.discountCode || perk.url) && (
                    <div className="flex items-center gap-4 mt-4">
                      {perk.discountCode && (
                        <div className="bg-slate-100 px-3 py-1.5 rounded-lg text-sm font-mono font-medium text-slate-700">
                          Code: {perk.discountCode}
                        </div>
                      )}
                      {perk.url && (
                        <a href={perk.url} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 font-medium hover:underline">
                          Partner Link &rarr;
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm sticky top-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Add New Perk</h2>
            <AddPerkForm />
          </div>
        </div>
      </div>
    </div>
  );
}
