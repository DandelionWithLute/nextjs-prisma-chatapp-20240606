"use client";
import styles from "./page.module.css";
import { NextResponse } from "next/server";

const page = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/explore`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target[0].value,
        img: e.target[1].value,
        desc: e.target[2].value,
      }),
    });
    if (response.status == 200) return new NextResponse("OK");
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[calc(100vh-56px)] ">
      <form onSubmit={handleSubmit}>
        <div>Title</div>
        <input className={styles.border}></input>

        <div>Image</div>
        <input className={styles.border}></input>

        <div>Description</div>
        <input className={styles.border}></input>

        <div></div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default page;
