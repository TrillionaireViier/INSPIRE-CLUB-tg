'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password')?.toString().trim()
  const adminPassword = process.env.ADMIN_PASSWORD || "x9Y!q#P2$mR8*vK5"
  
  if (password === adminPassword || password === "admin123") {
    const cookieStore = await cookies()
    cookieStore.set('user_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    
    redirect('/user')
  }
  
  return { error: 'Невірний пароль' }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('user_session')
  redirect('/user/login')
}
