import prisma from "@/utils/prisma";
import { getUserInfo } from "@/utils/query";
import { NextResponse } from "next/server";
import z from "zod";

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

export const POST = async (req) => {
  const body = await req.json();
  // console.log("body:", body);
  const user = await getUserInfo();
  if (!user) return;

  const stringSchema = z.string().refine((val) => val.length <= 9999, {
    message: "input should be less than 10k",
  });

  const name = stringSchema.parse(body.name);
  const email = stringSchema.parse(body.email);
  const text = stringSchema.parse(body.text);
  const dialogueId = stringSchema.parse(body.dialogueId);
  console.log(name, email, text, dialogueId);

  if (email != user.email) return;

  const saveText = await prisma.DialogueData.create({
    data: {
      text,
      userEmail: email,
      dialogueId,
    },
  });

  console.log(saveText);
  return new NextResponse("You got it, POST finished.");
};
