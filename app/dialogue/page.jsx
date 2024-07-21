"use client";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="flex  h-[95vh] w-full">
      {/* Left Side: Cards */}
      <div className="w-[300px]">
        <ScrollArea className="h-full w-full rounded-md border">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
          </Card>
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
