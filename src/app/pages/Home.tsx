/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  useState,
  useEffect,
} from "react";
import { BiPlus } from "react-icons/bi";
import AddNotes from "../components/addNotes";
import ViewNote from "../components/viewNote";
import { useContext } from "react";
import { NoteContext } from "../layout";



type Note = {
  id: string;
  title: string;
  tags: string[];
  date: string;
  content:string;
};
const Home = () => {
  const [isCreate, setIsCreate] = useState(false);

  const [date, setDate] = useState<string>("");
  const { notes, darkMode,selectedNote,setSelectedNote,isViewNote,setIsViewNote } = useContext<{
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
      setSelectedNote: React.Dispatch<React.SetStateAction<Note>>;
    isViewNote: boolean;
    setIsViewNote: React.Dispatch<React.SetStateAction<boolean>>;
  }>(NoteContext);

  useEffect(() => {
    const formattedDate =
      new Date().toLocaleDateString();
    setDate(formattedDate);
  }, [isCreate]);

  return (
    <div className="flex h-fit min-h-[80vh] border border-t-0 border-r-0">
      <div className="w-1/4 active:outline-none   p-3 h-fit min-h-[86.9vh]">
        <button
          className="flex items-center bg-sky-600 mb-3 text-white p-2 rounded-md w-full justify-center font-bold"
          onClick={() => setIsCreate(true)}
        >
          {" "}
          <BiPlus />
          Create new note
        </button>
        <div>
          {notes.map((note, index) => (
            <div
            onClick={
              () => {setIsViewNote(true)
                setSelectedNote(note)
                setIsCreate(false)
              }
            }
              key={index}
              className={`flex flex-col p-1  hover:cursor-pointer mt-1 rounded-lg ${
                darkMode
                  ? "hover:bg-gray-800"
                  : "hover:bg-gray-200"
              } `}
            >
              <h1 className="text-lg  capitalize truncate">
                {note.title}
              </h1>
              <div className="flex gap-2 flex-wrap">
                {note.tags.map(
                  (
                    tag: string,
                    index: number
                  ) => {
                    return (
                      <span
                        key={index}
                        className={`w-fit px-1 text-md capitalize rounded-md my-1 ${
                          darkMode
                            ? "text-white bg-gray-700"
                            : "bg-gray-300"
                        }`}
                      >
                        {tag}
                      </span>
                    );
                  }
                )}
              </div>
              <p className="text-sm">
                {note.date}
              </p>
              <hr />
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 h-[100%]">
        {!isCreate && !isViewNote && (
          <div className="flex justify-center items-center h-[86.9vh] border border-t-0">
            <h1 className="text-2xl text-gray-400">
              Select a note to view or create a
              new note.
            </h1>
          </div>
        )}
        {isCreate && (
          <AddNotes
            date={date}
            setIsCreate={setIsCreate}
          />
        )}
        {
          isViewNote && (
            <ViewNote selectedNote={selectedNote}  setIsViewNote={setIsViewNote}/>
          )
        }
      </div>
    </div>
  );
};

export default Home;
