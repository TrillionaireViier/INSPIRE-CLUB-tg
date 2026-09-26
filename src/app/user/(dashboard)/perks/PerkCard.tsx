"use client";

import { useState } from "react";
import { Tag, Edit2, X } from "lucide-react";
import { TogglePerkButton } from "./TogglePerkButton";
import { DeletePerkButton } from "./DeletePerkButton";
import { updatePerk } from "./actions";

type Perk = {
  id: string;
  title: string;
  description: string;
  discountCode: string | null;
  url: string | null;
  isActive: boolean;
};

export function PerkCard({ perk }: { perk: Perk }) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-5 relative shadow-md ring-2 ring-indigo-500 ring-opacity-20">
        <button 
          onClick={() => setIsEditing(false)} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X size={20} />
        </button>
        <h3 className="font-bold text-slate-900 text-lg mb-4">Edit Perk</h3>
        <form 
          action={async (formData) => {
            await updatePerk(perk.id, formData);
            setIsEditing(false);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Perk Title</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={perk.title}
              required 
              className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</label>
            <textarea 
              name="description" 
              defaultValue={perk.description}
              className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50 min-h-[80px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Promo/Discount Code</label>
            <input 
              type="text" 
              name="discountCode" 
              defaultValue={perk.discountCode || ""}
              className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Partner URL</label>
            <input 
              type="url" 
              name="url" 
              defaultValue={perk.url || ""}
              className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50"
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow relative">
      <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
        <Tag className="text-amber-600" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start pr-24">
          <h3 className="font-bold text-slate-900 text-lg leading-tight">{perk.title}</h3>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button 
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            title="Edit Perk"
          >
            <Edit2 size={18} />
          </button>
          <TogglePerkButton id={perk.id} isActive={perk.isActive} />
          <DeletePerkButton id={perk.id} />
        </div>
        <p className="text-sm text-slate-500 mt-2 whitespace-pre-wrap">{perk.description}</p>
        
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
  );
}
