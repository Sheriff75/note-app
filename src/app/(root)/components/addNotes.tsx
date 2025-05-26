/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useContext } from "react";
import { FaTag, FaAngleRight, FaAngleDown } from "react-icons/fa";
import { BiNote } from "react-icons/bi";
import { NoteContext } from "../contexts/noteProvider";
import { v4 as uuid } from "uuid";
import { MdCancel } from "react-icons/md";
import { Box } from "@mui/material";


interface AddNotesProps {
  date: string;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Note {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

const AddNotes: React.FC<AddNotesProps> = ({ date, setIsCreate}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [addTags, setAddTags] = useState<boolean>(false);
  const [showTags, setShowTags] = useState<boolean>(false);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [tagToAdd, setTagToAdd] = useState<string[]>([]);

  const { tags, darkMode, addNote } = useContext(NoteContext);

  const handleAddTag = () => {
    if (currentTag.length >= 1) {
      setTagToAdd([...tagToAdd, currentTag]);
    }
  };

  const handleAddTagFromList = (tag: string) => {
    setTagToAdd([...tagToAdd, tag]);
  };

  async function handleCreateNote() {
    const id = uuid();
    const noteTitle = title.length > 0 ? title : "Untitled";
    const newNote: Note = {
      id,
      title: noteTitle,
      content,
      tags: tagToAdd,
      date,
    };
    await addNote(newNote);
    // The global tags will be updated via useEffect in Header/Sidebar
    // when 'notes' state is updated by 'addNote'
  }

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if (value.length > 0) {
      setTitle(value);
    } else {
    setTitle("Untitled");
   }
  };
  

  return (
  <Box 
    sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
  
        width: "100%"
      }}
      className="pt-5 gap-2 border-gray-400 items-center md:border border-t-0 border-r-0 "
  >
    <h1 className="text-2xl font-semibold text-center flex justify-center items-center">Create a new note</h1>
    <input
      type="text"
      placeholder="Title"
      className="border-2 p-2 md:w-2/4 w-full rounded-lg"
      onInput={handleTitle}
    />

    {addTags ? (
      <div className="w-2/4 w-full flex flex-col gap-2 items-center">
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
          <input
            type="text"
            placeholder="Add new tag"
            className="border-2 p-2 py-2.5 md:w-[60%] rounded-lg"
            value={currentTag}
            onInput={(e) =>
              setCurrentTag((e.target as HTMLInputElement).value)
            }
          />
          <div
            className="px-4 py-2 rounded-lg relative flex items-center gap-2 md:text-lg text-sm bg-sky-600 md:w-[40%] w-1/2 text-white"
            onClick={() => setShowTags(!showTags)}
          >
            select tag {!showTags ? <FaAngleRight /> : <FaAngleDown />}
            {showTags ? (
              <div
                className={`flex top-10 md:w-40 w-full gap-2 shadow-xl p-1 px-2 rounded-lg flex-col absolute bg-white ${
                  darkMode && " bg-transparent border-2 backdrop-blur-sm"
                }`}
              >
                {tags.length > 0 ? (
                  tags.map((tag, index) => (
                    <button
                      onClick={() => {
                        handleAddTagFromList(tag);
                      }}
                      key={index}
                      className="bg-sky-600 capitalize text-white flex items-center gap-2 w-full p-2 rounded-md"
                    >
                      <FaTag /> {tag}
                    </button>
                  ))
                ) : (
                  <p className="text-sky-600 text-center">
                    You have no saved tags
                  </p>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          className="flex gap-2 rounded-md items-center bg-sky-600 text-white p-2 justify-center text-lg"
          onClick={() => {
            handleAddTag();
            setCurrentTag("");
          }}
        >
          <FaTag /> Add new tag
        </button>
        <div className="flex gap-2 w-full items-center justify-center">
          {tagToAdd.map((tag, index) => (
            <span
              key={index}
              className="bg-sky-600 text-white p-2 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ) : (
      <button
        className="flex gap-2 items-center text-lg bg-sky-600 md:w-3/6 w-full justify-center text-white p-1.5 rounded-md"
        onClick={() => setAddTags(true)}
      >
        Add Tags <FaTag />
      </button>
    )}

    <textarea
      cols={30}
      rows={10}
      placeholder="content"
      className="border-2 rounded-lg p-2 md:w-2/4 w-full h-40 md:h-auto"
      onInput={(e) => setContent((e.target as HTMLInputElement).value)}
    ></textarea>
    <div className="flex gap-5 w-full items-center text-center justify-center">
      <button
        className="flex gap-2 items-center text-lg bg-sky-600 text-white p-2 rounded-md md:w-2/6 w-4/5 justify-center"
        onClick={async () => {
          await handleCreateNote();
          setIsCreate(false);
        }}
      >
        create note <BiNote />
      </button>
      <MdCancel
        size={30}
        className="cursor-pointer"
        onClick={() => setIsCreate(false)}
      />
    </div>
  </Box>
  );
};

export default AddNotes;
