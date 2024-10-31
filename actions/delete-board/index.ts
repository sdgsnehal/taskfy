"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";
import { createAuditlog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decrementAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const isPro = await checkSubscription();
  const { id } = data;
  let board;
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });
    if (!isPro) {
      await decrementAvailableCount();
    }

    await createAuditlog({
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      entityId: board.id,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete",
    };
  }
  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};
export const deleteBoard = createSafeAction(DeleteBoard, handler);
