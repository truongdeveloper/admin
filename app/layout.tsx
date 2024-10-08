import "@/styles/globals.css";
import type { Metadata } from "next";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Xác thực tài khoản",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx("font-sans antialiased", fontSans.className)}>
        {children}
      </body>
    </html>
  );
}
