"use client";
import SideBar from "./components/sideBar";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex">
      <BrowserRouter>
        <SideBar />
        <Main />
      </BrowserRouter>
    </div>
  );
}
