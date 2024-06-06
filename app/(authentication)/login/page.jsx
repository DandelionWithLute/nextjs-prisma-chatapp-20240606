import { signIn } from "@/auth";
import React from "react";

const page = () => {
  return (
    <div>
      <div>page</div>
      <div>{signIn()}</div>
    </div>
  );
};

export default page;
