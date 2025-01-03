"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";

const calculateDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const calculateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24-hour format
  });
};

export function BookingTable({ status, data }) {
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [load, setLoad] = useState(false);

  const filteredBookings = status
    ? data.filter((booking) => booking.status === status)
    : data;

  const sortedBookings = filteredBookings.sort(
    (a, b) => b.booking_id - a.booking_id
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>CUSTOMER</TableHead>
          <TableHead>DATE</TableHead>
          <TableHead>TIME</TableHead>
          <TableHead>PAID</TableHead>
          <TableHead>OVERDUE</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead>EDIT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedBookings?.map((booking, index) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.booking_id}</TableCell>
            <TableCell>{booking?.customer_name}</TableCell>
            <TableCell>{calculateDate(booking?.date)}</TableCell>
            <TableCell>
              {booking?.start_time} -{" "}{booking?.end_time}
            </TableCell>
            <TableCell>{booking?.paid_amount}</TableCell>
            <TableCell>{booking?.remaining}</TableCell>
            <TableCell>
            
              <Badge
                className={`p-2 rounded-lg px-3 ${
                  booking.status === "confirmed"
                    ? "bg-primary1 text-white" // Primary background for "booked"
                    : booking.status === "completed"
                    ? "bg-green-400 text-white" // Secondary background for "pending"
                    : booking.status === "pending"
                    ? "bg-gray-300 text-black" // Red background for "cancelled"
                    : "bg-red-500 text-white" // Red background for "cancelled"
                }`}
              >
                {booking.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => {}}
                      className="text-primary1 hover:cursor-pointer w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full"
                    >
                      <FiEdit />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Send Email</DialogTitle>
                      <DialogDescription>
                        Make sure to write a friendly email to the customer.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="subject" className="text-right">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="content" className="text-right">
                          Content
                        </Label>
                        <textarea
                          id="content"
                          value={emailContent}
                          onChange={(e) => setEmailContent(e.target.value)}
                          className="col-span-3 border-[1px] rounded-sm p-2"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={() => {}}
                        className="bg-primary1"
                      >
                        {load ? "Loading..." : "Send Email"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
