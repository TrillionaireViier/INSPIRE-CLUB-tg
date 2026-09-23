'use client'

import { useActionState } from 'react'
import { login } from './actions'
import { Lock } from 'lucide-react'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null)

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 w-full max-w-md">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="text-indigo-600 w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Авторизація</h1>
          <p className="text-slate-500 mt-2 text-sm text-center">Будь ласка, введіть пароль для доступу.</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              placeholder="••••••••"
            />
          </div>
          
          {state?.error && (
            <div className="p-3 text-sm text-rose-600 bg-rose-50 rounded-lg border border-rose-100">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-3 rounded-lg text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? 'Авторизація...' : 'Увійти'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500 border-t border-slate-100 pt-6">
          <p>Ще не з нами?</p>
          <a 
            href="https://t.me/insidebyinspire_bot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors mt-1 inline-block"
          >
            Приєднатися до клубу @insidebyinspire_bot
          </a>
        </div>
      </div>
    </div>
  )
}
