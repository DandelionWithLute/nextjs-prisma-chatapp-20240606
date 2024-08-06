import prisma from "@/utils/prisma";
import { getUserInfo } from "@/utils/query";
import { NextResponse } from "next/server";

export const GET = async () => {
  // GET DIALOGUE AND DIALOGUE DATA
  const user = await getUserInfo();
  if (!user) return;

  const dialogueWithData = await prisma.dialogue.findMany({
    where: { ownerEmail: user.email },
    include: { DialogueData: true },
  });
  return new NextResponse(JSON.stringify(dialogueWithData), { status: 200 });
};
