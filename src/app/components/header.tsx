/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
import { CiSettings } from "react-icons/ci";
import { NoteContext } from "../layout";
import Settings from "./Settings";

const Header = () => {
  const { settings, setSettings } = useContext<{
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
  return (
    <div className="border border-t-0  w-full relative p-4 px-10 items-center flex justify-between">
      <h1 className="font-extrabold">
        All Notes
      </h1>
      <div className="flex items-center gap-1">
        <input
          type="text"
          placeholder="Search notes"
          className="w-[20vw] border-2 p-2 rounded-md focus:outline-none"
        />
        <button
          className="hover:bg-sky-200 rounded-full p-1"
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
