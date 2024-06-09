"use client";
import React, { use } from "react";
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
    <div>
      <div>{data.id} {data.name}</div>
      <div></div>
      <div></div>
      <div></div>
      <div>213</div>
    </div>
  );
};

export default page;
