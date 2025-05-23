"use client";
import Main from "./components/Main";
import Header from "./components/header";
import SideBar from "./components/sideBar";
import { Box} from "@mui/material";

import React from "react";

const Home = () => {
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
        paddingLeft:{md :"100px", xs: '0px'},
        paddingRight: {md :"100px", xs: '0px'},
        paddingTop: {md :"18px", xs: '7px'},
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

export default Home;
