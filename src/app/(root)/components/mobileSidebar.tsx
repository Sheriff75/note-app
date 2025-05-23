/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useContext, useEffect } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NoteContext } from "../contexts/noteProvider";
import { CiSettings } from "react-icons/ci";
import { GiQuillInk } from "react-icons/gi";
import { BiHome } from "react-icons/bi";
import { FaArchive } from "react-icons/fa";
import { PiTag } from "react-icons/pi";
import Settings from "./Settings";
import Link from "next/link";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

type Note = {
  id: string;
  title: string;
  tags: string[];
  date: string;
  content: string;
};

export default function MobileSidebar(item: Props) {
  const { window } = item;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const [search, setSearch] = useState<string>("");
  const [preview, setPreview] = useState<boolean>(false);
  const [filteredNotes, setFilteredNotes] = useState<any[]>([]);
  const {
    tags,
    setTags,
    darkMode,
    settings,
    setSettings,
    notes,
    setSelectedNote,
    setIsViewNote,
  } = useContext<{
    notes: any[];
    setNotes: React.Dispatch<React.SetStateAction<any[]>>;
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

  useEffect(() => {
    const checkSearch = (item: any) => {
      return (
        item.title.toUpperCase().includes(search) ||
        item.tags.some((tag: string) => tag.toUpperCase().includes(search))
      );
    };

    setFilteredNotes(notes.filter(checkSearch));
  }, [search, notes]);

  useEffect(() => {
      const usedTags = new Set<string>();
      notes.forEach((note) => {
        note.tags.forEach((tag: string) => usedTags.add(tag));
      });
      setTags(Array.from(usedTags));
    }, [notes, setTags]);

  const drawer = (
    <div className="py-5 px-4 col-span-1 row-span-12 row-start-1  ">
      <span className="flex text-3xl">
        <GiQuillInk /> <h1>notes</h1>
      </span>
      <ul className="mt-4 border-b-2">
        <Link href={"/"}>
          <li
            className={`py-2 flex px-2 gap-2  text-lg font-semibold items-center ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            } rounded-md`}
          >
            <BiHome /> All Notes
          </li>
        </Link>
        <Link href={"/archive"}>
          <li
            className={` py-2 flex px-2 gap-2 text-lg font-semibold items-center mb-1 ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
            } rounded-md`}
          >
            <FaArchive /> Archived
          </li>
        </Link>
      </ul>
      <ul className="mt-4">
        {tags.map((tag, index) => {
          return (
            <li
              key={index}
              className={`py-2 flex px-2 gap-2 items-center ${
                darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
              } rounded-md`}
            >
              {" "}
              <PiTag className="text-2xl" />
              <p className="text-nowrap truncate capitalize">{tag}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          display: { md: "none" },
          backgroundColor: darkMode ? "#1E1E1E" : "rgb(106, 57, 197)",
        }}
      >
        <Toolbar>
          <div
            className={
              "border w-full relative py-6 px-10 items-center flex justify-between max-h-[13vh] col-span-4"
            }
          >
            <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { md: "none" } }}
      >
        <MenuIcon />
      </IconButton>
            <h1 className="font-bold text-2xl">All Notes</h1>
            <div
              className="flex items-center gap-1 relative"
              onBlur={() => setPreview(false)}
            >
              <input
                type="text"
                placeholder="Search notes"
                className="w-[20vw] border-2 p-2 rounded-md focus:outline-none"
                onInput={(e) => {
                  setSearch((e.target as HTMLInputElement).value.toUpperCase());
                  setPreview(true);
                }}
              />
              {preview && (
                <div
                  className="absolute top-12 left-2 bg-white h-fit p-4 rounded-lg w-60 shadow-[1px_2px_5px_gray]"
                  onMouseOver={() => setPreview(true)}
                >
                  {filteredNotes.map((note: any, index: number) => (
                    <p
                      key={index}
                      onClick={() => {
                        setSelectedNote(note);
                        setIsViewNote(true);
                      }}
                    >
                      {note.title}
                    </p>
                  ))}
                </div>
              )}
              <button
                className="hover:bg-gray-200 rounded-full p-1"
                onClick={() => setSettings(!settings)}
              >
                <CiSettings size={30} />
              </button>
            </div>
            {settings && <Settings />}
          </div>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
