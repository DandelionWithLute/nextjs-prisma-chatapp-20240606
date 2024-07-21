import { SignIn } from "@/components/signin-button";
import { getUserInfo } from "@/utils/query";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getUserInfo();
  console.log(user);

  return (
    <div className="flex">
      {user ? (
        redirect("/account")
      ) : (
        <div className="flex items-center justify-center w-full h-[90vh]">
          {SignIn()}
        </div>
      )}
    </div>
  );
};

export default page;
