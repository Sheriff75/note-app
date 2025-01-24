/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import { BiPlus } from "react-icons/bi";
import { FaTag } from "react-icons/fa";
import { NoteContext } from "../layout";

const Home = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] =
    useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [addTags, setAddTags] =
    useState<boolean>(false);
  const [tag, setTag] = useState<string>("");
  const [tagToAdd, setTagToAdd] = useState<
    string[]
  >([]);

  const { notes, setNotes } = useContext<{
    notes: any[];
    setNotes: React.Dispatch<
      React.SetStateAction<any[]>
    >;
  }>(NoteContext);

  useEffect(() => {
    const formattedDate =
      new Date().toLocaleString();
    setDate(formattedDate);
  }, [isCreate]);

  useEffect(() => {
    setTags(tagToAdd);
  }, [tagToAdd]);
  const handleAddTag = () => {
    setTagToAdd([...tagToAdd, tag]);
  };

  const handleCreateNote = () => {
    console.log(date);
    setNotes([
      ...notes,
      {
        title,
        content,
        tags,
        date,
      },
    ]);
  };
  console.log(notes);
  return (
    <div className="flex">
      <div className="w-1/4 active:outline-none  p-3 border h-fit min-h-[575px]">
        <button
          className="flex items-center bg-sky-600 text-white p-2 rounded-md w-full justify-center font-bold"
          onClick={() => setIsCreate(true)}
        >
          {" "}
          <BiPlus />
          Create new note
        </button>
      </div>
      <div className="w-2/3 border h-[100%] min-h-[575px]">
        {!isCreate && (
          <div className="flex justify-center items-center h-[565px] border">
            <h1 className="text-2xl text-gray-400">
              Select a note to view or create a
              new note.
            </h1>
          </div>
        )}
        {isCreate && (
          <div className="flex flex-col justify-center gap-4 items-center h-[565px] border">
            <h1 className="text-2xl text-gray-400">
              Create a new note
            </h1>
            <input
              type="text"
              placeholder="Title"
              className="border-2 p-2"
              onInput={(e) =>
                setTitle(
                  (e.target as HTMLInputElement)
                    .value
                )
              }
            />

            {addTags ? (
              <div>
                <input
                  type="text"
                  placeholder="Add tags"
                  className="border-2 p-2"
                  onInput={(e) => 
                    setTag(
                      (
                        e.target as HTMLInputElement
                      ).value
                    )
                  }
                />
                <button
                  className="flex gap-2 items-center bg-sky-600 text-white p-2 rounded-md"
                  onClick={() => handleAddTag}
                >
                  Add tags <FaTag />
                </button>
                {tagToAdd.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-sky-600 text-white p-2 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <button
                className="flex gap-2 items-center bg-sky-600 text-white p-2 rounded-md"
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
              className="border-2 p-2"
              onInput={(e) =>
                setContent(
                  (e.target as HTMLInputElement)
                    .value
                )
              }
            ></textarea>
            <button
              className="flex gap-2 items-center bg-sky-600 text-white p-2 rounded-md"
              onClick={() => {
                handleCreateNote();
                setIsCreate(false);
              }}
            >
              Create note
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
