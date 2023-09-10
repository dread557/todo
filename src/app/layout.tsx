import "./globals.css";
import type { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";
import TaskContextProvider from "@/contexts/TodoContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Todo",
  description: "A tasks organization app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${workSans.variable}`}>
        <TaskContextProvider>{children}</TaskContextProvider>
      </body>
    </html>
  );
}
