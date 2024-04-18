import { ClerkProvider } from "@clerk/nextjs";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "JusTalk",
   description: "JusTalk is a video call , audio app for Users.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <ClerkProvider
            appearance={{
               layout: {
                  socialButtonsVariant: "iconButton",
                  logoImageUrl: "/icons/yoom-logo.svg",
               },
               variables: {
                  colorText: "#fff",
                  colorPrimary: "#0E78F9",
                  colorBackground: "#1C1F2E",
                  colorInputBackground: "#252A41",
                  colorInputText: "#fff",
               },
            }}
         >
            <body className={`${inter.className} bg-dark-1`}>
               <Toaster />
               {children}
            </body>
         </ClerkProvider>
      </html>
   );
}
