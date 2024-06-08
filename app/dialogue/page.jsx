"use client"
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  const toSubpage = router.push(
    "/dialogue/mydialogue?id=myRoomId&name=myRoomName"
  );
  return (
    <div>
      page
      <button onClick={toSubpage}>Click to push params</button>
    </div>
  );
};

export default page;
