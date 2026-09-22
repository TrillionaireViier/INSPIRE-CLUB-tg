"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLiveSession(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const scheduledForStr = formData.get("scheduledFor") as string;
  const url = formData.get("url") as string;

  if (!title || !scheduledForStr) {
    throw new Error("Missing required fields");
  }

  const scheduledFor = new Date(scheduledForStr);

  await prisma.content.create({
    data: {
      title,
      description,
      type: "LIVE_SESSION",
      scheduledFor,
      url,
      isActive: true,
    }
  });

  revalidatePath("/portal/schedule");
}
