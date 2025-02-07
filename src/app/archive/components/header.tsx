/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useContext,
  useState,
  useEffect,
} from "react";
import { CiSettings } from "react-icons/ci";
import { NoteContext } from "../../layout";
import Settings from "./Settings";

type Note = {
  id: string;
  title: string;
  tags: string[];
  date: string;
  content: string;
};

const Header = () => {
  const [search, setSearch] =
    useState<string>("");
  const [preview, setPreview] =
    useState<boolean>(false);
  const [filteredNotes, setFilteredNotes] =
    useState<any[]>([]);
  const {
    settings,
    setSettings,
    notes,
    setSelectedNote,
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


  useEffect(() => {
    const checkSearch = (item: any) => {
      return (
        item.title.toUpperCase().includes(search) ||
        item.tags.some((tag: string) =>
          tag.toUpperCase().includes(search)
        )
      );
    };
  
    setFilteredNotes(notes.filter(checkSearch));
  }, [search, notes]);

  return (
    <div
      className={
        "border  w-full relative p-4 px-10 items-center flex justify-between max-h-[13vh] col-span-full"
      }
    >
      <h1 className="font-bold text-2xl">
        All Notes
      </h1>
      <div
        className="flex items-center gap-1 relative"
        onBlur={() => setPreview(false)}
      >
        <input
          type="text"
          placeholder="Search notes"
          className="w-[20vw] border-2 p-2 rounded-md focus:outline-none"
          onInput={(e) => {
            setSearch(
              (
                e.target as HTMLInputElement
              ).value.toUpperCase()
            );
            setPreview(true);
          }}
        />
        {preview && (
          <div
            className="absolute top-12 left-2 bg-white h-fit p-4 rounded-lg w-60 shadow-[1px_2px_5px_gray]"
            onMouseOver={() => setPreview(true)}
          >
            {filteredNotes.map(
              (note: any, index: number) => (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedNote(note);
                    setIsViewNote(true);
                  }}
                >
                  {note.title}
                </p>
              )
            )}
          </div>
        )}
        <button
          className="hover:bg-gray-200 rounded-full p-1"
          onClick={() => setSettings(!settings)}
        >
          <CiSettings size={30} />
        </button>
      </div>
      {settings && <Settings />}
    </div>
  );
};

export default Header;
