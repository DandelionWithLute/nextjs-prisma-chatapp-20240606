import React from "react";
// import prisma from "@/utils/prisma";

const page = async () => {
  return <div>page</div>;
};

export default page;

{
  /* Crappy Code Here
  let getAllUsers = await prisma.user.findMany();
  let getMyself = await prisma.user.findUnique({ where: { email: "j@g.com" } });
  // console.log(getAllUsers);
  // console.log(getMyself);

  // let newRoom = await prisma.room.create({
  //   data: {
  //     name: "myRoom",
  //     userEmail: "j@g.com",
  //   },
  // });
  // console.log(newRoom);
  // let myRoom = await prisma.room?.findUnique({ where: { name: "myRoom" } });
  // console.log(myRoom);
  console.log(await prisma.room.findMany());

  // console.log(getMyself.name);
  */
}
