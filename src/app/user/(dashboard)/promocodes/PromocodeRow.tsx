"use client";

import { useState } from "react";
import { Edit2, Check, X, Trash2, Power } from "lucide-react";
import { updatePromocode, deletePromocode, togglePromocode } from "./actions";

type Promo = {
  id: string;
  code: string;
  discount: number;
  isActive: boolean;
};

export function PromocodeRow({ promo }: { promo: Promo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleToggle = async () => {
    setLoading(true);
    await togglePromocode(promo.id, !promo.isActive);
    setLoading(false);
    window.location.reload();
  };

  const handleDelete = async () => {
    if (!confirm("Видалити цей промокод?")) return;
    setLoading(true);
    await deletePromocode(promo.id);
    setLoading(false);
    window.location.reload();
  };

  if (isEditing) {
    return (
      <tr className="bg-slate-50/50">
        <td colSpan={4} className="p-4">
          <form 
            action={async (formData) => {
              setLoading(true);
              setError("");
              const res = await updatePromocode(promo.id, formData);
              if (res?.error) {
                setError(res.error);
                setLoading(false);
              } else {
                setIsEditing(false);
                setLoading(false);
                window.location.reload();
              }
            }}
            className="flex items-start gap-4"
          >
            <div className="flex-1">
              <input 
                type="text" 
                name="code" 
                defaultValue={promo.code}
                required
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 uppercase outline-none focus:border-indigo-500 font-mono text-sm"
              />
              {error && <p className="text-rose-500 text-xs mt-1">{error}</p>}
            </div>
            
            <div className="w-24 relative">
              <input 
                type="number" 
                name="discount" 
                defaultValue={promo.discount}
                required
                min="1"
                max="100"
                className="w-full border border-slate-300 rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500 text-sm"
              />
              <span className="absolute right-3 top-2 text-slate-400 text-xs">%</span>
            </div>
            
            <div className="flex items-center gap-2 pt-1">
              <button 
                type="submit" 
                disabled={loading}
                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                title="Save"
              >
                <Check size={18} />
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setIsEditing(false);
                  setError("");
                }} 
                disabled={loading}
                className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                title="Cancel"
              >
                <X size={18} />
              </button>
            </div>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr className={`group hover:bg-slate-50/50 transition-colors ${!promo.isActive ? "opacity-75" : ""}`}>
      <td className="px-6 py-4 font-mono font-bold text-slate-900">
        {promo.code}
      </td>
      <td className="px-6 py-4">
        <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded font-bold text-sm">
          {promo.discount}%
        </span>
      </td>
      <td className="px-6 py-4">
        {promo.isActive ? (
          <span className="text-emerald-600 text-sm font-medium flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            Активний
          </span>
        ) : (
          <span className="text-slate-500 text-sm font-medium flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
            Вимкнений
          </span>
        )}
      </td>
      <td className="px-6 py-4 flex justify-end gap-1">
        <button 
          onClick={() => setIsEditing(true)}
          disabled={loading}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          title="Редагувати"
        >
          <Edit2 size={18} />
        </button>
        <button 
          onClick={handleToggle}
          disabled={loading}
          className={`p-2 rounded-lg transition-colors ${promo.isActive ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'}`}
          title={promo.isActive ? "Вимкнути" : "Увімкнути"}
        >
          <Power size={18} />
        </button>
        <button 
          onClick={handleDelete}
          disabled={loading}
          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
          title="Видалити"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}
