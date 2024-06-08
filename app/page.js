"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";

const page = () => {
  let [loaded, setLoaded] = useState();
  // console.log(loading);
  useEffect(() => {
    funWithUseEffWillWork();
  }, []);

  function funWithUseEffWillWork() {
    setLoaded(true);
  }

  const session = useSession();
  if (loaded) {
    console.log(session);
  }

  return (
    <div className={styles.container}>
      <Link href={"/account"}>account</Link>
      <Link href={"/login"}>login</Link>
      <Link href={"/register"}>register</Link>
      <div>
        {loaded ? (
          <div>useEffect Hook Successfully loaded the DOM!</div>
        ) : (
          <div>Still loading...</div>
        )}
      </div>
    </div>
  );
};

export default page;
