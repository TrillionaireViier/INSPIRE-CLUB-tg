import { Bot, webhookCallback } from "grammy";

const token = process.env.TELEGRAM_BOT_TOKEN;

// Initialize bot lazily so it doesn't break build if token is missing
export const getBot = () => {
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN is missing");
  }
  return new Bot(token);
};

// You can add middleware, command handlers here
export const setupBot = (bot: Bot) => {
  bot.command("start", async (ctx) => {
    await ctx.reply(
      "Welcome to INSPIRE CLUB! 🌟\n\n" +
      "Your premium gateway to exclusive masterclasses, networking, and expert sessions.\n\n" +
      "Use the menu below to navigate.",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "📅 Live Sessions", callback_data: "live_sessions" }],
            [{ text: "📚 Content Library", callback_data: "content_library" }],
            [{ text: "💎 Perks & Partners", callback_data: "perks" }],
            [{ text: "🎯 CASE CLUB Apply", callback_data: "case_club" }],
            [{ text: "⚙️ My Subscription", callback_data: "subscription" }]
          ]
        }
      }
    );
  });

  bot.on("callback_query:data", async (ctx) => {
    const data = ctx.callbackQuery.data;
    if (data === "live_sessions") {
      await ctx.answerCallbackQuery();
      await ctx.reply("Here is the schedule for upcoming Live Sessions...");
    } else if (data === "content_library") {
      await ctx.answerCallbackQuery("Only active subscribers can access this!");
      await ctx.reply("📚 Content Library\n\nPlease purchase a subscription to unlock past masterclasses and PDFs.");
    }
    // Handle other callbacks...
  });
};
