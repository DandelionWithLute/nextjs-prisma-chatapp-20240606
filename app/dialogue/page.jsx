"use client"
import React from "react";
// https://www.youtube.com/watch?v=zwQs4wXr9Bg
const page = async () => {
  let getRooms = await fetch("/api/dialogue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  let data = await getRooms.json();
  console.log(data);
// https://www.youtube.com/watch?v=zwQs4wXr9Bg
  return (
    <div>
      <div></div>
      <div>213</div>
    </div>
  );
};

export default page;
