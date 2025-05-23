

interface Note {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

interface deleteNoteProps {
  selectedNote: Note;
  setIsDelete: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsViewNote: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setNotes: React.Dispatch<
    React.SetStateAction<Note[]>
  >;
  notes: Note[];
}


const DeleteNoteModal:React.FC<deleteNoteProps> = ({selectedNote,setIsDelete,setIsViewNote,setNotes,notes}) => {
  const deleteNote = (note: Note) => {
    setNotes(notes.filter(item => item.id !== note.id))
    setIsViewNote(false)
  };

    return (
      <div className="absolute top-0 left-0 h-full w-full backdrop-blur-sm">
        <div className=" flex flex-col justify-center items-center h-full gap-4">
          <h1 className="text-2xl font-semibold">
            Are you sure you want to delete this
            note?
          </h1>
          <div className="flex gap-2">
            <button className="bg-green-600 p-2 rounded-lg px-20"
            onClick={()=>{
              deleteNote(selectedNote)
              setIsDelete(false)
            }}
            >
              Yes
            </button>
            <button className="bg-red-600 p-2 rounded-lg px-20"
            onClick={
              () => setIsDelete(false)
            }>
              No
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default DeleteNoteModal;