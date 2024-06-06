import { signOut } from "@/auth";
import React from "react";

const page = () => {
  return (
    <div>
      <div>page</div>
      <div>{signOut()}</div>
    </div>
  );
};

export default page;
