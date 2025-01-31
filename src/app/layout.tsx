/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import "./globals.css";

export const NoteContext = createContext<{
  notes: any[];
  setNotes: Dispatch<SetStateAction<any[]>>;
  settings: boolean;
  setSettings: Dispatch<SetStateAction<boolean>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}>({
  notes: [],
  setNotes: () => {},
  settings: false,
  setSettings: () => {},
  tags: [],
  setTags: () => {},
  darkMode: true,
  setDarkMode: () => {},
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialNotes = localStorage.getItem(
    "notes"
  )
    ? JSON.parse(
        localStorage.getItem("notes") || "[]"
      )
    : [];
  const initialTags = localStorage.getItem("tags")
    ? JSON.parse(
        localStorage.getItem("tags") || "[]"
      )
    : [];

  const [notes, setNotes] =
    useState<any[]>(initialNotes);
  const [tags, setTags] =
    useState<string[]>(initialTags);
  const [darkMode, setDarkMode] =
    useState<boolean>(false);
  const [settings, setSettings] =
    useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(
      "notes",
      JSON.stringify(notes)
    );
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(
      "tags",
      JSON.stringify(tags)
    );
  }, [tags]);

  return (
    <html lang="en">
      <NoteContext.Provider
        value={{
          notes,
          setNotes,
          settings,
          setSettings,
          tags,
          setTags,
          darkMode,
          setDarkMode,
        }}
      >
        <body
          className={`antialiased ${
            darkMode && "darkmode text-white"
          }`}
        >
          {children}
        </body>
      </NoteContext.Provider>
    </html>
  );
}
