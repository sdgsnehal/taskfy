import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { cardId: string };
  }
) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const auditLog = await db.auditLog.findMany({
      where: {
        orgId,
      },
    });
    return NextResponse.json(auditLog);
  } catch (error) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
