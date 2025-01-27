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
  settings: boolean;
  setSettings: Dispatch<SetStateAction<boolean>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}>({
  notes: [],
  setNotes: () => {},
  settings: false,
  setSettings: () => {},
  tags:[],
  setTags:()=>{}
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [notes, setNotes] = useState<any[]>([]);
  const [tags ,setTags] = useState<string[]>([])
  const [settings, setSettings] = useState<boolean>(false)

  return (
    <html lang="en">
      <NoteContext.Provider
        value={{
          notes,
          setNotes,
          settings,
          setSettings,
          tags,
          setTags
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
