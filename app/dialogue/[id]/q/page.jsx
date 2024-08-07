import prisma from "@/utils/prisma";
import { getUserInfo } from "@/utils/query";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getUserInfo();
  if (!user) return;

  const findLatestDialogue = await prisma.dialogue.findFirst({
    where: { ownerEmail: user.email },
    orderBy: { createdAt: "desc" },
  });

  redirect(`http://localhost:3000/dialogue/${findLatestDialogue.id}`);

  return (
    <div className="flex flex-col h-[90vh] w-full items-center justify-center text-2xl">
      <div>Currently Redirecting you to the new page:</div>
      <div>{findLatestDialogue.id}</div>
      {redirect(`http://localhost:3000/dialogue/${findLatestDialogue.id}`)}
    </div>
  );
};

export default page;
