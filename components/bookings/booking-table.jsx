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

const bookings = [
  {
    id: "00001",
    status: "booked",
    customer: "+92-3334-567891",
    notes: "+92-3334-567891",
    date: "04 Sep 2024",
    time: "08:00pm to 09:00pm",
    payment: "5000",
  },
  // Add more booking data as needed
];


export function BookingTable({ status, data }) {
  const filteredBookings = status
    ? data.filter((booking) => booking.status === status)
    : data;

  // Sort bookings by booking_id in descending order
  const sortedBookings = filteredBookings.sort(
    (a, b) => b.booking_id - a.booking_id
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead>CUSTOMER</TableHead>
          <TableHead>DATE</TableHead>
          <TableHead>TIME</TableHead>
          <TableHead>PAID</TableHead>       
          <TableHead>OVERDUE</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedBookings?.map((booking, index) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.booking_id}</TableCell>
            <TableCell>
              <Badge
                variant={
                  booking.status === "booked"
                    ? "default"
                    : booking.status === "pending"
                    ? "secondary"
                    : "destructive"
                }
              >
                {booking.status}
              </Badge>
            </TableCell>
            <TableCell>{booking?.user?.name}</TableCell>
            <TableCell>{booking?.created_at}</TableCell>
            <TableCell>{booking?.slot?.start_time} - {booking?.slot?.end_time}</TableCell>
            <TableCell>{booking?.paid_amount}</TableCell>
            <TableCell>{booking?.total_amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}