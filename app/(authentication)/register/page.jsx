"use client";
import styles from "./page.module.css";
import { NextResponse } from "next/server";

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

  return (
    <div>
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
    </div>
  );
};

export default page;
