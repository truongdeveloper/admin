import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Metadata } from "next";
import { Providers } from "../providers";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";
import AuthContext from "../AuthContext";

export const metadata: Metadata = {
  title: "Next.js",
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
        <AuthContext>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            theme="dark"
            limit={5}
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss={false}
          />

          <Providers>{children}</Providers>
        </AuthContext>
      </body>
    </html>
  );
}
