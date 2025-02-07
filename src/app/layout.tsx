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
  selectedNote: Note;
  setSelectedNote: Dispatch<SetStateAction<Note>>;
  isViewNote: boolean;
  setIsViewNote: Dispatch<
    SetStateAction<boolean>
  >;
  archive: Note[];
  setArchive: Dispatch<SetStateAction<Note[]>>;
}>({
  notes: [],
  setNotes: () => {},
  settings: false,
  setSettings: () => {},
  tags: [],
  setTags: () => {},
  darkMode: true,
  setDarkMode: () => {},
  selectedNote: {
    id: "",
    title: "",
    tags: [],
    date: "",
    content: "",
  },
  setSelectedNote: () => {},
  isViewNote: false,
  setIsViewNote: () => {},
  archive: [],
  setArchive: () => {}
});

type Note = {
  id: string;
  title: string;
  tags: string[];
  date: string;
  content: string;
};

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
    const initialArchive = localStorage.getItem("archive")
    ? JSON.parse(
        localStorage.getItem("archive") || "[]"
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
  const [isViewNote, setIsViewNote] =
    useState(false);
  const [archive,setArchive] = useState<Note[]>(initialArchive)

  const [selectedNote, setSelectedNote] =
    useState<Note>({
      id: "",
      title: "",
      tags: [],
      date: "",
      content: "",
    });
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
          selectedNote,
          setSelectedNote,
          isViewNote,
          setIsViewNote,
          archive,
          setArchive
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
