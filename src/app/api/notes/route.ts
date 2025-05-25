import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const notes = await prisma.note.findMany({ where: { archived: false } });
  return NextResponse.json(notes);
}

export async function POST(req: Request) {
  const data = await req.json();
  console.log("Received data:", data); // <-- Add this line
  try {
    const note = await prisma.note.create({ data });
    return NextResponse.json(note);
  } catch (error) {
    console.error("Prisma error:", error); // <-- Add this line
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}