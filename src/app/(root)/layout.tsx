'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
import { Box } from "@mui/material";
import { NoteProvider } from "./contexts/noteProvider";
import { NoteContext } from "./contexts/noteProvider";
import MobileSidebar from "./components/mobileSidebar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { darkMode } = useContext(NoteContext);
  
  return (
    <Box
      sx={{
        display: "flex",
        background: darkMode? 'bg-black' : 'linear-gradient(180deg, #EBF2FC 0%, #EEF8F9 100%)',
        color: darkMode? 'white' : 'rgb(2, 9, 48)',
        width: "100%",
        "& .MuiBox-root": {
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        },
        "& .MuiBox-root::-webkit-scrollbar": {
          display: "none",
        },
        height: "100vh",
        overflow: "auto",
      }}
    >
      <NoteProvider>
        <MobileSidebar />
        {children}
      </NoteProvider>
    </Box>
  );
}
