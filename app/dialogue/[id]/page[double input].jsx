"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const page = ({ params }) => {
  const { status } = useSession();
  const session = useSession().data; //data: session

  const { data, error, mutate } = useSWR(
    "http://localhost:3000/api/dialogue",
    fetcher
  );

  const [inputValue, setInputValue] = useState("");
  const [newlySentInputValue, setNewlySentInputValue] = useState("");

  // useEffect(() => {
  //   console.log(inputValue);
  // }, [inputValue]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  // console.log("Data is here:", data);

  const handleTextSubmit = (e) => {
    e.preventDefault();
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
    setNewlySentInputValue(inputValue)
    e.target.value = "";
    mutate("/api/dialogue");
  };

  // Basically I just need to infinitely re-fetch things from the db, thus swr with post is in no need.

  if (status === "authenticated") {
    // console.log(session);

    return (
      <div className="flex h-[95vh] w-full">
        {/* Left Side: Titles */}
        <div className="w-[300px]">
          <ScrollArea className="h-full w-full rounded-md border">
            {data
              .sort((a, b) => b - a)
              .map((d) => (
                <div className="flex text-2xl p-2 gap-1" key={d.id}>
                  {d.title}
                </div>
              ))}
          </ScrollArea>
        </div>
        <Separator orientation="vertical" />
        {/* Right Side: Dialogues */}
        <div className="w-[calc(100% - 300px)] w-full h-full flex flex-col justify-between">
          {/* Dialogue Container */}
          <div>
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
          </div>
          {/* Send Messages Here */}
          <form className="flex w-full bottom-0" onSubmit={handleTextSubmit}>
            <Input
              placeholder="Starts here..."
              className="w-full"
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
