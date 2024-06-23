import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  // To be changed
  const getMany = await prisma.publicSocial.findMany({
    select: {
      id: true,
      createdAt: true,
      title: true,
      img: true,
      desc: true,
      likes: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  // const getMany = await prisma.publicSocial.findMany()
  return new NextResponse(JSON.stringify(getMany), { status: 200 });
};
