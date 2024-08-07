import prisma from "@/utils/prisma";
import { getUserInfo } from "@/utils/query";
import { redirect } from "next/dist/server/api-utils";
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

  // Authenticated account with more Validation to make sure no api leak
  if (email != user.email) return;

  // dialogue/new special option:create new dialogue
  if (dialogueId === "new") {
    const createNewDialogue = await prisma.dialogue.create({
      data: {
        // create the title at first then change it later from api or manually
        title: text.slice(0, 8) || "default dialogue title",
        ownerEmail: email,
        name,

        // the difference between name and title is the production source from human or gpt
      },
    });

    const createTheFirstDialogueDataOfIt = await prisma.DialogueData.create({
      data: {
        text,
        userEmail: email,
        dialogueId: createNewDialogue.id,
      },
    });

    return new NextResponse(
      JSON.stringify("Received post from /dialogue/new", { status: 200 })
    );
  }

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
