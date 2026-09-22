import { Bot, webhookCallback, InlineKeyboard } from "grammy";
import prisma from "./prisma";
import { format } from "date-fns";

const token = process.env.TELEGRAM_BOT_TOKEN;

export const getBot = () => {
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is missing");
  }
  return new Bot(token);
};

export const setupBot = (bot: Bot) => {
  bot.command("start", async (ctx) => {
    // Add user to database if they don't exist
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
      .text("📅 Live Sessions", "live_sessions").row()
      .text("📚 Content Library", "content_library").row()
      .text("💎 Perks & Partners", "perks").row()
      .text("🎯 CASE CLUB Apply", "case_club").row()
      .text("⚙️ My Subscription", "subscription");

    await ctx.reply(
      "Welcome to INSPIRE CLUB! 🌟\n\n" +
      "Your premium gateway to exclusive masterclasses, networking, and expert sessions.\n\n" +
      "Use the menu below to navigate.",
      { reply_markup: keyboard }
    );
  });

  bot.on("callback_query:data", async (ctx) => {
    const data = ctx.callbackQuery.data;
    const telegramId = ctx.from.id;

    // Fetch user with subscription
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

      if (sessions.length === 0) {
        return ctx.reply("There are no upcoming live sessions scheduled yet.");
      }

      let message = "📅 **Upcoming Live Sessions**\n\n";
      for (const session of sessions) {
        const dateStr = session.scheduledFor ? format(session.scheduledFor, "MMM d, yyyy h:mm a") : "TBA";
        message += `🔹 *${session.title}*\n⏰ ${dateStr}\n`;
        if (session.description) message += `${session.description}\n`;
        
        if (isSubscribed && session.url) {
          message += `🔗 [Join Stream](${session.url})\n`;
        } else if (!isSubscribed) {
          message += `🔒 *Stream link is hidden for non-subscribers*\n`;
        }
        message += "\n";
      }

      await ctx.reply(message, { parse_mode: "Markdown" });
    } 
    
    else if (data === "content_library") {
      await ctx.answerCallbackQuery();
      
      if (!isSubscribed) {
        return ctx.reply("📚 **Content Library**\n\n🔒 This section is locked. Please purchase a subscription to unlock past masterclasses and PDFs.", { parse_mode: "Markdown" });
      }

      const content = await prisma.content.findMany({
        where: { type: { in: ["VIDEO_RECORDING", "PDF_MATERIAL"] }, isActive: true },
        orderBy: { createdAt: "desc" },
        take: 10
      });

      if (content.length === 0) {
        return ctx.reply("The library is currently empty.");
      }

      let message = "📚 **Content Library**\n\n";
      for (const item of content) {
        const icon = item.type === "VIDEO_RECORDING" ? "🎥" : "📄";
        message += `${icon} *${item.title}*\n`;
        if (item.url) message += `🔗 [Access Material](${item.url})\n`;
        message += "\n";
      }

      await ctx.reply(message, { parse_mode: "Markdown" });
    }
  });

  bot.catch(async (err) => {
    console.error("Grammy error:", err);
    try {
      await err.ctx.reply(`Bot Error: ${err.message}`);
    } catch (e) {}
  });
};
