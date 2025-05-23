"use client";
import "./globals.css";
import { NoteProvider } from "./(root)/contexts/noteProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const darkMode = false;

  return (
    <html lang="en">
      <body className={`antialiased ${darkMode && "darkmode text-white"}`}>
        <NoteProvider>{children}</NoteProvider>
      </body>
    </html>
  );
}
