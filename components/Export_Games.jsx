'use client'
import React, { useEffect, useState } from 'react'
import { IoDownloadOutline } from "react-icons/io5";
import { AllGames } from "@/actions/Grounds";
import * as XLSX from "xlsx";

const Export_Games =  () => {
const [res , setRes] = useState([])
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            const data = await AllGames(token)
            setRes(data)
            console.log(data)
        }
        fetchData()
    },[])


  const exportToExcel = () => {
    // Convert the list of items into an array of arrays for the Excel sheet
    const wsData = [
      ["ID", "Name", "Description", "Category", "Person"], // Column headers
      ...res.map((item) => [
        item.id,
        item.name,
        item.description,
        item.category,
        item.person,
      ]), // Data rows
    ];

    // Create a new workbook and add the worksheet with the data
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Items");

    // Generate a download link for the Excel file
    XLSX.writeFile(wb, "Games.xlsx");
  };


  
  return (
    <button onClick={exportToExcel} className="md:px-6 px-3 bg-primary1 text-white rounded-lg flex items-center justify-center gap-2">
            <IoDownloadOutline />
            <span className="hidden md:block">Export</span>
          </button>
  )
}

export default Export_Games