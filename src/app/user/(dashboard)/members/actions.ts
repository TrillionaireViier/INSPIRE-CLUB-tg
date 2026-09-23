'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteMember(id: string) {
  try {
    await prisma.user.delete({
      where: { id }
    })
    revalidatePath('/user/members')
    return { success: true }
  } catch (error) {
    console.error("Failed to delete member:", error)
    return { error: 'Failed to delete member' }
  }
}
