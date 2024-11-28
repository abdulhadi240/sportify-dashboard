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
  // Add more booking data here
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              </div>
              <div className="text-green-500">{stat.percentage}</div>
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
                  <Badge variant={booking.status === "Booked" ? "default" : "secondary"}>
                    {booking.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}