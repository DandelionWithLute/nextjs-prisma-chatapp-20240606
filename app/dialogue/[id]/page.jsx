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
import { faFeather } from "@fortawesome/free-solid-svg-icons";

const page = ({ params }) => {
  const { status } = useSession();
  const session = useSession().data; //data: session

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

  const handleTextSubmit = (e) => {
    e.preventDefault();

    // new dialogue created and text sent
    {
      /* */
    }

    // normal already known dialogueId
    fetch("http://localhost:3000/api/dialogue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: session.user.name,
        email: session.user.email,
        text: inputValue,
        dialogueId: params.id,
      }),
    });
    setNewlySentInputValue(inputValue);
    setInputValue("");

    // Failed
    // if (result.new == true) {
    //   router.push(`/dialogue/${result.id}`);
    // }

    if (params.id == "new") {
      router.push(`/dialogue/new/q`);
    }
  };

  // Basically I just need to infinitely re-fetch things from the db, thus swr with post is in no need.

  if (status === "authenticated") {
    // console.log(session);

    return (
      <div className="flex h-[95vh] w-full">
        {/* Left Side: Titles */}

        <div className="w-[300px]">
          <div className="flex items-center justify-center min-h-12 p-2">
            <HoverCard>
              <HoverCardTrigger>
                {/* More development: If it was a new page, we'll guide the user to a new chat page. */}
                {/* Like if the params.id was equal to new */}
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/dialogue/new");
                  }}
                >
                  Create a new Dialogue
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
          </div>

          <ScrollArea className="h-full w-full ">
            {data
              .sort((a, b) => b - a)
              .map((d) => (
                <div
                  className="flex text-2xl p-2 gap-1 cursor-pointer"
                  key={d.id}
                  onClick={() => router.push(`/dialogue/${d.id}`)}
                >
                  {d.title}
                </div>
              ))}
          </ScrollArea>
        </div>
        <Separator orientation="vertical" />
        {/* Right Side: Dialogues */}
        <div className="w-[calc(100% - 300px)] w-full h-full flex flex-col justify-between">
          {/* Dialogue Container */}
          <ScrollArea>
            {/* {params.id} {inputValue}{" "} */}
            {data.map((d) => (
              <div key={d.id}>
                {d.id == params.id &&
                  d.DialogueData.sort((a, b) => a - b).map((Dt) => (
                    <div key={Dt.id}>{Dt.text}</div>
                  ))}
              </div>
            ))}
            {newlySentInputValue}
          </ScrollArea>
          {/* Send Messages Here */}
          <form className="flex w-full bottom-0" onSubmit={handleTextSubmit}>
            <Input
              placeholder="Starts here..."
              className="w-full"
              type="text"
              value={inputValue}
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
