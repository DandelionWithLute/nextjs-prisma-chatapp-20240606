import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  console.log(session.user);
  return (
    <div className={styles.container}>
      <Link href={"/account"}>account</Link>
      <Link href={"/login"}>login</Link>
      <Link href={"/register"}>register</Link>
    </div>
  );
};

export default page;
