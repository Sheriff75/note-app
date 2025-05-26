

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
  onDeleteConfirm: () => Promise<void>;
}


const DeleteNoteModal:React.FC<deleteNoteProps> = ({
  setIsDelete,
  onDeleteConfirm
}) => {

    return (
      <div className="absolute top-0 left-0 h-full w-full backdrop-blur-sm">
        <div className=" flex flex-col justify-center items-center md:h-full gap-4">
          <h1 className="md:text-2xl text-lg font-semibold">
            Are you sure you want to delete this
            note?
          </h1>
          <div className="flex gap-2">
            <button className="bg-green-600 p-2 rounded-lg md:px-20 px-5"
            onClick={async ()=>{
              await onDeleteConfirm();
              setIsDelete(false);
            }}
            >
              Yes
            </button>
            <button className="bg-red-600 p-2 rounded-lg md:px-20 px-5"
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