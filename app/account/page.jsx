import { getUserInfo } from "@/utils/query";
import React from "react";
import { SignOut } from "@/components/signout-button";
import Link from "next/link";

const page = async () => {
  let userToFetch = await getUserInfo();
  //   console.log(user);
  const user = userToFetch ?? "";

  return (
    <div>
      {user ? (
        <div className="flex items-center justify-center h-[90vh] w-full flex-col">
          {" "}
          <div className="flex flex-col gap-4">
            <div className="text-2xl">User Info</div>
            <div className="text-2xl">Your name is {user.name}</div>
            <div className="text-2xl">Your email is {user.email}</div>
            <div className="text-2xl">
              <SignOut />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>You are currently not logged.</div>
          <Link href="http://localhost:3000/login">
            Click here to the login page.
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
