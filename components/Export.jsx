'use client'
import React, { useEffect, useState } from 'react'
import { IoDownloadOutline } from "react-icons/io5";
import { GetAllReviews } from "@/actions/Grounds";
import * as XLSX from "xlsx";

const Export =  () => {
const [res , setRes] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
          const token = localStorage.getItem('token');
            const data = await GetAllReviews(token)
            setRes(data)
            console.log(data)
        }
        fetchData()
    },[])


  const exportToExcel = () => {
    // Convert the list of items into an array of arrays for the Excel sheet
    const wsData = [
      ["ID", "CUSTOMER", "GROUND", "REVIEW", "RATING", "STATUS"], // Column headers
      ...res.map((item) => [
        item.id,
        item?.user?.name,
        item.court?.name,
        item.review_text,
        item.rating,
        item.published,
      ]), // Data rows
    ];

    // Create a new workbook and add the worksheet with the data
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reviews");

    // Generate a download link for the Excel file
    XLSX.writeFile(wb, "reviews.xlsx");
  };


  
  return (
    <button onClick={exportToExcel} className="md:px-6 px-3 bg-primary1 text-white rounded-lg flex items-center justify-center gap-2">
            <IoDownloadOutline />
            <span className="hidden md:block">Export</span>
          </button>
  )
}

export default Export