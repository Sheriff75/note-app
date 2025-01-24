/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const NoteContext = createContext<{
  notes: any[];
  setNotes: Dispatch<SetStateAction<any[]>>;
}>({
  notes: [],
  setNotes: () => {},
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);

  return (
    <html lang="en">
      <NoteContext.Provider
        value={{
          notes,
          setNotes,
        }}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </NoteContext.Provider>
    </html>
  );
}
