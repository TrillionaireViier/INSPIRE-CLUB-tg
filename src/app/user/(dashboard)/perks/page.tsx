import prisma from "@/lib/prisma";
import { Tag } from "lucide-react";
import { AddPerkForm } from "./AddPerkForm";
import { PerkCard } from "./PerkCard";

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
              <PerkCard key={perk.id} perk={perk} />
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
