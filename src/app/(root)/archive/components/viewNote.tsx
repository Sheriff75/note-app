/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaTrash, FaClock, FaTag } from "react-icons/fa";
import DeleteNoteModal from "./deleteModal";
import { useContext } from "react";
import { NoteContext } from "../../contexts/noteProvider";
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
  setIsViewNote: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewNote: React.FC<ViewNoteProps> = ({ selectedNote, setIsViewNote }) => {
  const { darkMode, notes, setNotes, setArchive, archive, deleteNote } = useContext(NoteContext);
  const [isDelete, setIsDelete] = useState(false);

  const addToArchive = async () => {
    await fetch(`/api/archive`, {
      method: "POST",
      body: JSON.stringify(selectedNote),
      headers: { "Content-Type": "application/json" },
    });
    await fetch(`/api/notes/${selectedNote.id}`, {
      method: "DELETE",
    });
    setArchive([...archive, selectedNote]);
    setNotes(notes.filter((item) => item.id !== selectedNote.id));
    setIsViewNote(false);
  };

  const handleDeleteConfirm = async () => {
    await deleteNote(selectedNote.id);
    setIsViewNote(false); // Close view after deletion
  };

  return (
    <div className="flex flex-col pt-5 relative gap-2 border-gray-400 p-4  md:border border-t-0 border-r-0 md:h-full md:min-h-[87.9vh]">
      <div className="absolute right-5 top-5 flex items-center gap-2 md:text-xl text-lg">
        <BiArchiveIn
          className="cursor-pointer "
          onClick={() => {
            addToArchive();
          }}
        />
        <FaTrash
          className="cursor-pointer "
          onClick={() => setIsDelete(true)}
        />  
        <MdCancel
          size={25}
          className="cursor-pointer "
          onClick={() => setIsViewNote(false)}
        />
      </div>
      <div className="border-b">
        <h1 className="md:text-3xl text-xl font-semibold capitalize ">
          {selectedNote.title}
        </h1>
        <span className="flex items-center gap-3 mt-2">
          <span className="flex gap-1 items-center md:text-lg text-md">
            <FaTag className="text-sm" /> Tags
          </span>
          {selectedNote.tags.map((tag: string, index: number) => {
            return (
              <span
                className={`w-fit px-1 text-md capitalize rounded-md my-1 ${
                  darkMode ? "text-white bg-gray-700" : "bg-gray-300"
                }`}
                key={index}
              >
                {tag}
              </span>
            );
          })}
        </span>
        <h2 className="mt-2 flex gap-10 text-md">
          <span className="flex gap-1 items-center md:text-lg text-md">
            <FaClock className="text-md" />
            created on
          </span>
          {selectedNote.date}
        </h2>
      </div>
      <div className="px-4">
        <p className="md:text-lg text-md font-medium ">{selectedNote.content}</p>
      </div>
      {isDelete && (
        <DeleteNoteModal
          selectedNote={selectedNote}
          setIsDelete={setIsDelete}
          onDeleteConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default ViewNote;
