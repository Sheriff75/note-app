/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  useState,
  useEffect,
} from "react";
import { BiPlus } from "react-icons/bi";
import AddNotes from "../components/addNotes"


const Home = () => {
  const [isCreate, setIsCreate] = useState(true);

  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const formattedDate =
      new Date().toLocaleString();
    setDate(formattedDate)
  }, [isCreate]);

  
  return (
    <div className="flex h-[100%] min-h-[575px] border border-t-0 border-r-0">
      <div className="w-1/4 active:outline-none   p-3 h-fit min-h-[575px]">
        <button
          className="flex items-center bg-sky-600 text-white p-2 rounded-md w-full justify-center font-bold"
          onClick={() => setIsCreate(true)}
        >
          {" "}
          <BiPlus />
          Create new note
        </button>
      </div>
      <div className="w-3/4 h-[100%] min-h-[575px]">
        {!isCreate && (
          <div className="flex justify-center items-center h-[578px] border border-t-0">
            <h1 className="text-2xl text-gray-400">
              Select a note to view or create a
              new note.
            </h1>
          </div>
        )}
        {isCreate && <AddNotes date={date} setIsCreate={setIsCreate}/>}
      </div>
    </div>
  );
};

export default Home;
