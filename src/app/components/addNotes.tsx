/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import {
  FaTag,
  FaAngleRight,
  FaAngleDown,
} from "react-icons/fa";
import { BiNote } from "react-icons/bi";
import { NoteContext } from "../layout";

interface AddNotesProps {
  date: string;
  setIsCreate: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const AddNotes: React.FC<AddNotesProps> = ({
  date,
  setIsCreate,
}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] =
    useState<string>("");

  const [addTags, setAddTags] =
    useState<boolean>(true);
  const [showTags, setShowTags] =
    useState<boolean>(false);
  const [tag, setTag] = useState<string>("");
  const [tagToAdd, setTagToAdd] = useState<
    string[]
  >([]);

  const { notes, setNotes, tags, setTags } =
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
    }>(NoteContext);

  useEffect(() => {
    tagToAdd.map((tag) => {
      if (!tags.includes(tag)) {
        setTags([...tags, tag]);
      }
    });
  }, [tagToAdd]);

  const handleAddTag = () => {
    if (tag.length >= 1) {
      setTagToAdd([...tagToAdd, tag]);
    }
  };

  const handleCreateNote = () => {
    setNotes([
      ...notes,
      {
        title,
        content,
        tags: tagToAdd,
        date,
      },
    ]);
  };
  return (
    <div className="flex flex-col  justify-center gap-2 items-center border-2 border-t-0 h-full min-h-[578px]">
      <h1 className="text-3xl text-gray-400">
        Create a new note
      </h1>
      <input
        type="text"
        placeholder="Title"
        className="border-2 p-2 py-2.5 w-2/4 rounded-lg "
        onInput={(e) =>
          setTitle(
            (e.target as HTMLInputElement).value
          )
        }
      />

      {addTags ? (
        <div className="w-2/4 flex flex-col gap-2 items-center">
          <div className="flex gap-2 w-full items-center justify-between">
            <input
              type="text"
              placeholder="Add new tag"
              className="border-2 p-2 py-2.5 w-[63%]  rounded-lg "
              value={tag}
              onInput={(e) =>
                setTag(
                  (e.target as HTMLInputElement)
                    .value
                )
              }
            />
            <div
              className="px-4 py-2 rounded-lg capitalize relative flex items-center gap-2 text-lg bg-sky-600 text-white"
              onClick={() =>
                setShowTags(!showTags)
              }
            >
              select tag{" "}
              {!showTags ? (
                <FaAngleRight />
              ) : (
                <FaAngleDown />
              )}
              {showTags ? (
                <div className="flex bg-white top-10 w-40 gap-2  shadow-xl p-3 px-2 rounded-lg flex-col absolute">
                  {tags.length > 0 ?
                    tags.map((tag, index) => (
                      <button
                        key={index}
                        className="bg-sky-600 capitalize text-white flex items-center gap-2  p-2 rounded-md"
                      >
                        <FaTag /> {tag}
                      </button>
                    )) : (
                      <h1 className="text-sky-600 text-center">You have no saved tags</h1>
                    )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <button
            className="flex gap-2 rounded-md items-center bg-sky-600 text-white p-2 w-full justify-center text-lg "
            onClick={() => {
              handleAddTag();
              setTag("");
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
          className="flex gap-2 items-center text-xl bg-sky-600 w-2/6 justify-center text-white p-2 rounded-md"
          onClick={() => setAddTags(true)}
        >
          Add Tags <FaTag />
        </button>
      )}

      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        placeholder="content"
        className="border-2 rounded-lg  p-2 w-2/4"
        onInput={(e) =>
          setContent(
            (e.target as HTMLInputElement).value
          )
        }
      ></textarea>
      <button
        className="flex gap-2 items-center text-xl bg-sky-600 text-white p-2 rounded-md w-2/6 justify-center"
        onClick={() => {
          handleCreateNote();
          setIsCreate(false);
        }}
      >
        Create note <BiNote />
      </button>
    </div>
  );
};

export default AddNotes;
