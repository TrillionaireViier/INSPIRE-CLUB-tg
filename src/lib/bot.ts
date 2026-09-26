import { Bot, webhookCallback, InlineKeyboard } from "grammy";
import prisma from "./prisma";
import { format } from "date-fns";

const token = process.env.TELEGRAM_BOT_TOKEN || "8744514192:AAEFv7hCfy6evbjIS3ZfEPiluy7-DIwOdlY";
const ADMIN_ID = 569302636; // We'll need a way to notify admin. I will use a fallback or the first admin user. Actually, better to query the first user with role ADMIN.

export const getBot = () => {
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is missing");
  }
  return new Bot(token);
};

async function showMainMenu(ctx: any) {
  if (ctx.from) {
    try {
      await prisma.user.update({
        where: { telegramId: ctx.from.id },
        data: {
          username: ctx.from.username,
          firstName: ctx.from.first_name,
          lastName: ctx.from.last_name,
        }
      });
    } catch (e) {
      // User might not exist if they somehow bypassed, but let's just ignore
    }
  }

  const keyboard = new InlineKeyboard()
    .text("📅 Живі ефіри", "live_sessions").row()
    .text("📚 Бібліотека контенту", "content_library").row()
    .text("💎 Партнери та знижки", "perks").row()
    .text("🎯 ПОДАТИ КЕЙС", "case_club").row()
    .text("⚙️ Моя підписка", "subscription");

  const welcomeText = `Ти всередині простору, створеного для творців сфери краси.

Тут ми зібрали знання, досвід, сильне оточення та можливості, які допомагають не просто ставати кращим у своїй професії , а рости у доході, масштабі та власному рівні.

INSIDE - це місце, де можна знайти потрібних людей, отримати відповідь на свій запит, побачити нові точки росту, навчатися у сильних і бути частиною середовища, яке рухається вперед.

Тут важливо не просто дивитися.
Знайомся. Запитуй. Ділись. Використовуй можливості.

Ти вже INSIDE.

Твій професійний LEVEL ↑`;

  await ctx.reply(welcomeText, { reply_markup: keyboard, parse_mode: "HTML", link_preview_options: { is_disabled: true } });
}

export const setupBot = (bot: Bot) => {
  bot.command("start", async (ctx) => {
    if (!ctx.from) return;
    
    let user = await prisma.user.findUnique({ where: { telegramId: ctx.from.id } });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          telegramId: ctx.from.id,
          username: ctx.from.username,
          firstName: ctx.from.first_name,
          lastName: ctx.from.last_name,
          subscription: {
            create: {
              status: "GUEST"
            }
          }
        }
      });
      
      await prisma.botSession.upsert({
        where: { telegramId: ctx.from.id },
        update: { state: "AWAITING_PROMO", data: "{}" },
        create: { telegramId: ctx.from.id, state: "AWAITING_PROMO", data: "{}" }
      });
      return ctx.reply("🔒 Для входу в клуб введіть спеціальний <b>промокод</b>:", { parse_mode: "HTML" });
    }

    const sub = await prisma.subscription.findUnique({ where: { userId: user.id } });
    if (sub?.status === "GUEST") {
      await prisma.botSession.upsert({
        where: { telegramId: ctx.from.id },
        update: { state: "AWAITING_PROMO", data: "{}" },
        create: { telegramId: ctx.from.id, state: "AWAITING_PROMO", data: "{}" }
      });
      return ctx.reply("🔒 Для входу в клуб введіть спеціальний <b>промокод</b>:", { parse_mode: "HTML" });
    }

    await showMainMenu(ctx);
  });

  bot.command("reset", async (ctx) => {
    if (!ctx.from) return;
    
    // Release any used promocode back to active status
    await prisma.promocode.updateMany({
      where: { usedByTelegramId: ctx.from.id },
      data: { isActive: true, usedByTelegramId: null }
    });
    
    await prisma.user.deleteMany({ where: { telegramId: ctx.from.id } });
    await prisma.botSession.deleteMany({ where: { telegramId: ctx.from.id } });
    return ctx.reply("Ваш профіль видалено з бази, а промокод знову активний. Натисніть /start щоб пройти реєстрацію заново.");
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
        orderBy: { scheduledFor: "asc" }
      });

      if (sessions.length === 0) {
        return ctx.reply("📅 Наразі немає запланованих живих ефірів. Слідкуйте за анонсами!");
      }

      let message = `📅 <b>Розклад трансляцій</b>\n\n`;
      
      for (const session of sessions) {
        const dateStr = session.scheduledFor 
          ? new Date(session.scheduledFor).toLocaleDateString("uk-UA", { day: "2-digit", month: "2-digit" })
          : "";
        
        message += `<b>${dateStr ? dateStr + ' | ' : ''}${session.title}</b>\n`;
        if (session.description) {
          message += `${session.description}\n`;
        }
        if (session.url) {
          message += `🔗 <a href="${session.url}">Приєднатися до ефіру</a>\n`;
        }
        message += `\n`;
      }
      
      await ctx.reply(message, { parse_mode: "HTML" });
    }
    else if (data === "content_library") {
      await ctx.answerCallbackQuery();
      if (!user) return ctx.reply("📚 <b>Бібліотека контенту</b>\n\n🔒 Цей розділ закрито. Будь ласка, введіть промокод для доступу.", { parse_mode: "HTML" });
      
      const content = await prisma.content.findMany({
        where: { type: { in: ["VIDEO_RECORDING", "PDF_MATERIAL"] }, isActive: true },
        orderBy: { createdAt: "desc" },
        take: 10
      });
      if (content.length === 0) return ctx.reply("Бібліотека наразі порожня.");
      
      let message = "📚 <b>Бібліотека контенту</b>\n\n";
      for (const item of content) {
        const icon = item.type === "VIDEO_RECORDING" ? "🎥" : "📄";
        message += `${icon} <b>${item.title}</b>\n`;
        if (item.description) {
          message += `\n<i>${item.description}</i>\n`;
        }
        if (item.url) message += `\n🔗 <a href="${item.url}">Відкрити матеріал</a>\n`;
        message += "\n〰️〰️〰️〰️〰️〰️〰️〰️〰️\n\n";
      }
      await ctx.reply(message, { parse_mode: "HTML" });
    }
    // PERKS / PARTNER DISCOUNTS
    else if (data === "perks") {
      await ctx.answerCallbackQuery();

      const activePerks = await prisma.partnerPerk.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" }
      });

      if (activePerks.length === 0) {
        const msg = `💎 <b>Знижки від партнерів</b>\n\nЗараз ми готуємо для вас ексклюзивні пропозиції від топових брендів. Прямо зараз активних промокодів немає, але нова хвиля потужних знижок уже на підході!\n\nЩойно партнерські бонуси стануть доступними — ви одразу отримаєте персональне повідомлення із деталями та промокодами. Слідкуйте за повідомленнями. 🙌`;
        return ctx.reply(msg, { parse_mode: "HTML" });
      }

      let message = "💎 <b>Знижки від партнерів</b>\n\n";
      for (const perk of activePerks) {
        message += `🎁 <b>${perk.brand}</b>\n`;
        if (perk.description) message += `${perk.description}\n`;
        if (perk.promoCode) message += `\n🏷 Промокод: <code>${perk.promoCode}</code>\n`;
        if (perk.discount) message += `💸 Знижка: ${perk.discount}\n`;
        if (perk.link) message += `🔗 <a href="${perk.link}">Перейти до пропозиції</a>\n`;
        message += "\n〰️〰️〰️〰️〰️〰️〰️〰️〰️\n\n";
      }
      await ctx.reply(message, { parse_mode: "HTML", link_preview_options: { is_disabled: true } });
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
      await ctx.reply("Для CASE CLUB 13 жовтня заявки приймаємо до 10 жовтня включно.\n\nЧудово! Давайте заповнимо анкету для CASE CLUB.\n\nВведіть ваше <b>Імʼя та прізвище:</b>", { parse_mode: "HTML" });
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
        const adminMsg = `🔥 Нова заявка на CASE CLUB!\n\n` +
          `Від: ${sessionData.name}\n` +
          `Професія: ${sessionData.profession}\n` +
          `Напрям: ${sessionData.direction}\n\n` +
          `Ситуація: ${sessionData.currentSituation}\n\n` +
          `Що пробували: ${sessionData.previousAttempts}\n\n` +
          `Питання: ${sessionData.mainQuestion}\n\n` +
          `Посилання: ${sessionData.igHandle}\n` +
          `Готові наживо: ${readyForLive ? "Так" : "Ні"}`;
          
        const adminIds = ["390375809"]; // Hardcoded user ID
        const adminUsers = await prisma.user.findMany({ where: { role: "ADMIN" } });
        for (const u of adminUsers) {
          if (!adminIds.includes(u.telegramId.toString())) {
            adminIds.push(u.telegramId.toString());
          }
        }
        
        for (const id of adminIds) {
          try {
            await ctx.api.sendMessage(id, adminMsg);
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
    
    const text = ctx.message.text || "";
    const sessionData = JSON.parse(session.data);
    
    if (session.state === "AWAITING_PROMO") {
      const codeInput = text.trim().toUpperCase();
      const validPromo = await prisma.promocode.findUnique({
        where: { code: codeInput }
      });
      
      if (validPromo && validPromo.isActive) {
        const user = await prisma.user.findUnique({ where: { telegramId: ctx.from.id } });
        if (user) {
          await prisma.subscription.update({
            where: { userId: user.id },
            data: { status: "ACTIVE" }
          });
        }
        await prisma.promocode.update({
          where: { id: validPromo.id },
          data: { isActive: false, usedByTelegramId: ctx.from.id }
        });
        await prisma.botSession.delete({ where: { telegramId } });
        await ctx.reply("✅ Промокод прийнято! Вітаємо в клубі.");
        return showMainMenu(ctx);
      } else {
        return ctx.reply("❌ Невірний або неактивний промокод. Спробуйте ще раз:");
      }
    }
    else if (session.state === "CASE_NAME") {
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
