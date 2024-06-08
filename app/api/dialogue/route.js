import { auth } from "@/auth";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export const POST = async () => {
  // get serverside user email
  const session = await auth();
  //   console.log(session);

  let getUserFromSession = await prisma.Dialogue.findMany({
    where: { ownerEmail: session.user?.email },
  });
  //   console.log(session.user);
  //   console.log(getUserFromSession);

  if (!session || !getUserFromSession) return;
  return new NextResponse(
    JSON.stringify(getUserFromSession[0], { status: 200 })
  );
};
