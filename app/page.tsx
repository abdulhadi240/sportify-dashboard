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

const stats = [
  {
    title: "Total Booking",
    value: "22,880",
    percentage: "67%",
  },
  {
    title: "Total Sales",
    value: "22,880",
    percentage: "67%",
  },
  {
    title: "Total Support",
    value: "22,880",
    percentage: "67%",
  },
  {
    title: "Marketing Amount",
    value: "22,880",
    percentage: "67%",
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
    id: "00001",
    name: "Brroks",
    address: "089 Kutch Green Apt 428",
    date: "04 Sep 2024",
    type: "Cricket",
    status: "Pending",
  },
  // Add more booking data here
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6 bg-[#f4eef8]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>

              </div>
              <div className="bg-white rounded-full h-10 p-1 w-10">
              <Image src={'https://res.cloudinary.com/dfkn6xcg4/image/upload/v1733224058/path_2_ykmrg7.png'} width={30} height={30} alt="path"/>
              </div>
            </div>
          </Card>
        ))}
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