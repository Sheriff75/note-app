/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ViewNote from "./viewNote";
import { useContext } from "react";
import { NoteContext } from "../../contexts/noteProvider";
import { Box, Button, Paper, Stack } from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import { FaFile } from "react-icons/fa";

const Main = () => {
  const [isCreate, setIsCreate] = useState(false);

  const {
    archive,
    showNotes,
    setShowNotes,
    darkMode,
    selectedNote,
    setSelectedNote,
    isViewNote,
    setIsViewNote,
  } = useContext(NoteContext);

  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      alignContent: 'center',
      width: '100%',
      justifyContent: 'center',
      mt: { xs: '3rem', md: '0' },
    }}
    className="flex flex-col md:flex-row items-center justify-center md:items-start md:justify-center md:border border-t-0 border-r-0 w-full min-h-screen"
  >
      <div className="md:min-w-[400px] md:active:outline-none md:p-3 w-full flex flex-col items-center">
        <Button variant="contained" 
        color="secondary"
        sx = {{width: '100%', marginBottom: '20px'}}
        className="text-2xl fonarchivet-bold pt-4 px-1 border-b text-center"
        onClick={() => setShowNotes((prev) => !prev)}
        >
          Archived Notes
          <MdExpandMore className={`ml-3 transition-transform ${showNotes ? "rotate-180" : ""}`} />
        </Button>
        {showNotes && (
        <div>
          {archive.map((note, index) => (
            // <div
            //   onClick={() => {
            //     setIsViewNote(true);
            //     setSelectedNote(note);
            //     setIsCreate(false);
            //   }}
            //   key={index}
            //   className={`flex flex-col p-2 border hover:cursor-pointer mt-1 rounded-lg ${
            //     darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            //   } `}
            // >
            //   <h1 className="text-lg  capitalize truncate">{note.title}</h1>
            //   <div className="flex gap-2 flex-wrap">
            //     {note.tags.map((tag: string, index: number) => {
            //       return (
            //         <span
            //           key={index}
            //           className={`w-fit px-1 text-md capitalize rounded-md my-1 ${
            //             darkMode ? "text-white bg-gray-700" : "bg-gray-300"
            //           }`}
            //         >
            //           {tag}
            //         </span>
            //       );
            //     })}
            //   </div>
            //   <p className="text-sm">{note.date}</p>
            // </div>
            <Paper
    variant="elevation"
    elevation={8}
    sx={{
      transform: `rotateZ(${(index % 2 === 0 ? -2 : 2)}deg) translateY(-${index * 16}px)`,
      zIndex: archive.length - index,
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      transition: 'transform 0.2s',
    }}
    onClick={() => {
      setIsViewNote(true);
      setSelectedNote(note);
      setIsCreate(false);
    }}
    key={index}
    className={`flex flex-col p-2 hover:cursor-pointer mt-1 rounded-lg ${
      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
    } `}
  >
              <Stack direction={'row'} sx = {{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <FaFile />
              <h1 className="text-[14px] md:text-[16px] truncate">{note.title}</h1>
              </Stack>

              <div className="flex gap-2 flex-wrap">
                {note.tags.map((tag: string, index: number) => {
                  return (
                    <span
                      key={index}
                      className={`w-fit px-1 text-md capitalize rounded-md my-1 ${
                        darkMode ? "text-white bg-gray-700" : "bg-gray-300"
                      }`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
              <p className="text-[12px] md:text-[13px]">{note.date}</p>
            </Paper>
          ))}
        </div>
        )}
      </div>

      <div className="md:h-screen md:min-w-[1020px] hidden md:block flex items-center justify-center">
        {!isCreate && !isViewNote && (
          <div className="flex justify-center items-center h-full border border-t-0 border-r-0 border-b-0">
            <h1 className="text-xl md:text-2xl text-gray-400 text-center">
              Select a note to view or create a new note.
            </h1>
          </div>
        )}
        
        {isViewNote && (
          <ViewNote selectedNote={selectedNote} setIsViewNote={setIsViewNote} />
        )}
      </div>
    </Box>
  );
};

export default Main;
