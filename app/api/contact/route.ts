import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { name, message } = await req.json();

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

  const text = `📩 Nuevo mensaje de ${name}:\n${message}`;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text }),
  });

  return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
}
