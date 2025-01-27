import React,{useContext} from 'react'
import { MdCancel } from 'react-icons/md'
import { NoteContext } from "../layout";


const Settings = () => {
    const { setSettings } = useContext<{
      notes: object[];
      setNotes: React.Dispatch<
        React.SetStateAction<object[]>
      >;
      settings: boolean;
      setSettings: React.Dispatch<
        React.SetStateAction<boolean>
      >;
    }>(NoteContext);
  return (
    <div className='absolute right-0 top-2 w-64 h-[95vh] shadow-lg bg-white p-4 rounded-md'>
      <MdCancel size={30} className='cursor' onClick={()=>setSettings(false)}/>
      </div>
  )
}

export default Settings