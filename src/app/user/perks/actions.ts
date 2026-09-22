'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createPerk(data: {
  title: string
  description: string
  discountCode?: string
  url?: string
}) {
  await prisma.partnerPerk.create({
    data: { ...data, isActive: true }
  })
  revalidatePath('/user/perks')
}

export async function deletePerk(id: string) {
  await prisma.partnerPerk.delete({
    where: { id }
  })
  revalidatePath('/user/perks')
}

export async function togglePerkActive(id: string, isActive: boolean) {
  await prisma.partnerPerk.update({
    where: { id },
    data: { isActive }
  })
  revalidatePath('/user/perks')
}
