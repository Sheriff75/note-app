/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { MdCancel } from "react-icons/md";
import { useContext } from "react";
import { NoteContext } from "../layout";

interface Note {
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
   const { darkMode } = useContext<{
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
   }>(NoteContext);
  return (
    <div className="flex flex-col pt-5 relative gap-2 border-gray-400 p-4  border border-t-0 h-full min-h-[578px]">
      <MdCancel
        size={30}
        className="cursor-pointer absolute right-5 top-5"
        onClick={() => setIsViewNote(false)}
      />
      <div className="border-b">
      <h1 className="text-3xl font-semibold capitalize ">
        {selectedNote.title}
      </h1>
<span className="flex items-center gap-1">
     Tags:   
{selectedNote.tags.map(
        (tag: string, index: number) => {
          return <p className={`w-fit px-1 text-md capitalize rounded-md my-1 ${
            darkMode
              ? "text-white bg-gray-700"
              : "bg-gray-300"
          }`}key={index}>{tag}</p>;
        }
      )}
</span>
      <h2>{selectedNote.date}</h2>
      </div>
      <div className="px-4">
        <p className="text-lg font-medium ">{selectedNote.content}</p>
      </div>
    </div>
  );
};

export default ViewNote;
