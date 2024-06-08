// https://zod.dev/?id=schema-methods
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import z from "zod";

export const POST = async (req, res) => {
  // get info from frontend
  let body = await req.json();
  // const { name, email, passwordToHash } = body; // Discarded
  // console.log(name, email, passwordToHash);

  // zod schema
  let nameSchema = z.string().refine((val) => val.length <= 20, {
    message: "Length should be more than 20.",
  });
  let emailSchema = z
    .string()
    .email()
    .refine((val) => val.length <= 99, {
      message: "Length should be more than 20.",
    });
  let passwordSchema = z.string().refine((val) => val.length <= 99, {
    message: "Length should be more than 20.",
  });

  let parsedName = nameSchema.parse(body.name);
  let parsedEmail = emailSchema.parse(body.email);
  let parsedPassword = passwordSchema.parse(body.passwordToHash);

  // hash password
  let hashedPassword = await bcrypt.hash(parsedPassword, 10);
  if (parsedEmail && parsedPassword && parsedName) {
    await prisma.user.create({
      data: {
        name: parsedName,
        email: parsedEmail,
        hashedPassword,
      },
    });
  }
  if (!res.ok)
    return new NextResponse(
      JSON.stringify("There's an Error!", { status: 500 })
    );

  return new NextResponse(JSON.stringify("POST Success!", { status: 200 }));
};
