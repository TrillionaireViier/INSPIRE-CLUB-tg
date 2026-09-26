import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const sessions = [
    {
      title: "Катерина Ральник | КОМАНДА ЗАРОБЛЯЄ. А САЛОН?",
      description: "Як сформувати ставку, %, бонуси та KPI майстрів так, щоб мотивувати команду, але не залишати салон без прибутку.",
      scheduledFor: new Date(2026, 9, 6, 18, 0), // Oct 6
      type: "LIVE_SESSION",
      isActive: true,
    },
    {
      title: "INSIDE РОЗБІР | ТВІЙ ЗАПИТ — НАШ РОЗБІР",
      description: "Живий розбір реальних запитів учасників клубу: бізнес, команда, клієнти, продажі, розвиток та точки росту.",
      scheduledFor: new Date(2026, 9, 13, 18, 0), // Oct 13
      type: "LIVE_SESSION",
      isActive: true,
    },
    {
      title: "INSIDE NETWORKING | ЗНАЙОМСТВА, ЯКІ МОЖУТЬ СТАТИ МОЖЛИВОСТЯМИ",
      description: "Жива зустріч комʼюніті: знайомимось, говоримо про себе та свої проєкти, шукаємо партнерства, колаборації й людей, з якими можемо рости разом.",
      scheduledFor: new Date(2026, 9, 20, 18, 0), // Oct 20
      type: "LIVE_SESSION",
      isActive: true,
    },
    {
      title: "Юлія Паламар | ВІД АНАТОМІЇ ДО ФОРМИ",
      description: "Як будувати форму стрижки відповідно до анатомічних особливостей людини, працювати з правильними розподілами та формувати власний стиль майстра.",
      scheduledFor: new Date(2026, 9, 27, 18, 0), // Oct 27
      type: "LIVE_SESSION",
      isActive: true,
    }
  ];

  for (const s of sessions) {
    await prisma.content.create({ data: s });
  }

  console.log("Seeded live sessions!");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
