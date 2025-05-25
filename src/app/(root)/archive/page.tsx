/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useContext } from "react";
import { NoteContext } from "../contexts/noteProvider";
import Header from "./components/header";
import SideBar from "./components/sideBar";
import Main from "./components/Main";
import { Box } from "@mui/material";

interface Note {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

const Archive = () => {
  const {} = useContext<{
    notes: any[];
    setNotes: React.Dispatch<React.SetStateAction<any[]>>;
    showNotes: boolean;
    setShowNotes: React.Dispatch<React.SetStateAction<boolean>>;
    settings: boolean;
    tags: string[];
    setSettings: React.Dispatch<React.SetStateAction<boolean>>;
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    selectedNote: Note;
    setSelectedNote: React.Dispatch<React.SetStateAction<Note>>;
    isViewNote: boolean;
    setIsViewNote: React.Dispatch<React.SetStateAction<boolean>>;
    archive: Note[];
    setArchive: React.Dispatch<React.SetStateAction<Note[]>>;
  }>(NoteContext);
  return (
    <Box
      sx={{
        "& .MuiBox-root": {
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        },
        "& .MuiBox-root::-webkit-scrollbar": {
          display: "none",
        },
        height: "100vh",
        overflow: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box sx={{
        display: 'flex',
        gap: '20px'
      }} >
        <Box 
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          }
        }}>
          <SideBar />
        </Box>
        <Box>
          <Main />
        </Box>
      </Box>
    </Box>
  );
};

export default Archive;
