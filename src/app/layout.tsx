/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import "./globals.css";
import { NoteProvider } from "./contexts/noteProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const darkMode = false; // or true, depending on your default value

  return (
    <html lang="en">
      <body
        className={`antialiased ${
          darkMode && "darkmode text-white"
        }`}
      >
        <NoteProvider>{children}</NoteProvider>
      </body>
    </html>
  );
}
