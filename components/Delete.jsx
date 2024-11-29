'use client'
import { DeleteCourt } from '@/actions/Grounds';
import React from 'react'
import { MdDelete } from "react-icons/md";

const Delete = ({id}) => {
  return (
    <div>
    <div onClick={async ()=>{ await DeleteCourt(id)}} className="text-primary1 hover:cursor-pointer w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full underline"><MdDelete/></div>
    </div>
  )
}

export default Delete