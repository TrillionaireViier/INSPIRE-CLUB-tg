"use client";

import { useState, useTransition } from "react";
import { createBroadcast } from "./actions";
import { Plus, X } from "lucide-react";

export function NewBroadcastForm() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => createBroadcast(fd).then(() => setOpen(false)));
    (e.target as HTMLFormElement).reset();
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        <Plus size={16} /> Нова розсилка
      </button>
    );
  }

  return (
    <div className="bg-white border-2 border-indigo-200 rounded-xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-800">Нова розсилка</h3>
        <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
          <X size={18} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          required
          placeholder="Назва (тільки для адмінки)"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Текст повідомлення&#10;Підтримує HTML: &lt;b&gt;жирний&lt;/b&gt;, &lt;i&gt;курсив&lt;/i&gt;, &lt;a href=&quot;...&quot;&gt;посилання&lt;/a&gt;"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
        />
        <select
          name="targetGroup"
          defaultValue="ACTIVE"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
        >
          <option value="ALL">Всі користувачі</option>
          <option value="ACTIVE">Тільки активні учасники</option>
          <option value="GUEST">Тільки гості (без промокоду)</option>
        </select>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="bg-indigo-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {isPending ? "Збереження..." : "Зберегти як чернетку"}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="border border-slate-300 text-sm px-4 py-2 rounded-lg hover:bg-slate-50"
          >
            Скасувати
          </button>
        </div>
      </form>
    </div>
  );
}
