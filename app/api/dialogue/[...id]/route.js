import { auth } from "@/auth";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import z from "zod";

export const POST = async (req) => {
  // basic
  let body = await req.json();
  console.log(body);

  // server session
  const session = await auth();
  console.log(session);

  // session check(not done for private)
  if (!session) {
    return new NextResponse(JSON.stringify("Not Authorized!", { status: 401 }));
  }

  // zod datatype validation
  const stringSchema = z.string();
  const text = stringSchema.parse(body.text);

  // check if there's already params
  // temperarilly discarded

  await prisma.dialogueData.create({
    data: {
      text,
      userEmail: session.user.email,
    },
  });
  return new NextResponse(JSON.stringify("POST SUCCESS!", { status: 200 }));
};
