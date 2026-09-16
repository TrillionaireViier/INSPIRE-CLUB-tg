'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createPerk(prevState: any, formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const discountCode = formData.get('discountCode') as string
  const url = formData.get('url') as string
  
  if (!title || !description) return { error: 'Title and description are required' }

  await prisma.partnerPerk.create({
    data: { title, description, discountCode, url }
  })

  revalidatePath('/admin/perks')
  return { success: true }
}

export async function togglePerk(id: string, isActive: boolean) {
  await prisma.partnerPerk.update({
    where: { id },
    data: { isActive }
  })
  revalidatePath('/admin/perks')
}
