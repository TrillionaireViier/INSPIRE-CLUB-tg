import { webhookCallback } from "grammy";
import { getBot, setupBot } from "@/lib/bot";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const bot = getBot();
    setupBot(bot);

    // grammy provides a standard web-standard compatible callback
    const handleUpdate = webhookCallback(bot, "std/http");
    
    return handleUpdate(req);
  } catch (err: any) {
    console.error("Webhook error:", err);
    return new Response("Webhook error", { status: 500 });
  }
}
