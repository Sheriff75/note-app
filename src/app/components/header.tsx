import React from 'react'
import { CiSettings } from "react-icons/ci";

const Header = () => {
  return (
    <div className='border-b-2 w-full p-4 px-10 items-center flex justify-between'>
        <h1 className='font-extrabold'>All Notes</h1>
        <div className='flex items-center gap-1'>
            <input type="text" placeholder='Search notes' className='w-[20vw] border-2 border-gray-300 p-2 rounded-md focus:outline-none'/>
            <button className='hover:bg-sky-200 rounded-full p-1'><CiSettings size={30}/></button>
        </div>

    </div>
  )
}

export default Header