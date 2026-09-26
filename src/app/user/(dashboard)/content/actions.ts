"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createContent(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const url = formData.get("url") as string;

  if (!title || !type) {
    throw new Error("Missing required fields");
  }

  await prisma.content.create({
    data: {
      title,
      description,
      type,
      url,
      isActive: true,
    }
  });

  revalidatePath("/user/content");
}

export async function deleteContent(id: string) {
  try {
    await prisma.content.delete({
      where: { id }
    })
    revalidatePath("/user/content")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete content:", error)
    return { error: "Failed to delete content" }
  }
}

export async function updateContentItem(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const url = formData.get("url") as string;
  const isActive = formData.get("isActive") === "on";

  if (!title || !type) {
    throw new Error("Missing required fields");
  }

  await prisma.content.update({
    where: { id },
    data: {
      title,
      description,
      type,
      url,
      isActive
    }
  });

  revalidatePath("/user/content");
}
