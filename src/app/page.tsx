/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Main from './components/Main';
import Header from './components/header';
import SideBar from './components/sideBar';

import React from 'react'

const Home = () => {
  return (
    <div className='grid grid-cols-5 grid-rows-12 h-screen'>
    <Header/>
    <SideBar/>
    <Main/>
    </div>
  )
}

export default Home


