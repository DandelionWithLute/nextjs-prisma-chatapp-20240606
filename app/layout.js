import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Headers from "@/components/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, session }) {
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Headers />
          {children}</body>
      </html>
    </SessionProvider>
  );
}
