"use client";
import React from "react";
import Link from "next/link";
import styles from "./page.module.css"

const page = () => {
  return (
    <div className={styles.container}>
      <Link href={"/account"}>account</Link>
      <Link href={"/login"}>login</Link>
      <Link href={"/register"}>register</Link>
    </div>
  );
};

export default page;
