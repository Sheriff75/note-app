/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaTrash, FaClock,FaTag } from "react-icons/fa";
import DeleteNoteModal from "./deleteModal";
import { useContext } from "react";
import { NoteContext } from "../contexts/noteProvider";
import { BiArchiveIn } from "react-icons/bi";

interface Note {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

interface ViewNoteProps {
  selectedNote: Note;
  setIsViewNote: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const ViewNote: React.FC<ViewNoteProps> = ({
  selectedNote,
  setIsViewNote,
}) => {
  const { darkMode, notes, setNotes,setArchive,archive } =
    useContext<{
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
  const [isDelete, setIsDelete] = useState(false);

  const addToArchive =() =>{
    setArchive([...archive,selectedNote])
    setNotes(notes.filter(item => item.id !== selectedNote.id))
    setIsViewNote(false)
    localStorage.setItem(
      "archive",
      JSON.stringify(archive)
    )
  }

  return (
    <div className="flex flex-col pt-5 relative gap-2 border-gray-400 p-4  border border-t-0 h-full min-h-[87.9vh]">
      <div className="absolute right-5 top-5 flex items-center gap-2 text-xl">
        <MdCancel
          size={30}
          className="cursor-pointer "
          onClick={() => setIsViewNote(false)}
        />
        <FaTrash
          className="cursor-pointer "
          onClick={() => setIsDelete(true)}
        />
        <BiArchiveIn className="cursor-pointer " onClick={()=>{
          addToArchive()
        }}/>
      </div>
      <div className="border-b">
        <h1 className="text-3xl font-semibold capitalize ">
          {selectedNote.title}
        </h1>
        <span className="flex items-center gap-10 mt-2">
         <span className="flex gap-1 items-center text-lg"><FaTag className="text-sm"/> Tags</span>
          {selectedNote.tags.map(
            (tag: string, index: number) => {
              return (
                <p
                  className={`w-fit px-1 text-md capitalize rounded-md my-1 ${
                    darkMode
                      ? "text-white bg-gray-700"
                      : "bg-gray-300"
                  }`}
                  key={index}
                >
                  {tag}
                </p>
              );
            }
          )}
        </span>
        <h2 className="mt-2 flex gap-10">
        <span className="flex gap-1 items-center text-lg"><FaClock className="text-md"/>Last edited</span>
           {selectedNote.date}</h2>
      </div>
      <div className="px-4">
        <p className="text-lg font-medium ">
          {selectedNote.content}
        </p>
      </div>
      {isDelete && (
        <DeleteNoteModal
          selectedNote={selectedNote}
          setIsDelete={setIsDelete}
          setIsViewNote={setIsViewNote}
          setNotes={setNotes}
          notes={notes}
        />
      )}
    </div>
  );
};

export default ViewNote;
