"use client"
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const SignOutwithClient = () => {
  return <Button onClick={() => signOut()}>Signout</Button>;
};

export default SignOutwithClient;
