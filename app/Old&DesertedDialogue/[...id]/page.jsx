"use client";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { use } from "react";
import styles from "./page.module.css";

const getData = async () => {
  let res = await fetch("/api/dialogue/custom");
  return res.json();
};
const gotData = getData();

const Page = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const handleTextSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/dialogue/custom`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: e.target[0].value, dialogueId: params.id }),
    });
  };

  // GET
  const data = use(gotData);
  console.log(data);

  return (
    <div>
      <div>Subpage Dynamic Route</div>
      <form onSubmit={handleTextSubmit}>
        <div>Send a text</div>
        <input className={styles.inputA}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;
