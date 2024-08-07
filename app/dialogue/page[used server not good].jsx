import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/utils/query";
import prisma from "@/utils/prisma";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getUserInfo();
  console.log(user);
  const getDialogues = await prisma.dialogue.findMany({
    where: { ownerEmail: user.email },
  });
  console.log(getDialogues);
  const defaultTitle = { title: "Click Here to Start" };

  const handleStartANewDialogue = async () => {
    const newDialogue = await prisma.dialogue.create({
      data: { ownerEmail: user.email, name: "say hi", title: "Title says hi!" },
    });
    redirect(`/dialogue/${newDialogue.id}`);
  };

  return (
    <div className="flex  h-[95vh] w-full">
      {/* Left Side: Cards */}
      <div className="w-[300px]">
        <ScrollArea className="h-full w-full rounded-md border">
          {getDialogues && getDialogues.length != 0 ? (
            getDialogues.map((item) => (
              <div key={item.id} className="flex text-2xl p-2 gap-1">
                {item.title}
              </div>
            ))
          ) : (
            <div
              onClick={await handleStartANewDialogue()}
              className="flex text-2xl p-2 gap-1"
            >
              {defaultTitle.title}
            </div>
          )}
        </ScrollArea>
      </div>
      <Separator orientation="vertical" />
      {/* Right Side: Dialogues */}
      <div className="w-[calc(100% - 300px)] w-full h-full flex flex-col justify-between">
        {/* Dialogue Container */}
        <div></div>
        {/* Send Messages Here */}
        <div className="flex w-full bottom-0">
          <Input type="email" placeholder="Email" className="w-full" />
          <Button>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
