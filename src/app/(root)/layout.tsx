import { Box } from "@mui/material";
import { NoteProvider } from "./contexts/noteProvider";
import MobileSidebar from "./components/mobileSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      sx={{
        display: "flex",
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
