// https://zod.dev/?id=schema-methods
import prisma from "@/utils/prisma";
import { getUserInfo } from "@/utils/query";
import { NextResponse } from "next/server";
import z from "zod";

export const POST = async (req, res) => {
  // get info from frontend
  let body = await req.json();

  // zod schema
  let titleSchema = z.string().refine((val) => val.length <= 200, {
    message: "Title length should be less than 200 letters.",
  });
  let imgSchema = z.string().refine((val) => val.length <= 999, {
    message: "Image url length should be less than 999 letters.",
  });
  let descSchema = z.string().refine((val) => val.length <= 9999, {
    message: "Description length should be less than 9999 letters.",
  });

  let parsedTitle = titleSchema.parse(body.title);
  let parsedImage = imgSchema.parse(body.img);
  let parsedDesc = descSchema.parse(body.desc);

  // get user
  const user = await getUserInfo();
  const userEmail = user.email;

  // hash password
  if (parsedTitle && parsedImage && parsedDesc) {
    await prisma.publicSocial.create({
      data: {
        userEmail,
        title: parsedTitle,
        img: parsedImage,
        desc: parsedDesc,
      },
    });
  }
  if (!res.ok)
    return new NextResponse(
      JSON.stringify("There was an Error!", { status: 500 })
    );

  return new NextResponse(JSON.stringify("POST Success!", { status: 200 }));
};
