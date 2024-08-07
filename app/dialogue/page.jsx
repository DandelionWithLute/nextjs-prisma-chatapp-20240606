"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
          <ScrollArea className="h-full w-full rounded-md border">
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
