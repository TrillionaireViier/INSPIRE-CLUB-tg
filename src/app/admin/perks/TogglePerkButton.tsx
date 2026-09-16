'use client'
import { togglePerk } from './actions'
import { useTransition } from 'react'

export function TogglePerkButton({ id, isActive }: { id: string, isActive: boolean }) {
  const [isPending, startTransition] = useTransition()
  
  return (
    <button
      onClick={() => startTransition(() => togglePerk(id, !isActive))}
      disabled={isPending}
      className={`text-xs px-3 py-1 rounded-full font-medium transition-colors disabled:opacity-50 ${isActive ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
    >
      {isPending ? "Updating..." : (isActive ? "Active (Click to Disable)" : "Disabled (Click to Enable)")}
    </button>
  )
}
