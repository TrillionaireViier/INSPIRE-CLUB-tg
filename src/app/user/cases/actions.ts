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
