'use client'

import { useState, useTransition } from 'react'
import { updateCaseStatus } from './actions'

export function StatusButton({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition()
  
  if (currentStatus === "REVIEWED") {
    return (
      <span className="inline-flex px-2.5 py-1 rounded-full font-medium text-xs bg-emerald-100 text-emerald-700">
        Reviewed
      </span>
    )
  }

  return (
    <button
      onClick={() => startTransition(() => updateCaseStatus(id, "REVIEWED"))}
      disabled={isPending}
      className="inline-flex px-3 py-1.5 rounded-lg font-medium text-xs bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
    >
      {isPending ? "Updating..." : "Mark as Reviewed"}
    </button>
  )
}
