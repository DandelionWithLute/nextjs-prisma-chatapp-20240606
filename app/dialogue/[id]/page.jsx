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

  const { data, error } = useSWR("http://localhost:3000/api/dialogue", fetcher);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  console.log("Data is here:", data);

  // Basically I just need to infinitely re-fetch things from the db, thus swr with post is in no need.

  if (status === "authenticated") {
    const fetcher2 = fetch("http://localhost:3000/api/dialogue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { name: session.user.name, email: session.user.email },
    });

    console.log(session);

    const handleTextSubmit = (e) => {};

    return (
      <div className="flex h-[95vh] w-full">
        {/* Left Side: Titles */}
        <div className="w-[300px]">
          <ScrollArea className="h-full w-full rounded-md border">
            {data.map((d) => (
              <div className="flex text-2xl p-2 gap-1">{d.title}</div>
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
              <>
                {d.id == params.id &&
                  d.DialogueData.sort((a, b) => a - b).map((Dt) => (
                    <div>{Dt.text}</div>
                  ))}
              </>
            ))}
          </div>
          {/* Send Messages Here */}
          <form
            className="flex w-full bottom-0"
            onSubmit={(e) => handleTextSubmit(e)}
          >
            <Input
              type="email"
              placeholder="Email"
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
