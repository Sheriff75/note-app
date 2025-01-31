"use client";
import React from "react";
import Header from "./header";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Archive from "../pages/Archive";

const Main = () => {
  return (
    <div className="border-2 border-l-0 border-t-0  w-[80vw] h-fit min-h-screen ">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/archive"
          element={<Archive />}
        />
      </Routes>
    </div>
  );
};

export default Main;
