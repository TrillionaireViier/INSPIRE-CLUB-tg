"use client";

import { useState } from "react";
import { Ticket, Plus } from "lucide-react";
import { addPromocode } from "./actions";
import { PromocodeRow } from "./PromocodeRow";

type Promo = {
  id: string;
  code: string;
  discount: number;
  isActive: boolean;
};

export default function PromocodeList({ initialPromos }: { initialPromos: Promo[] }) {
  const [promos, setPromos] = useState(initialPromos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const res = await addPromocode(formData);
    
    if (res?.error) {
      setError(res.error);
    } else {
      window.location.reload(); 
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Ticket className="text-indigo-600" size={20} />
          Створити промокод
        </h2>
        
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1">
            <input 
              type="text" 
              name="code" 
              placeholder="КОД (наприклад, SALE50)" 
              required
              className="w-full border border-slate-300 rounded-lg px-4 py-2 uppercase outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex-1 relative">
            <input 
              type="number" 
              name="discount" 
              placeholder="Знижка" 
              required
              min="1"
              max="100"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 outline-none focus:border-indigo-500"
            />
            <span className="absolute right-4 top-2 text-slate-400">%</span>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg px-6 py-2 flex items-center gap-2 transition-colors disabled:opacity-50 w-full sm:w-auto justify-center"
          >
            <Plus size={18} />
            Створити
          </button>
        </form>
        {error && <p className="text-rose-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
            <tr>
              <th className="px-6 py-3 font-medium">Код</th>
              <th className="px-6 py-3 font-medium">Знижка</th>
              <th className="px-6 py-3 font-medium">Статус</th>
              <th className="px-6 py-3 font-medium text-right">Дії</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {promos.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  Немає активних промокодів
                </td>
              </tr>
            ) : (
              promos.map(promo => (
                <PromocodeRow key={promo.id} promo={promo} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
