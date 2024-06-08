import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password"
import prisma from "./utils/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(credentials);
        let user;

        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)

        // logic to verify if user exists
        // user = await getUserFromDb(credentials.email, pwHash)

        let userToCheck = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        console.log(userToCheck);
        if (!userToCheck) {
          return new NextResponse(
            JSON.stringify("Account or Password wrong.", { status: 200 })
          );
        }
        let isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          userToCheck.hashedPassword
        );
        console.log("IsPasswordCorrect Value:" + isPasswordCorrect);

        if (!isPasswordCorrect) {
          return new NextResponse(
            JSON.stringify("Account or Password wrong.", { status: 200 })
          );
        }
        console.log(user);
        user = userToCheck;
        // return user object with the their profile data
        return user;
      },
    }),
  ],
});
