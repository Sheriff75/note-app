import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const archive = await prisma.note.findMany({ where: { archived: true } });
    return NextResponse.json(archive);
  } catch (error) {
    console.error("Prisma error (archive):", error);
    return NextResponse.json({ error: "Failed to fetch archive" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const note = await prisma.note.update({
      where: { id: data.id },
      data: { archived: true },
    });
    return NextResponse.json(note);
  } catch (error) {
    console.error("Prisma error (archive POST):", error);
    return NextResponse.json({ error: "Failed to archive note" }, { status: 500 });
  }
}