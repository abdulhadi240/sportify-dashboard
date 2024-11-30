'use client'
import React, { useEffect, useState } from 'react'
import { IoDownloadOutline } from "react-icons/io5";
import { Courts } from "@/actions/Grounds";
import * as XLSX from "xlsx";

const Export =  () => {
const [res , setRes] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
            const data = await Courts()
            setRes(data)
            console.log(data)
        }
        fetchData()
    },[])


  const exportToExcel = () => {
    // Convert the list of items into an array of arrays for the Excel sheet
    const wsData = [
      ["ID", "NAME", "GAME", "LOCATION", "AMOUNT", "CREATED AT", ""], // Column headers
      ...res.map((item) => [
        item.court_id,
        item.name,
        item.game,
        item.court_location,
        item.hourly_rate,
        item.created_at,
      ]), // Data rows
    ];

    // Create a new workbook and add the worksheet with the data
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Items");

    // Generate a download link for the Excel file
    XLSX.writeFile(wb, "items.xlsx");
  };


  
  return (
    <button onClick={exportToExcel} className="px-6 bg-primary1 text-white rounded-lg flex items-center justify-center gap-2">
            <IoDownloadOutline />
            <span className="hidden md:block">Export</span>
          </button>
  )
}

export default Export