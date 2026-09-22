'use client'

import { useActionState, useEffect } from 'react'
import { createPerk } from './actions'

export function AddPerkForm() {
  const [state, formAction, isPending] = useActionState(createPerk, null)

  useEffect(() => {
    if (state?.success) {
      const form = document.getElementById('add-perk-form') as HTMLFormElement;
      if (form) form.reset();
    }
  }, [state])

  return (
    <form id="add-perk-form" action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Title</label>
        <input type="text" id="title" name="title" required className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="e.g. Notion Premium" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea id="description" name="description" required className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="Description of the perk..."></textarea>
      </div>
      <div>
        <label htmlFor="discountCode" className="block text-sm font-medium text-slate-700 mb-1">Discount Code (Optional)</label>
        <input type="text" id="discountCode" name="discountCode" className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="INSPIRE20" />
      </div>
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-1">URL (Optional)</label>
        <input type="url" id="url" name="url" className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="https://..." />
      </div>

      {state?.error && <p className="text-sm text-rose-600">{state.error}</p>}
      {state?.success && <p className="text-sm text-emerald-600">Perk added successfully!</p>}

      <button type="submit" disabled={isPending} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50">
        {isPending ? 'Adding...' : 'Add Perk'}
      </button>
    </form>
  )
}
