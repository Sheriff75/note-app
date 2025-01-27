/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { NoteContext } from "../layout";
import React from "react";
import { GiQuillInk } from "react-icons/gi";
import { BiHome } from "react-icons/bi";
import { FaArchive } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
const SideBar = () => {
  const { tags } = useContext<{
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
    <div className="py-10 px-4  w-[20vw] h-fit min-h-screen ">
      <span className="flex text-3xl">
        <GiQuillInk /> <h1>notes</h1>
      </span>
      <ul className="mt-4 border-b-2">
        <Link to={"/"}>
          <li className="py-2 flex px-2 gap-2 items-center hover:bg-gray-100 rounded-md">
            <BiHome /> All Notes
          </li>
        </Link>
        <Link to={"/archive"}>
          <li className="py-2 flex px-2 gap-2 items-center hover:bg-gray-100 rounded-md">
            <FaArchive /> Archived
          </li>
        </Link>
      </ul>
      <ul className="mt-4">
       {
        tags.map((tag,index)=>{
          return(
            <li key={index} className="py-2 flex px-2 gap-2 items-center w-[200px] border-2  hover:bg-gray-100 rounded-md "> <FaTag/>{tag}</li>
          )
        })
       }
      </ul>
    </div>
  );
};

export default SideBar;
