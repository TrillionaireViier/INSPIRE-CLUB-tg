import { POST } from "./src/app/api/webhook/telegram/route";

async function run() {
  const req = new Request("http://localhost/api/webhook/telegram", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      update_id: 10000,
      message: {
        message_id: 1365,
        from: { id: 999999999, is_bot: false, first_name: "Test", username: "testuser" },
        chat: { id: 999999999, first_name: "Test", username: "testuser", type: "private" },
        date: 1690000000,
        text: "/start",
        entities: [{ offset: 0, length: 6, type: "bot_command" }]
      }
    })
  });

  const res = await POST(req);
  console.log("Status:", res.status);
  console.log("Body:", await res.text());
}

run().catch(console.error);
