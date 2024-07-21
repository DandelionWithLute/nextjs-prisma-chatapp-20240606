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
      dialogueId: body.dialogueId[0],
    },
  });
  return new NextResponse(JSON.stringify("POST SUCCESS!", { status: 200 }));
};

export const GET = async (req) => {
  // Dynamic api would not work...
  // const { searchParams } = new URL(req.url);
  // console.log(searchParams);
  // let { pathname } = new URL(req.url);
  // console.log(pathname);
  // let middleArray = pathname.split("/");
  // let dialogueId = middleArray[middleArray.length - 1];
  // console.log(dialogueId);

  const session = await auth();
  console.log(session.user.email);

  const getAllDialogues = await prisma.dialogue.findMany({
    where: { ownerEmail: session.user.email },
  });

  const getAllDialogueTexts = await prisma.dialogueData.findMany({
    where: { userEmail: session.user.email },
  });
  return new NextResponse(
    JSON.stringify([getAllDialogues, getAllDialogueTexts], { status: 200 })
  );
};

/* 
  urlList: [ URL {} ],
    url: URL {
      href: 'http://localhost:3000/api/dialogue/71d50db5-0e9b-4e3c-ba2b-41356154ce54?id=myRoomId&name=myRoomName',       
      origin: 'http://localhost:3000',
      protocol: 'http:',
      username: '',
      password: '',
      host: 'localhost:3000',
      hostname: 'localhost',
      port: '3000',
      pathname: '/api/dialogue/71d50db5-0e9b-4e3c-ba2b-41356154ce54',
      search: '?id=myRoomId&name=myRoomName',
      searchParams: URLSearchParams { 'id' => 'myRoomId', 'name' => 'myRoomName' },
      hash: ''
*/
