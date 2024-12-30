"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingTable } from "@/components/bookings/booking-table";
import { ArenaSelector } from "@/components/bookings/arena-selector";
import { GameFilter } from "@/components/bookings/game-filter";
import { get_all_bookings } from "@/actions/Grounds";
import Export_Booking from "@/components/bookings/Export_Booking";
export default function BookingsPage() {
  const [idQuery, setIdQuery] = useState("");
  const [nameQuery, setNameQuery] = useState("");
  const [bookingData, setBookingData] = useState([]);

  
  useEffect(() => {
    const token = localStorage.getItem('token')
  if(!token){
    router.push('/login')
  }
    const getData = async () => {
      const token = localStorage.getItem('token');
      const data = await get_all_bookings(token);
      
      setBookingData(data);
    };
    getData();
  }, []);
  

  // Filter bookings based on ID and name
  const filteredData = bookingData.filter((booking) => {
    const matchesId = idQuery ? booking?.booking_id.toString().includes(idQuery) : true;
    const matchesName = nameQuery
      ? booking?.user?.name?.toLowerCase().includes(nameQuery.toLowerCase())
      : true;
    return matchesId && matchesName;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
        <Export_Booking/>
      </div>

      <Tabs defaultValue="total">
        <TabsList>
          <TabsTrigger value="total">Total Booking</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <div className="mt-4 space-y-4">
          <ArenaSelector />
          <div className="flex gap-4">
            <Input
              placeholder="Search by ID"
              value={idQuery}
              onChange={(e) => setIdQuery(e.target.value)}
              className="max-w-xs"
            />
            <Input
              placeholder="Search by name"
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-primary1">Search</Button>
          </div>
          <GameFilter />
        </div>

        <TabsContent value="total" className="mt-4">
          <BookingTable data={filteredData} status="" />
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <BookingTable status="pending" data={filteredData} />
        </TabsContent>
        <TabsContent value="booked" className="mt-4">
          <BookingTable status="booked" data={filteredData} />
        </TabsContent>
        <TabsContent value="cancelled" className="mt-4">
          <BookingTable status="cancelled" data={filteredData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
