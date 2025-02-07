/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
} from "react";
import ViewNote from "../components/viewNote";
import { useContext } from "react";
import { NoteContext } from "../../layout";

type Note = {
  id: string;
  title: string;
  tags: string[];
  date: string;
  content: string;
};
 const Main = () => {
  const [isCreate, setIsCreate] = useState(false);

  const {
    notes,
    darkMode,
    selectedNote,
    setSelectedNote,
    isViewNote,
    setIsViewNote,
  } = useContext<{
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


  return (
    <div className="flex col-span-4 row-span-12 border border-t-0 border-r-0">
      <div className="w-1/4 active:outline-none p-4">
       <h1 className="text-2xl font-bold pb-4">Archived Notes</h1>
        <div>
          {notes.map((note, index) => (
            <div
              onClick={() => {
                setIsViewNote(true);
                setSelectedNote(note);
                setIsCreate(false);
              }}
              key={index}
              className={`flex flex-col p-2 border hover:cursor-pointer mt-1 rounded-lg ${
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
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 h-[100%]">
        {!isCreate && !isViewNote && (
          <div className="flex justify-center items-center h-full border border-t-0 border-b-0">
            <h1 className="text-2xl text-gray-400">
              Select a note to view or create a
              new note.
            </h1>
          </div>
        )}
        {isViewNote && (
          <ViewNote
            selectedNote={selectedNote}
            setIsViewNote={setIsViewNote}
          />
        )}
      </div>
    </div>
  );
};

export default  Main