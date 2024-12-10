'use client'
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Dashbaord } from "@/actions/Grounds";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const stats = [
  {
    title: "Total Booking",
    value: "22,880",
  },
  {
    title: "Total Sales",
    value: "22,880",
  },
  {
    title: "Total Support",
    value: "22,880",
  },
  {
    title: "Marketing Amount",
    value: "22,880",
  },
];

const bookings = [
  {
    id: "00001",
    name: "Christina Brooks",
    address: "089 Kutch Green Apt 428",
    date: "04 Sep 2024",
    type: "Cricket",
    status: "Booked",
  },
  {
    id: "00002",
    name: "Christina",
    address: "089 Kutch Green Apt 428",
    date: "04 Sep 2024",
    type: "Cricket",
    status: "On Hold",
  },
  {
    id: "00003",
    name: "Brroks",
    address: "089 Kutch Green Apt 428",
    date: "04 Sep 2024",
    type: "Cricket",
    status: "Pending",
  },
  // Add more booking data here
];

export default function DashboardPage() {
  const [date, setDate] = useState({
    from: new Date(2024, 10, 20), // Adjust starting date if needed
    to: new Date(), // Current date and time
  });

  const [start, setStart] = useState(format(date.from, "yyyy-MM-dd'T'HH:mm:ss"));
  const [end, setEnd] = useState(format(date.to, "yyyy-MM-dd'T'HH:mm:ss"));
  const [data , setData] = useState([])

  useEffect(() => {
    async function getStats() {
      const stat = await Dashbaord(start, end);
      setData(stat);
    }
    getStats();
  }, [start, end]);


  useEffect(() => {
    // Update start and end dates whenever the range changes
    setStart(format(date.from, "yyyy-MM-dd'T'HH:mm:ss"));
    setEnd(format(date.to, "yyyy-MM-dd'T'HH:mm:ss"));
  }, [date]);
  

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4 sm:gap-0">
      <h2 className="md:text-3xl text-lg  font-bold tracking-tight">Dashboard</h2>
      <div>
      <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "md:w-[250px] w-full justify-start gap-2 text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <div className="hidden sm:block">
            <CalendarIcon size={16}/>
            </div>
            {date?.from ? (
              date.to ? (
                <div className="text-xs sm:text-base">
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </div>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              if (range) {
                // Update the state with the new range
                setDate({
                  from: range.from || date.from, // Retain existing 'from' if not selected
                  to: range.to || date.to,         // Allow partial range selection
                });
              }
            }}        
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
      </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        
          <Card  className="p-6 bg-[#f4eef8]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mt-2">{data?.total_bookings_count}</h3>
                <p className="text-sm text-muted-foreground">Total Booking</p>

              </div>
              <div className="bg-white rounded-full h-10 p-1 w-10">
              <Image src={'https://res.cloudinary.com/dfkn6xcg4/image/upload/v1733224058/path_2_ykmrg7.png'} width={30} height={30} alt="path"/>
              </div>
            </div>
          </Card>
          <Card  className="p-6 bg-[#f4eef8]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mt-2">{data?.total_users}</h3>
                <p className="text-sm text-muted-foreground">Total Users</p>

              </div>
              <div className="bg-white rounded-full h-10 p-1 w-10">
              <Image src={'https://res.cloudinary.com/dfkn6xcg4/image/upload/v1733224058/path_2_ykmrg7.png'} width={30} height={30} alt="path"/>
              </div>
            </div>
          </Card>
          <Card  className="p-6 bg-[#f4eef8]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mt-2">{data?.total_amount}</h3>
                <p className="text-sm text-muted-foreground">Total Amount</p>

              </div>
              <div className="bg-white rounded-full h-10 p-1 w-10">
              <Image src={'https://res.cloudinary.com/dfkn6xcg4/image/upload/v1733224058/path_2_ykmrg7.png'} width={30} height={30} alt="path"/>
              </div>
            </div>
          </Card>
          <Card  className="p-6 bg-[#f4eef8]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mt-2">{data?.total_paid_amount}</h3>
                <p className="text-sm text-muted-foreground">Total Paid</p>

              </div>
              <div className="bg-white rounded-full h-10 p-1 w-10">
              <Image src={'https://res.cloudinary.com/dfkn6xcg4/image/upload/v1733224058/path_2_ykmrg7.png'} width={30} height={30} alt="path"/>
              </div>
            </div>
          </Card>
          
        
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>ADDRESS</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>TYPE</TableHead>
              <TableHead>STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.name}</TableCell>
                <TableCell>{booking.address}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.type}</TableCell>
                <TableCell>
                  {booking.status === 'Booked' ? (
                    <Badge className="bg-[#ccf0eb] text-[#00b69b] rounded-md">
                      {booking.status}
                    </Badge>
                  ) : booking.status === 'Pending' ? (
                    <Badge className="bg-[#e0d4fc] text-[#6226ef] rounded-md">
                      {booking.status}
                    </Badge>
                  ) : (
                    <Badge className="bg-[#ffeddd] text-[#ffa756] rounded-md">
                      {booking.status}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}