import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({
  weight: ["500", "700", "400", "300"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workify",
  description: "Get your dream job",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/fabicon.ico" />
        </head>
        <body className={`${roboto.className} antialiased bg-black-100`}>
          <main>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <Navbar />
              {children}
              <Toaster />
            </ThemeProvider>
            <div>
              {modal}
              <div id="modal-root" />
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
