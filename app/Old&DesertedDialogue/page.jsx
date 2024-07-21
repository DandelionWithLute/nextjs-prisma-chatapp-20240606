"use client";
import React, { use } from "react";
import { Separator } from "@/components/ui/separator";

// https://www.youtube.com/watch?v=zwQs4wXr9Bg
// https://dev.to/ramonak/javascript-how-to-access-the-return-value-of-a-promise-object-1bck

const getData = async () => {
  let res = await fetch("/api/dialogue");
  return res.json();
};

const gotData = getData();

const page = () => {
  const data = use(gotData);
  console.log(data);
  return (
    <div className="flex  h-[90vh] w-full">
      <div className="w-[300px]">a</div>
      <Separator orientation="vertical" />
      <div className="w-[calc(100% - 300px)]">b</div>
    </div>
  );
};

export default page;
