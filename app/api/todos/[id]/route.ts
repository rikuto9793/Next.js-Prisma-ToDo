import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const todoId = Number(params.id);
  if (Number.isNaN(todoId)) return new NextResponse("Not Found", { status: 404 });

  try {
    // 所有者スコープで更新
    const result = await prisma.todo.updateMany({
      where: { id: todoId, userId },
      data: { completed: true }, // ← completed に直す
    });

    if (result.count === 0) return new NextResponse("Not Found", { status: 404 });

    const updated = await prisma.todo.findFirst({ where: { id: todoId, userId } });
    return NextResponse.json(updated);
  } catch (e) {
    console.error(e);
    return new NextResponse("Bad Request", { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const todoId = Number(params.id);
  if (Number.isNaN(todoId)) return new NextResponse("Not Found", { status: 404 });

  try {
    const result = await prisma.todo.deleteMany({
      where: { id: todoId, userId },
    });

    if (result.count === 0) return new NextResponse("Not Found", { status: 404 });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return new NextResponse("Bad Request", { status: 400 });
  }
}
