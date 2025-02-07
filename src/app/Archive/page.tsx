/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useContext } from "react";
import { NoteContext } from "../layout";

import React from "react";

interface Note {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

const Archive = () => {
  const {} = useContext<{
    notes: any[];
    setNotes: React.Dispatch<
      React.SetStateAction<any[]>
    >;
    settings: boolean;
    tags: string[];
    setSettings: React.Dispatch<
      React.SetStateAction<boolean>
    >;
    setTags: React.Dispatch<
      React.SetStateAction<string[]>
    >;
    darkMode: boolean;
    setDarkMode: React.Dispatch<
      React.SetStateAction<boolean>
    >;
    selectedNote: Note;
    setSelectedNote: React.Dispatch<
      React.SetStateAction<Note>
    >;
    isViewNote: boolean;
    setIsViewNote: React.Dispatch<
      React.SetStateAction<boolean>
    >;
    archive: Note[];
    setArchive: React.Dispatch<
      React.SetStateAction<Note[]>
    >;
  }>(NoteContext);
  return( 
  <div className="h-fit min-h-[87.9vh] p-4 border-x)">
    Archive
    </div>);
};

export default Archive;
