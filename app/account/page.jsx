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
        <>
          {" "}
          <div>
            <div>Your name is {user.name}</div>
            <div>Your email is {user.email}</div>
            <SignOut />
          </div>
        </>
      ) : (
        <>
          <div>You are currently not logged.</div>
          <Link href="http://localhost:3000/login" >Click here to the login page.</Link>
        </>
      )}
    </div>
  );
};

export default page;
