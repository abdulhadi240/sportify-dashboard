"use client";
import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { Skeleton } from "@/components/ui/skeleton";
import { GetAllReviews, DeleteReviews, UpdateReviews } from "@/actions/Grounds";
import Loading from "./Loading";
const BodyReview = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const [editingId, setEditingId] = useState(null); // Track the review being edited
  const [status, setStatus] = useState(""); // Temporary state for status selection
  const [saving, setSaving] = useState(false); // Track saving state

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Start loading
      const token = localStorage.getItem("token");
      try {
        const response = await GetAllReviews(token);
        setData(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // End loading
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true); // Show loading
    const token = localStorage.getItem("token");
    try {
      await DeleteReviews(id, token);
      const response = await GetAllReviews(token); // Refresh the list
      setData(response);
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleSave = async (id, newStatus) => {
    setSaving(true); // Show saving state
    const token = localStorage.getItem("token");
    try {
      const response = await UpdateReviews(id, newStatus, token);

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Fetch updated reviews list
      const updatedReviews = await GetAllReviews(token);
      setData(updatedReviews);
      setEditingId(null); // Exit editing mode
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setSaving(false); // Hide saving state
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <TableBody>
      {data?.map((booking) => (
        <TableRow key={booking.id} className="hover:bg-[#f4eef8]">
          <TableCell>{booking.user.name}</TableCell>
          <TableCell>{booking.court.name}</TableCell>
          <TableCell>{booking.review_text}</TableCell>
          <TableCell>{booking.rating}</TableCell>
          <TableCell>
            {editingId === booking.id ? (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-2 rounded-lg"
              >
                <option value="approved">Approve</option>
                <option value="rejected">Reject</option>
                <option value="pending">Pending</option>
              </select>
            ) : (
              <span
                className={`p-2 rounded-lg px-3 ${
                  booking.published === "approved"
                    ? "bg-green-500 text-white"
                    : booking.published === "rejected"
                    ? "bg-red-500 text-white"
                    : booking.published === "pending"
                    ? "bg-primary1 text-white"
                    : "bg-[#f0f0f0] text-[#b6b6b6]"
                }`}
              >
                {booking.published}
              </span>
            )}
          </TableCell>
          <TableCell>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(booking.id);
                  setStatus(booking.published); // Pre-fill current status
                }}
                className="text-primary1 w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => handleDelete(booking.id)}
                className="text-primary1 hover:cursor-pointer w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full"
              >
                <MdDelete />
              </button>
            </div>
            {editingId === booking.id && (
              <div className="mt-2">
                {saving ? (
                  <Loading />
                ) : (
                  <button
                    onClick={() => handleSave(booking.id, status)}
                    className="text-white bg-primary1 px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>
                )}
              </div>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default BodyReview;
