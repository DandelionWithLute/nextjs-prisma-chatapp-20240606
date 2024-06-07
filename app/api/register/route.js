import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import bcrypt, { hash } from "bcrypt";

export const POST = async (req) => {
  // get info from frontend
  let body = await req.json();
  const { name, email, passwordToHash } = body;
  console.log(name, email, passwordToHash);

  // hash password
  let hashedPassword = await bcrypt.hash(passwordToHash, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return new NextResponse(JSON.stringify("POST Success!", { status: 200 }));
};
