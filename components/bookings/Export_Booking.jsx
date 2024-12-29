'use client'
import React, { useEffect, useState } from 'react'
import { IoDownloadOutline } from "react-icons/io5";
import { get_all_bookings } from "@/actions/Grounds";
import * as XLSX from "xlsx";

const Export_Booking =  () => {
const [res , setRes] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
            const data = await get_all_bookings()
            setRes(data)
            console.log(data)
        }
        fetchData()
    },[])


  const exportToExcel = () => {
    // Convert the list of items into an array of arrays for the Excel sheet
    const wsData = [
      ["ID", "STATUS", "CUSTOMER", "DATE", "SLOT", "PAID", "OVERDUE"], // Column headers
      ...res.map((item) => [
        item?.booking_id,
        item?.status,
        item?.user?.name,
        item?.created_at,
        `${item?.slot?.start_time} to ${item?.slot?.end_time}`,
        item?.paid_amount,
        item?.total_amount,
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
    <button onClick={exportToExcel} className="px-6 py-2 bg-primary1 text-white rounded-lg flex items-center justify-center gap-2">
            <IoDownloadOutline />
            <span className="hidden md:block">Export</span>
          </button>
  )
}

export default Export_Booking