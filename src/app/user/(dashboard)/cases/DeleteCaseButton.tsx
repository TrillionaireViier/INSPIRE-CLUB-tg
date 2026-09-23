"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteCase } from "./actions";

export function DeleteCaseButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this case submission?")) return;
    
    setIsDeleting(true);
    try {
      const result = await deleteCase(id);
      if (result?.error) {
        alert(result.error);
      }
    } catch (e) {
      alert("Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
      title="Delete case"
    >
      <Trash2 size={16} />
    </button>
  );
}
