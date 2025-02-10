/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Dispatch, SetStateAction } from "react";

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
  setArchive: () => {},
});

type Note = {
  id: string;
  title: string;
  tags: string[];
  date: string;
  content: string;
};

export const NoteProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const loadNotes = () => {
    const storedNotes =
      localStorage.getItem("notes");
    return storedNotes
      ? JSON.parse(storedNotes || "[]")
      : [];
  };
  const loadTags = () => {
    const storedTags =
      localStorage.getItem("tags");
    return storedTags
      ? JSON.parse(storedTags || "[]")
      : [];
  };
  const loadArchive = () => {
    const storedArchive =
      localStorage.getItem("archive");
    return storedArchive
      ? JSON.parse(storedArchive || "[]")
      : [];
  };

  const [notes, setNotes] = useState<Note[]>(
    loadNotes()
  );
  const [tags, setTags] =
    useState<string[]>(loadTags());
  const [archive, setArchive] = useState<Note[]>(
    loadArchive()
  );
  const [darkMode, setDarkMode] =
    useState<boolean>(false);
  const [settings, setSettings] =
    useState<boolean>(false);
  const [isViewNote, setIsViewNote] =
    useState<boolean>(false);

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
  useEffect(() => {
    localStorage.setItem(
      "archive",
      JSON.stringify(archive)
    );
  }, [archive]);

  const contextValue = {
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
    setArchive,
  };

  return (
    <NoteContext.Provider value={contextValue}>
      {children}
    </NoteContext.Provider>
  );
};
