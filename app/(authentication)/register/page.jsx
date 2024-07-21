"use client";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

const page = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target[0].value,
        email: e.target[1].value,
        passwordToHash: e.target[2].value,
      }),
    });
    if (response.status == 200) return new NextResponse("OK");
  };

  const user = useSession();
  console.log(user);

  return (
    <div className="flex flex-col gap-4 text-2xl items-center justify-center h-[90vh] w-full">
      {user.status == "authenticated" ? (
        redirect("/account")
      ) : (
        <form onSubmit={handleSubmit}>
          <div>name</div>
          <input type="name" className={styles.border}></input>

          <div>email</div>
          <input type="email" className={styles.border}></input>

          <div>password</div>
          <input type="password" className={styles.border}></input>

          <div></div>
          <button type="submit">submit</button>
        </form>
      )}
    </div>
  );
};

export default page;
