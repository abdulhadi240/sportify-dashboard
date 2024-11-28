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

interface BookingTableProps {
  status?: string;
}

export function BookingTable({ status }: BookingTableProps) {
  const filteredBookings = status
    ? bookings.filter((booking) => booking.status === status)
    : bookings;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead>CUSTOMER</TableHead>
          <TableHead>NOTES</TableHead>
          <TableHead>DATE</TableHead>
          <TableHead>TIME</TableHead>
          <TableHead>PAYMENT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredBookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.id}</TableCell>
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
            <TableCell>{booking.customer}</TableCell>
            <TableCell>{booking.notes}</TableCell>
            <TableCell>{booking.date}</TableCell>
            <TableCell>{booking.time}</TableCell>
            <TableCell>{booking.payment}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}