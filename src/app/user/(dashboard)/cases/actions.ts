'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateCaseStatus(id: string, status: string) {
  await prisma.caseSubmission.update({
    where: { id },
    data: { status }
  })
  revalidatePath('/user/cases')
}

export async function deleteCase(id: string) {
  try {
    await prisma.caseSubmission.delete({
      where: { id }
    })
    revalidatePath('/user/cases')
    return { success: true }
  } catch (error) {
    console.error("Failed to delete case:", error)
    return { error: 'Failed to delete case' }
  }
}
