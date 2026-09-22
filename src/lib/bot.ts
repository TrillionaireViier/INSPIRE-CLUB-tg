import { Bot, webhookCallback, InlineKeyboard } from "grammy";
import prisma from "./prisma";
import { format } from "date-fns";

const token = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_ID = 569302636; // We'll need a way to notify admin. I will use a fallback or the first admin user. Actually, better to query the first user with role ADMIN.

export const getBot = () => {
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is missing");
  }
  return new Bot(token);
};

export const setupBot = (bot: Bot) => {
  bot.command("start", async (ctx) => {
    if (ctx.from) {
      await prisma.user.upsert({
        where: { telegramId: ctx.from.id },
        update: {
          username: ctx.from.username,
          firstName: ctx.from.first_name,
          lastName: ctx.from.last_name,
        },
        create: {
          telegramId: ctx.from.id,
          username: ctx.from.username,
          firstName: ctx.from.first_name,
          lastName: ctx.from.last_name,
        }
      });
    }

    const keyboard = new InlineKeyboard()
      .text("📅 Живі ефіри", "live_sessions").row()
      .text("📚 Бібліотека контенту", "content_library").row()
      .text("💎 Партнери та знижки", "perks").row()
      .text("🎯 ПОДАТИ КЕЙС", "case_club").row()
      .text("⚙️ Моя підписка", "subscription");

    const welcomeText = `Вітаємо в INSIDE CLUB by INSPIRE 🤍

Ти всередині простору, створеного для творців сфери краси.

Тут ми зібрали знання, досвід, сильне оточення та можливості, які допомагають не просто ставати кращим у своїй професії , а рости у доході, масштабі та власному рівні.

INSIDE - це місце, де можна знайти потрібних людей, отримати відповідь на свій запит, побачити нові точки росту, навчатися у сильних і бути частиною середовища, яке рухається вперед.

Тут важливо не просто дивитися.
Знайомся. Запитуй. Ділись. Використовуй можливості.

Ти вже INSIDE.

Твій професійний LEVEL ↑

🍂 **INSIDE CLUB by Inspire — ЖОВТЕНЬ**

**06.10 | Катерина Ральник**
КОМАНДА ЗАРОБЛЯЄ. А САЛОН?
Як сформувати ставку, %, бонуси та KPI майстрів так, щоб мотивувати команду, але не залишати салон без прибутку.

**13.10 | INSIDE РОЗБІР**
ТВІЙ ЗАПИТ — НАШ РОЗБІР
Живий розбір реальних запитів учасників клубу: бізнес, команда, клієнти, продажі, розвиток.

**20.10 | INSIDE NETWORKING**
ЗНАЙОМСТВА, ЯКІ МОЖУТЬ СТАТИ МОЖЛИВОСТЯМИ
Жива зустріч комʼюніті: знайомимось, шукаємо партнерства.

**27.10 | Юлія Паламар**
ВІД АНАТОМІЇ ДО ФОРМИ
Як будувати форму стрижки відповідно до анатомічних особливостей.

---
💻 **Урок по роботі в CRM Integrica**
Показуємо не теорію, а реальні інструменти та функції, які справді допомагають у роботі салону (повернення клієнтів, аналітика, зарплати, розсилки, автоматизації).

🎥 Дивитись урок: https://youtu.be/mMraBHIY_-Q?si=U8r2J82lxqocTdM4
✨ Промокод «Ralnyk» на -50% оплати ліцензії

Оберіть дію в меню нижче:`;

    await ctx.reply(welcomeText, { reply_markup: keyboard, parse_mode: "Markdown", link_preview_options: { is_disabled: true } });
  });

  bot.on("callback_query:data", async (ctx) => {
    const data = ctx.callbackQuery.data;
    const telegramId = ctx.from.id;

    const user = await prisma.user.findUnique({
      where: { telegramId },
      include: { subscription: true }
    });
    const isSubscribed = user?.subscription?.status === "ACTIVE";

    if (data === "live_sessions") {
      await ctx.answerCallbackQuery();
      const sessions = await prisma.content.findMany({
        where: { type: "LIVE_SESSION", isActive: true },
        orderBy: { scheduledFor: "asc" },
        take: 5
      });
      if (sessions.length === 0) return ctx.reply("Наразі немає запланованих живих ефірів.");
      
      let message = "📅 **Заплановані ефіри**\n\n";
      for (const session of sessions) {
        const dateStr = session.scheduledFor ? format(session.scheduledFor, "MMM d, yyyy h:mm a") : "TBA";
        message += `🔹 *${session.title}*\n⏰ ${dateStr}\n`;
        if (session.description) message += `${session.description}\n`;
        if (isSubscribed && session.url) message += `🔗 [Приєднатись до трансляції](${session.url})\n`;
        else if (!isSubscribed) message += `🔒 *Посилання на трансляцію приховано для непідписаних*\n`;
        message += "\n";
      }
      await ctx.reply(message, { parse_mode: "Markdown" });
    } 
    else if (data === "content_library") {
      await ctx.answerCallbackQuery();
      if (!isSubscribed) return ctx.reply("📚 **Бібліотека контенту**\n\n🔒 Цей розділ закрито. Будь ласка, придбайте підписку, щоб розблокувати минулі майстер-класи та PDF-матеріали.", { parse_mode: "Markdown" });
      
      const content = await prisma.content.findMany({
        where: { type: { in: ["VIDEO_RECORDING", "PDF_MATERIAL"] }, isActive: true },
        orderBy: { createdAt: "desc" },
        take: 10
      });
      if (content.length === 0) return ctx.reply("Бібліотека наразі порожня.");
      
      let message = "📚 **Бібліотека контенту**\n\n";
      for (const item of content) {
        const icon = item.type === "VIDEO_RECORDING" ? "🎥" : "📄";
        message += `${icon} *${item.title}*\n`;
        if (item.url) message += `🔗 [Відкрити матеріал](${item.url})\n`;
        message += "\n";
      }
      await ctx.reply(message, { parse_mode: "Markdown" });
    }
    // CASE CLUB FLOW
    else if (data === "case_club") {
      await ctx.answerCallbackQuery();
      // Start session
      await prisma.botSession.upsert({
        where: { telegramId },
        update: { state: "CASE_NAME", data: "{}" },
        create: { telegramId, state: "CASE_NAME", data: "{}" }
      });
      await ctx.reply("Чудово! Давайте заповнимо анкету для CASE CLUB.\n\nВведіть ваше **Імʼя та прізвище:**", { parse_mode: "Markdown" });
    }
    else if (data.startsWith("prof_")) {
      await ctx.answerCallbackQuery();
      const session = await prisma.botSession.findUnique({ where: { telegramId } });
      if (session?.state === "CASE_PROF") {
        const profMap: Record<string, string> = {
          "prof_master": "Майстер",
          "prof_owner": "Власник салону",
          "prof_manager": "Керівник",
          "prof_brand": "Бренд",
          "prof_other": "Інше"
        };
        const prof = profMap[data] || "Інше";
        const sessionData = JSON.parse(session.data);
        sessionData.profession = prof;
        await prisma.botSession.update({
          where: { telegramId },
          data: { state: "CASE_DIR", data: JSON.stringify(sessionData) }
        });
        
        const kb = new InlineKeyboard()
          .text("Бізнес і гроші", "dir_business").row()
          .text("Команда", "dir_team").row()
          .text("Клієнти та продажі", "dir_sales").row()
          .text("Маркетинг та ос. бренд", "dir_marketing").row()
          .text("Професійний розвиток", "dir_dev").row()
          .text("Інше", "dir_other");
        await ctx.reply("Оберіть напрям запиту:", { reply_markup: kb });
      }
    }
    else if (data.startsWith("dir_")) {
      await ctx.answerCallbackQuery();
      const session = await prisma.botSession.findUnique({ where: { telegramId } });
      if (session?.state === "CASE_DIR") {
        const dirMap: Record<string, string> = {
          "dir_business": "Бізнес і гроші",
          "dir_team": "Команда",
          "dir_sales": "Клієнти та продажі",
          "dir_marketing": "Маркетинг та особистий бренд",
          "dir_dev": "Професійний розвиток",
          "dir_other": "Інше"
        };
        const direction = dirMap[data] || "Інше";
        const sessionData = JSON.parse(session.data);
        sessionData.direction = direction;
        await prisma.botSession.update({
          where: { telegramId },
          data: { state: "CASE_SITUATION", data: JSON.stringify(sessionData) }
        });
        await ctx.reply("Опишіть вашу ситуацію.\nЩо відбувається зараз і що саме хочете змінити?");
      }
    }
    else if (data.startsWith("live_")) {
      await ctx.answerCallbackQuery();
      const session = await prisma.botSession.findUnique({ where: { telegramId } });
      if (session?.state === "CASE_LIVE") {
        const readyForLive = data === "live_yes";
        const sessionData = JSON.parse(session.data);
        
        // Finalize
        await prisma.caseSubmission.create({
          // @ts-ignore - we know user exists if they got here
          data: {
            userId: user!.id,
            name: sessionData.name,
            profession: sessionData.profession,
            direction: sessionData.direction,
            currentSituation: sessionData.currentSituation,
            previousAttempts: sessionData.previousAttempts,
            mainQuestion: sessionData.mainQuestion,
            igHandle: sessionData.igHandle,
            readyForLive,
          }
        });
        
        await prisma.botSession.delete({ where: { telegramId } });
        await ctx.reply("Твій кейс прийнято 🤍\nМи переглянемо всі заявки та оберемо кейси для наступного CASE CLUB. Якщо твій кейс буде обрано — ми повідомимо тебе окремо.");

        // Notify Admin
        const adminUser = await prisma.user.findFirst({ where: { role: "ADMIN" } });
        if (adminUser) {
          const adminMsg = `🔥 Нова заявка на CASE CLUB!\n\n` +
            `Від: ${sessionData.name}\n` +
            `Професія: ${sessionData.profession}\n` +
            `Напрям: ${sessionData.direction}\n\n` +
            `Ситуація: ${sessionData.currentSituation}\n\n` +
            `Що пробували: ${sessionData.previousAttempts}\n\n` +
            `Питання: ${sessionData.mainQuestion}\n\n` +
            `Посилання: ${sessionData.igHandle}\n` +
            `Готові наживо: ${readyForLive ? "Так" : "Ні"}`;
          try {
            await ctx.api.sendMessage(adminUser.telegramId.toString(), adminMsg);
          } catch (e) {
            console.error("Failed to notify admin", e);
          }
        }
      }
    }
  });

  bot.on("message:text", async (ctx) => {
    const telegramId = ctx.from.id;
    const session = await prisma.botSession.findUnique({ where: { telegramId } });
    
    if (!session) return; // ignore if no session
    
    const text = ctx.message.text;
    const sessionData = JSON.parse(session.data);
    
    if (session.state === "CASE_NAME") {
      sessionData.name = text;
      await prisma.botSession.update({
        where: { telegramId },
        data: { state: "CASE_PROF", data: JSON.stringify(sessionData) }
      });
      const kb = new InlineKeyboard()
        .text("Майстер", "prof_master").row()
        .text("Власник салону", "prof_owner").row()
        .text("Керівник", "prof_manager").row()
        .text("Бренд", "prof_brand").row()
        .text("Інше", "prof_other");
      await ctx.reply("Чим ви займаєтесь?", { reply_markup: kb });
    }
    else if (session.state === "CASE_SITUATION") {
      sessionData.currentSituation = text;
      await prisma.botSession.update({
        where: { telegramId },
        data: { state: "CASE_ATTEMPTS", data: JSON.stringify(sessionData) }
      });
      await ctx.reply("Що ви вже пробували робити для вирішення цієї ситуації? Який отримали результат?");
    }
    else if (session.state === "CASE_ATTEMPTS") {
      sessionData.previousAttempts = text;
      await prisma.botSession.update({
        where: { telegramId },
        data: { state: "CASE_QUESTION", data: JSON.stringify(sessionData) }
      });
      await ctx.reply("Сформулюйте одне головне питання, яке хочете розібрати на CASE CLUB.");
    }
    else if (session.state === "CASE_QUESTION") {
      sessionData.mainQuestion = text;
      await prisma.botSession.update({
        where: { telegramId },
        data: { state: "CASE_IG", data: JSON.stringify(sessionData) }
      });
      await ctx.reply("Додайте посилання на Instagram / сайт / сторінку бізнесу, якщо це важливо для вашого кейсу.\n(Якщо ні — відправте пробіл або мінус)");
    }
    else if (session.state === "CASE_IG") {
      sessionData.igHandle = text;
      await prisma.botSession.update({
        where: { telegramId },
        data: { state: "CASE_LIVE", data: JSON.stringify(sessionData) }
      });
      const kb = new InlineKeyboard()
        .text("Так", "live_yes")
        .text("Ні", "live_no");
      await ctx.reply("Чи готові ви вийти наживо під час CASE CLUB для розбору вашого кейсу?", { reply_markup: kb });
    }
  });

  bot.catch(async (err) => {
    console.error("Grammy error:", err);
  });
};
