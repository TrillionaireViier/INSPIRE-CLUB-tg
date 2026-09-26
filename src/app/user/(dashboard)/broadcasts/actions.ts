"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getBot, setupBot } from "@/lib/bot";

export async function createBroadcast(formData: FormData) {
  const title = formData.get("title") as string;
  const message = formData.get("message") as string;
  const targetGroup = formData.get("targetGroup") as string;

  await prisma.broadcast.create({
    data: { title, message, targetGroup, status: "DRAFT" },
  });

  revalidatePath("/user/broadcasts");
}

export async function deleteBroadcast(id: string) {
  await prisma.broadcast.delete({ where: { id } });
  revalidatePath("/user/broadcasts");
}

export async function sendBroadcast(id: string) {
  const broadcast = await prisma.broadcast.findUnique({ where: { id } });
  if (!broadcast || broadcast.status === "SENT") return;

  // Get target users
  let users;
  if (broadcast.targetGroup === "ALL") {
    users = await prisma.user.findMany({ include: { subscription: true } });
  } else {
    users = await prisma.user.findMany({
      where: { subscription: { status: broadcast.targetGroup } },
      include: { subscription: true },
    });
  }

  const bot = getBot();
  setupBot(bot);

  let sentCount = 0;
  for (const user of users) {
    try {
      await bot.api.sendMessage(Number(user.telegramId), broadcast.message, {
        parse_mode: "HTML",
      });
      sentCount++;
    } catch {
      // skip if user blocked bot
    }
  }

  await prisma.broadcast.update({
    where: { id },
    data: { status: "SENT", sentCount, sentAt: new Date() },
  });

  revalidatePath("/user/broadcasts");
}

export async function updateBroadcast(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const message = formData.get("message") as string;
  const targetGroup = formData.get("targetGroup") as string;

  await prisma.broadcast.update({
    where: { id },
    data: { title, message, targetGroup },
  });

  revalidatePath("/user/broadcasts");
}
