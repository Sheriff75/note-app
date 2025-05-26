/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
import { MdCancel } from "react-icons/md";
import { NoteContext } from "../contexts/noteProvider";
import { FaMoon, FaSun } from "react-icons/fa";

const Settings = () => {
  const { setSettings, darkMode, setDarkMode } = useContext(NoteContext);
  return (
    <div
      className={`absolute right-0 top-0 z-50 w-64 h-[100vh] shadow-lg ${
        darkMode ? "bg-black backdrop-blur-lg text-white" : "bg-[#EBF2FC] text-black"
      } p-4 rounded-md`}
    >
      <MdCancel
        size={30}
        className="cursor-pointer absolute right-4 top-6 hover:text-red-500"
        onClick={() => setSettings(false)}
      />

      <h1 className="text-xl my-2 font-semibold">Select Theme </h1>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="border cursor-pointer rounded-full text-2xl p-2"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};

export default Settings;
