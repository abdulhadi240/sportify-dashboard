"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoDownloadOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { Courts, DeleteCourt } from "../../actions/Grounds";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


export const experimental_ppr = true


export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchCourts() {
      const courts = await Courts();
      setData(courts);
    }
    fetchCourts();
  }, []);

  const handleDelete = async (id) => {
    await DeleteCourt(id);
    setData((prevData) => prevData.filter((booking) => booking.id !== id));
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];

    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Grounds</h2>
        <div className="flex gap-3">
          <button className="px-6 bg-primary1 text-white rounded-lg flex items-center justify-center gap-2">
            <IoDownloadOutline />
            <span className="hidden md:block">Export</span>
          </button>
          <Link
            href="/grounds/create"
            className="px-6 bg-primary1 text-white rounded-lg flex items-center justify-center gap-2"
          >
            <FaPlus />
            <span className="hidden md:block">Create Ground</span>
          </Link>
        </div>
      </div>
      <div className="w-full overflow-auto bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>GAME</TableHead>
              <TableHead>LOCATION</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>CREATED AT</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={"loading"}>
            <TableBody>
              {data.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.court_id}</TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{booking.game || "Cricket"}</TableCell>
                  <TableCell>{booking.court_location}</TableCell>
                  <TableCell>{booking.hourly_rate}</TableCell>
                  <TableCell>{formatDate(booking.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link
                        href={`/grounds/${booking.id}`}
                        className="text-primary1 w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="text-primary1 hover:cursor-pointer w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full underline"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Suspense>
        </Table>
      </div>
    </div>
  );
}
