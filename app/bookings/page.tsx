"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingTable } from "@/components/bookings/booking-table";
import { ArenaSelector } from "@/components/bookings/arena-selector";
import { GameFilter } from "@/components/bookings/game-filter";

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
        <Button>Export</Button>
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
              placeholder="Search by ref ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
            <Input
              placeholder="Search by name, email or phone"
              className="flex-1"
            />
            <Button>Search</Button>
          </div>
          <GameFilter />
        </div>

        <TabsContent value="total" className="mt-4">
          <BookingTable />
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <BookingTable status="pending" />
        </TabsContent>
        <TabsContent value="booked" className="mt-4">
          <BookingTable status="booked" />
        </TabsContent>
        <TabsContent value="cancelled" className="mt-4">
          <BookingTable status="cancelled" />
        </TabsContent>
      </Tabs>
    </div>
  );
}