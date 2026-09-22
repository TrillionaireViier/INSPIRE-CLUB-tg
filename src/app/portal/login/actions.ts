'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password')
  const adminPassword = process.env.ADMIN_PASSWORD
  
  if (password === adminPassword) {
    const cookieStore = await cookies()
    cookieStore.set('portal_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    
    redirect('/portal')
  }
  
  return { error: 'Невірний пароль' }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('portal_session')
  redirect('/portal/login')
}
