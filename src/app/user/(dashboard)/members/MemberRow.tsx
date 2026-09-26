"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Edit2, Check, X } from "lucide-react";
import { DeleteMemberButton } from "./DeleteMemberButton";
import { updateMemberSubscription } from "./actions";

type Member = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  telegramId: bigint;
  createdAt: Date;
  subscription: {
    status: string;
  } | null;
};

export function MemberRow({ user }: { user: Member }) {
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(user.subscription?.status || "INACTIVE");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await updateMemberSubscription(user.id, status);
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-6 py-4">
        <div className="font-medium text-slate-900">{user.firstName} {user.lastName}</div>
        {user.username && <div className="text-slate-500">@{user.username}</div>}
      </td>
      <td className="px-6 py-4 text-slate-600 font-mono text-xs">
        {user.telegramId.toString()}
      </td>
      <td className="px-6 py-4 text-slate-600">
        {format(new Date(user.createdAt), "MMM d, yyyy")}
      </td>
      <td className="px-6 py-4">
        {isEditing ? (
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
            disabled={isLoading}
            className="border border-slate-300 rounded p-1 text-xs font-medium focus:ring-1 focus:ring-indigo-500 outline-none"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="GUEST">GUEST</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        ) : (
          <span className={`inline-flex px-2.5 py-1 rounded-full font-medium text-xs ${
            user.subscription?.status === "ACTIVE" 
              ? "bg-emerald-100 text-emerald-700" 
              : "bg-slate-100 text-slate-600"
          }`}>
            {user.subscription?.status || "NO_SUB"}
          </span>
        )}
      </td>
      <td className="px-6 py-4 text-right flex justify-end gap-2 items-center">
        {isEditing ? (
          <>
            <button 
              onClick={handleSave} 
              disabled={isLoading}
              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              <Check size={16} />
            </button>
            <button 
              onClick={() => setIsEditing(false)} 
              disabled={isLoading}
              className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <button 
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            title="Edit Status"
          >
            <Edit2 size={16} />
          </button>
        )}
        <DeleteMemberButton id={user.id} />
      </td>
    </tr>
  );
}
