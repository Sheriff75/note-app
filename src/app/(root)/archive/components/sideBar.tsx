/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { NoteContext } from "../../contexts/noteProvider";
import React from "react";
import { GiQuillInk } from "react-icons/gi";
import { BiHome } from "react-icons/bi";
import { FaArchive } from "react-icons/fa";
import { PiTag } from "react-icons/pi";

interface Note {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

const SideBar = () => {
  const { tags, darkMode, notes, setTags } = useContext<{
    notes: any[];
    setNotes: React.Dispatch<React.SetStateAction<any[]>>;
    showNotes: boolean;
    setShowNotes: React.Dispatch<React.SetStateAction<boolean>>;
    settings: boolean;
    tags: string[];
    setSettings: React.Dispatch<React.SetStateAction<boolean>>;
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    selectedNote: Note;
    setSelectedNote: React.Dispatch<React.SetStateAction<Note>>;
    isViewNote: boolean;
    setIsViewNote: React.Dispatch<React.SetStateAction<boolean>>;
    archive: Note[];
    setArchive: React.Dispatch<React.SetStateAction<Note[]>>;
  }>(NoteContext);

  useEffect(() => {
    const usedTags = new Set<string>();
    notes.forEach((note) => {
      note.tags.forEach((tag: string) => usedTags.add(tag));
    });
    setTags(Array.from(usedTags));
  }, [notes, setTags]);

  return (
    <div className="py-5 px-4 col-span-1 row-span-12 row-start-1  ">
      <span className="flex text-2xl">
        <GiQuillInk /> <h1>Notes</h1>
      </span>
      <ul className="mt-4 border-b-2">
        <Link href={"/"}>
          <li
            className={`py-2 flex px-2 gap-2 text-lg font-semibold   items-center ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            } rounded-md`}
          >
            <BiHome /> All Notes
          </li>
        </Link>
        <Link href={"/archive"}>
          <li
            className={`py-2 flex px-2 text-lg font-semibold gap-2 items-center mb-1 ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            } rounded-md`}
          >
            <FaArchive /> Archived
          </li>
        </Link>
      </ul>
      <ul className="mt-4">
        {tags.map((tag, index) => {
          return (
            <li
              key={index}
              className={`py-2 flex px-2 gap-2 items-center ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
              } rounded-md`}
            >
              {" "}
              <PiTag className="text-2xl" />
              <p className="text-nowrap truncate capitalize">{tag}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
