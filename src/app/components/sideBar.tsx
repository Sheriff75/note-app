'use client'
import { Link } from "react-router-dom";
import React from "react";
import { GiQuillInk } from "react-icons/gi";
import { BiHome } from "react-icons/bi";
import { FaArchive } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
const SideBar = () => {

  return (
    <div className="py-10 px-4 border-2 w-[20vw] h-fit min-h-screen ">
      <span className="flex text-3xl">
        <GiQuillInk /> <h1>notes</h1>
      </span>
      <ul className="mt-4 border-b-2">

      <Link to={'/'}>
      <li className="py-2 flex px-2 gap-2 items-center hover:bg-gray-100 rounded-md"
        >
          <BiHome /> All Notes
        </li>
      </Link>
      <Link to={'/archive'}>
        <li className="py-2 flex px-2 gap-2 items-center hover:bg-gray-100 rounded-md"
      >
          <FaArchive /> Archived
        </li>
        </Link>
      </ul>
      <ul className="mt-4">
        <li className="py-2 px-2  flex gap-2 items-center hover:bg-gray-100 rounded-md">
          <FaTag />
          Tag
        </li>
        <li className="py-2 px-2 flex gap-2 items-center hover:bg-gray-100 rounded-md">
          <FaTag />
          Tag
        </li>
        <li className="py-2 px-2 flex gap-2 items-center hover:bg-gray-100 rounded-md">
          <FaTag />
          Tag
        </li>
        <li className="py-2 px-2 flex gap-2 items-center hover:bg-gray-100 rounded-md">
          <FaTag />
          Tag
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
