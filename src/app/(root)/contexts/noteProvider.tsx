/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Dispatch, SetStateAction } from "react";

type Note = {
  id: string;
  title: string;
  tags: string[];
  date: string;
  content: string;
};

export interface NoteContextType {
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
  showNotes: boolean;
  setShowNotes: Dispatch<SetStateAction<boolean>>;
  settings: boolean;
  setSettings: Dispatch<SetStateAction<boolean>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  selectedNote: Note;
  setSelectedNote: Dispatch<SetStateAction<Note>>;
  isViewNote: boolean;
  setIsViewNote: Dispatch<SetStateAction<boolean>>;
  archive: Note[];
  setArchive: Dispatch<SetStateAction<Note[]>>;
  addNote: (note: Note) => Promise<void>;
  updateNote: (note: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

export const NoteContext = createContext<NoteContextType>({
  notes: [],
  setNotes: () => {},
  showNotes: true,
  setShowNotes: () => {},
  settings: false,
  setSettings: () => {},
  tags: [],
  setTags: () => {},
  darkMode: false, // Default to false to match useState
  setDarkMode: () => {},
  selectedNote: { id: "", title: "", tags: [], date: "", content: "" },
  setSelectedNote: () => {},
  isViewNote: false,
  setIsViewNote: () => {},
  archive: [],
  setArchive: () => {},
  addNote: async () => {},
  updateNote: async () => {},
  deleteNote: async () => {},
});

export const NoteProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // Initial empty states
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [archive, setArchive] = useState<Note[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);
  const [isViewNote, setIsViewNote] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState(true);

  const [selectedNote, setSelectedNote] = useState<Note>({
    id: "",
    title: "",
    tags: [],
    date: "",
    content: "",
  });

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
    fetch("/api/tags")
      .then((res) => res.json())
      .then((data) => setTags(data));
    fetch("/api/archive")
      .then((res) => res.json())
      .then((data) => setArchive(data));
  }, []);

 const addNote = async (note: Note) => {
  await fetch("/api/notes", {
    method: "POST",
    body: JSON.stringify(note),
    headers: { "Content-Type": "application/json" },
  });
  fetch("/api/notes")
    .then((res) => res.json())
    .then((data) => setNotes(data));
};

  const updateNote = async (note: Note) => {
    const res = await fetch(`/api/notes/${note.id}`, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: { "Content-Type": "application/json" },
    });
    const updatedNote = await res.json();
    setNotes((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
  };

  const deleteNote = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const contextValue = {
    notes,
    setNotes,
    showNotes,
    setShowNotes,
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
    addNote,
    updateNote,
    deleteNote,
  };

  return (
    <NoteContext.Provider value={contextValue}>
      {children}
    </NoteContext.Provider>
  );
};