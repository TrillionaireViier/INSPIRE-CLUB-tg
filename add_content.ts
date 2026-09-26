import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const contentText = `Сам урок записаний повністю на базі CRM, яку ми використовуємо у своїй мережі салонів і з якою працюємо щодня 🤍
Тому показую не теорію, а реальні інструменти та функції, які справді допомагають у роботі салону.

У відео розбираю:
— повернення клієнтів
— аналітику та звітність
— налаштування зарплат
— розсилки
— автоматизації та роботу із записами

Також для Вас діє промокод «Ralnyk» на -50% оплати ліцензії ✨`;

  const newContent = await prisma.content.create({
    data: {
      title: "Урок по роботі в CRM Integrica 💻",
      description: contentText,
      type: "VIDEO_RECORDING",
      url: "https://youtu.be/mMraBHIY_-Q?si=U8r2J82lxqocTdM4",
      isActive: true,
    }
  });

  console.log("Added new content:", newContent.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
