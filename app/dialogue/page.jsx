"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather, faRobot } from "@fortawesome/free-solid-svg-icons";

const page = () => {
  const { status } = useSession();

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/api/dialogue")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [newlySentInputValue, setNewlySentInputValue] = useState("");

  // useEffect(() => {
  //   console.log(inputValue);
  // }, [inputValue]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  // console.log("Data is here:", data);

  // Basically I just need to infinitely re-fetch things from the db, thus swr with post is in no need.

  const handleNewTextSubmit = () => {};

  if (status === "authenticated") {
    // console.log(session);

    return (
      <div className="flex h-[95vh] w-full">
        {/* Left Side: Titles */}
        <div className="w-[300px]">
          {/* Adjust min-h here!~ */}
          <div className="flex flex-col gap-3 items-center justify-center min-h-[100px] p-2 mt-4">
            <HoverCard>
              <HoverCardTrigger>
                {/* More development: If it was a new page, we'll guide the user to a new chat page. */}
                {/* Like if the params.id was equal to new */}
                <div
                  className="cursor-pointer hover:text-2xl"
                  onClick={() => {
                    router.push("/dialogue/new");
                  }}
                >
                  New Dialogue
                  <FontAwesomeIcon
                    icon={faFeather}
                    className="text-2xl cursor-pointer"
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm">
                Start a new chat here.
              </HoverCardContent>
            </HoverCard>
            <HoverCard>
              <HoverCardTrigger>
                {/* More development: If it was a new page, we'll guide the user to a new chat page. */}
                {/* Like if the params.id was equal to new */}
                <div className="cursor-pointer hover:text-2xl">
                  AI Configuration
                  <FontAwesomeIcon
                    icon={faRobot}
                    className="text-2xl cursor-pointer"
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm">
                Config AI options here.
              </HoverCardContent>
            </HoverCard>
          </div>

          <ScrollArea className="h-full w-full">
            <div className="text-2xl pl-4 pr-4 pt-1 pb-1 ">Recent</div>
            {data
              .sort((a, b) => b - a)
              .map((d) => (
                <div
                  className="flex pl-2 pr-2 pt-1 pb-1 cursor-pointer"
                  key={d.id}
                  onClick={() => router.push(`/dialogue/${d.id}`)}
                >
                  <div className="flex items-center w-full hover:bg-slate-100 rounded-md h-10">
                    <div className="ml-3 text-muted-foreground text-lg">
                      {d.title}
                    </div>
                  </div>
                </div>
              ))}
          </ScrollArea>
        </div>
        <Separator orientation="vertical" />
        {/* Right Side: Dialogues */}
        <div className="w-[calc(100% - 300px)] w-full h-full flex flex-col justify-between">
          {/* Dialogue Container */}
          <ScrollArea></ScrollArea>
          {/* Send Messages Here */}
          <form className="flex w-full bottom-0" onSubmit={handleNewTextSubmit}>
            <Input
              placeholder="Starts here..."
              className="w-full"
              type="text"
              // onchange was only on client side and this is NOT the server side
              onChange={(e) => setInputValue(e.target.value)}
              id="myInput"
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    );
  }
};
export default page;
