"use client";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import styles from "./page.module.css";

const Page = () => {
  const params = useParams();
  console.log(params);
  const searchParams = useSearchParams();
  console.log(searchParams);

  const handleTextSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/dialogue/${params.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: e.target[0].value }),
    });
  };

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
