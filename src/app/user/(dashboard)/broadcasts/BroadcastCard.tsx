"use client";

import { useState, useTransition } from "react";
import { sendBroadcast, deleteBroadcast, updateBroadcast } from "./actions";
import { Send, Trash2, Edit2, X, Check, Loader2, Users, Clock } from "lucide-react";

type Broadcast = {
  id: string;
  title: string;
  message: string;
  targetGroup: string;
  status: string;
  sentCount: number;
  sentAt: Date | null;
  createdAt: Date;
};

export function BroadcastCard({ broadcast }: { broadcast: Broadcast }) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(broadcast.title);
  const [message, setMessage] = useState(broadcast.message);
  const [targetGroup, setTargetGroup] = useState(broadcast.targetGroup);
  const [confirmSend, setConfirmSend] = useState(false);

  const statusColor =
    broadcast.status === "SENT"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-amber-100 text-amber-700";

  const groupLabel: Record<string, string> = {
    ALL: "Всі користувачі",
    ACTIVE: "Тільки активні",
    GUEST: "Тільки гості",
  };

  function handleSave() {
    const fd = new FormData();
    fd.set("title", title);
    fd.set("message", message);
    fd.set("targetGroup", targetGroup);
    startTransition(() => updateBroadcast(broadcast.id, fd).then(() => setIsEditing(false)));
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Назва розсилки"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none font-mono"
            placeholder="Текст повідомлення (підтримує HTML: <b>, <i>, <a>)"
          />
          <select
            value={targetGroup}
            onChange={(e) => setTargetGroup(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            <option value="ALL">Всі користувачі</option>
            <option value="ACTIVE">Тільки активні</option>
            <option value="GUEST">Тільки гості</option>
          </select>
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="flex items-center gap-1.5 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Check size={14} /> Зберегти
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-1.5 border border-slate-300 text-sm px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              <X size={14} /> Скасувати
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-800">{broadcast.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor}`}>
                  {broadcast.status === "SENT" ? "Відправлено" : "Чернетка"}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Users size={11} /> {groupLabel[broadcast.targetGroup] || broadcast.targetGroup}
                </span>
                {broadcast.status === "SENT" && (
                  <span className="text-xs text-slate-500">
                    {broadcast.sentCount} отримувачів
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              {broadcast.status !== "SENT" && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Edit2 size={15} />
                </button>
              )}
              <button
                onClick={() => startTransition(() => deleteBroadcast(broadcast.id))}
                disabled={isPending}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3 font-mono whitespace-pre-wrap">
            {broadcast.message}
          </p>

          {broadcast.sentAt && (
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <Clock size={11} />
              Надіслано: {new Date(broadcast.sentAt).toLocaleString("uk-UA")}
            </p>
          )}

          {broadcast.status !== "SENT" && (
            <>
              {confirmSend ? (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-sm text-slate-600">Підтвердити надсилання?</span>
                  <button
                    onClick={() => {
                      setConfirmSend(false);
                      startTransition(() => sendBroadcast(broadcast.id));
                    }}
                    disabled={isPending}
                    className="flex items-center gap-1.5 bg-emerald-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    {isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                    Так, надіслати
                  </button>
                  <button
                    onClick={() => setConfirmSend(false)}
                    className="text-sm px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Скасувати
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmSend(true)}
                  disabled={isPending}
                  className="flex items-center gap-2 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors w-fit"
                >
                  <Send size={14} /> Надіслати в Telegram
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
