/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import { FaTag } from "react-icons/fa";
import { NoteContext } from "../layout";

interface AddTagsProps {
  date: string;
  setIsCreate: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const AddTags: React.FC<AddTagsProps> = ({
  date,
  setIsCreate,
}) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] =
    useState<string>("");

  const [addTags, setAddTags] =
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
    setTagToAdd([...tagToAdd, tag]);
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
    <div className="flex flex-col justify-center gap-4 items-center border-2 border-t-0 h-full min-h-[578px]">
      <h1 className="text-2xl text-gray-400">
        Create a new note
      </h1>
      <input
        type="text"
        placeholder="Title"
        className="border-2 p-2"
        onInput={(e) =>
          setTitle(
            (e.target as HTMLInputElement).value
          )
        }
      />

      {addTags ? (
        <div>
          <input
            type="text"
            placeholder="Add tags"
            className="border-2 p-2"
            value={tag}
            onInput={(e) =>
              setTag(
                (e.target as HTMLInputElement)
                  .value
              )
            }
          />
          <button
            className="flex gap-2 items-center bg-sky-600 text-white p-2 rounded-md"
            onClick={() => {
              handleAddTag();
              setTag("");
            }}
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
            (e.target as HTMLInputElement).value
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
  );
};

export default AddTags;
