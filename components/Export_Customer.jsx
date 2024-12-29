"use client";
import React, { useEffect, useState } from "react";
import { IoDownloadOutline } from "react-icons/io5";
import { GetAllUser } from "@/actions/Grounds";
import * as XLSX from "xlsx";

const Export = () => {
  const [res, setRes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await GetAllUser();
      setRes(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const exportToExcel = () => {
    // Convert the list of items into an array of arrays for the Excel sheet
    const wsData = [
      ["ID", "NAME", "EMAIL", "CONTACT", "SEC CONTACT", "CREATED AT"], // Column headers
      ...res.map((item) => [
        item.user_id,
        item.name,
        item.email,
        item.user_phone,
        item.secondary_user_phone,
        item.created_at,
      ]), // Data rows
    ];

    // Create a new workbook and add the worksheet with the data
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Customers");

    // Generate a download link for the Excel file
    XLSX.writeFile(wb, "Customers.xlsx");
  };

  return (
    <button
      onClick={exportToExcel}
      className="md:px-6 px-3 bg-primary1 text-white rounded-lg flex items-center justify-center gap-2"
    >
      <IoDownloadOutline />
      <span className="hidden md:block">Export</span>
    </button>
  );
};

export default Export;
