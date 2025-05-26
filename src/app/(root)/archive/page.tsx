/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Main from "./components/Main";
import Header from "./components/header";
import SideBar from "./components/sideBar";
import { Box} from "@mui/material";

import React, {useContext} from "react";
import { NoteContext } from "./../contexts/noteProvider";


const Archive = () => {
  const { darkMode } = useContext(NoteContext);
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
        width: '100%',
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: darkMode ? 'black': '',
        color: darkMode ? 'white' : ''
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
        <Box sx={{
          display: 'flex',
          flexDirection: {xs: 'column', md: 'row'},
          alignContent: 'center',
          width: '100%',
          justifyContent: 'center',
          padding: '27px',
        }}>
          <Main />
        </Box>
      </Box>
    </Box>
  );
};

export default Archive;
