import { NextResponse } from "next/server";
import { prisma } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content } = body;
    if (!content) return NextResponse.json({ error: "No regret" }, { status: 400 });

    await prisma.regret.create({ data: { content } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ error: "Invalid body" }, { status: 500 });
  }
}

export async function GET() {
  const regrets = await prisma.regret.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ regrets: regrets.map((r) => r.content) });
}
