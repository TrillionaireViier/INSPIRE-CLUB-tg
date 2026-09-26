"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function addPromocode(formData: FormData) {
  const code = formData.get("code") as string;
  const discountStr = formData.get("discount") as string;
  const discount = parseInt(discountStr, 10);
  
  if (!code || isNaN(discount)) {
    return { error: "Некоректні дані" };
  }
  
  try {
    await prisma.promocode.create({
      data: {
        code: code.trim().toUpperCase(),
        discount,
        isActive: true,
      }
    });
    revalidatePath("/user/promocodes");
    return { success: true };
  } catch (e: any) {
    if (e.code === 'P2002') return { error: "Промокод вже існує" };
    return { error: "Помилка при створенні промокоду" };
  }
}

export async function deletePromocode(id: string) {
  try {
    await prisma.promocode.delete({ where: { id } });
    revalidatePath("/user/promocodes");
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function togglePromocode(id: string, isActive: boolean) {
  try {
    await prisma.promocode.update({ where: { id }, data: { isActive } });
    revalidatePath("/user/promocodes");
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function updatePromocode(id: string, formData: FormData) {
  const code = formData.get("code") as string;
  const discountStr = formData.get("discount") as string;
  const discount = parseInt(discountStr, 10);

  if (!code || isNaN(discount)) {
    return { error: "Некоректні дані" };
  }

  try {
    await prisma.promocode.update({
      where: { id },
      data: {
        code: code.trim().toUpperCase(),
        discount,
      }
    });
    revalidatePath("/user/promocodes");
    return { success: true };
  } catch (e: any) {
    if (e.code === 'P2002') return { error: "Промокод вже існує" };
    return { error: "Помилка при оновленні промокоду" };
  }
}
