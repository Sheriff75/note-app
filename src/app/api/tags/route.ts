import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const notes: { tags: string[] }[] = await prisma.note.findMany();
    const tags = Array.from(new Set(notes.flatMap((note) => note.tags)));
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Prisma error (tags):", error);
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}