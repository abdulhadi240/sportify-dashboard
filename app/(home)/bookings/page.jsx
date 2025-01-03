"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingTable } from "@/components/bookings/booking-table";
import { AllGames, Courts, get_all_bookings } from "@/actions/Grounds";
import Export_Booking from "@/components/bookings/Export_Booking";
import { useRouter } from "next/navigation";

export default function BookingsPage() {
  const [idQuery, setIdQuery] = useState("");
  const [nameQuery, setNameQuery] = useState("");
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [arenas, setArena] = useState([]);
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getData = async () => {
      if (token) {
        const token = localStorage.getItem("token");
        const data = await get_all_bookings(token);
        const games = await AllGames(token);
        const courts = await Courts(token);

        setGames(games);
        setArena(courts);
        setBookingData(data);
      } else {
        router.push("/login");
      }
    };

    getData();
  }, []);

  // Filter bookings based on ID, name, game, and court
  const filteredData = bookingData?.filter((booking) => {
    const matchesId = idQuery
      ? booking?.booking_id?.toString().includes(idQuery)
      : true;
    const matchesName = nameQuery
      ? booking?.customer_name?.toLowerCase().includes(nameQuery.toLowerCase())
      : true;
    const matchesGame = selectedGame
      ? booking?.court_game_names === selectedGame
      : true;
    const matchesCourt = selectedCourt
      ? booking?.court_name === selectedCourt
      : true;

    return matchesId && matchesName && matchesGame && matchesCourt;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
        <Export_Booking />
      </div>

      <Tabs defaultValue="total">
        <TabsList>
          <TabsTrigger value="total">Total Booking</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Booked</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <div className="mt-4 space-y-4">
          {/* Arena Filter */}
          <div className="flex gap-2">
            {arenas.map((arena, index) => (
              <Button
                key={index}
                variant={selectedCourt === arena.name ? "default" : "outline"}
                className="text-sm"
                onClick={() =>
                  setSelectedCourt(
                    selectedCourt === arena.name ? null : arena.name
                  )
                }
              >
                {arena.name}
              </Button>
            ))}
          </div>

          {/* Game Filter */}
          <div className="flex gap-2">
            {games.map((game, index) => (
              <Button
                key={index}
                variant={selectedGame === game.name ? "default" : "outline"}
                className="text-sm"
                onClick={() =>
                  setSelectedGame(selectedGame === game.name ? null : game.name)
                }
              >
                {game.name}
              </Button>
            ))}
          </div>

          {/* Search Filters */}
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
        </div>

        {/* Tabs Content */}
        <TabsContent value="total" className="mt-4">
          <BookingTable data={filteredData} status="" />
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <BookingTable status="pending" data={filteredData} />
        </TabsContent>
        <TabsContent value="confirmed" className="mt-4">
          <BookingTable status="confirmed" data={filteredData} />
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          <BookingTable status="completed" data={filteredData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
