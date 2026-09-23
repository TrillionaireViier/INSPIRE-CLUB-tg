'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createPerk(prevState: any, formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const discountCode = (formData.get('discountCode') as string) || undefined
  const url = (formData.get('url') as string) || undefined

  try {
    await prisma.partnerPerk.create({
      data: { title, description, discountCode, url, isActive: true }
    })
    revalidatePath('/user/perks')
    return { success: true }
  } catch (e) {
    return { error: 'Failed to create perk' }
  }
}

export async function deletePerk(id: string) {
  try {
    await prisma.partnerPerk.delete({
      where: { id }
    })
    revalidatePath('/user/perks')
    return { success: true }
  } catch (error) {
    console.error("Failed to delete perk:", error)
    return { error: 'Failed to delete perk' }
  }
}

export async function togglePerk(id: string, isActive: boolean) {
  await prisma.partnerPerk.update({
    where: { id },
    data: { isActive }
  })
  revalidatePath('/user/perks')
}
