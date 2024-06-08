"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
// import { useSession } from "next-auth/react";

const Page = () => {
  let [loaded, setLoaded] = useState();
  // console.log(loading);
  useEffect(() => {
    funWithUseEffWillWork();
  }, []);

  function funWithUseEffWillWork() {
    setLoaded(true);
  }

  // const session = useSession();
  // console.log(session.data.user);

  return (
    <div className={styles.container}>
      <Link className={styles.link} href={"/account"}>
        account
      </Link>
      <Link className={styles.link} href={"/login"}>
        login
      </Link>
      <Link className={styles.link} href={"/register"}>
        register
      </Link>
      <Link className={styles.link} href={"/dialogue"}>
        dialogue
      </Link>
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

export default Page;
