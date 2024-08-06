"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const page = ({ params }) => {
  const { data: session, status } = useSession();

  // if (status === "authenticated") {
  //   return <p>Signed in as {session.user.email}</p>;
  // }
  // return <a>Sign in</a>;
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  if (status === "authenticated") {
    const fetcher1 = fetch("http://localhost:3000/api/dialogue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
        {/* Left Side: Cards */}
        <div className="w-[300px]">
          <ScrollArea className="h-full w-full rounded-md border">
            <div className="flex text-2xl p-2 gap-1">2135432</div>
          </ScrollArea>
        </div>
        <Separator orientation="vertical" />
        {/* Right Side: Dialogues */}
        <div className="w-[calc(100% - 300px)] w-full h-full flex flex-col justify-between">
          {/* Dialogue Container */}
          <div>
            {params.id} {inputValue}
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
