import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiEdit } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {Grounds } from "../../actions/Booking";

const bookings = [
  {
    ID: 1,
    NAME: "Ground A",
    GAME: "Soccer",
    LOCATION: "City A",
    AMOUNT: 100,
    CREATED_AT: "2023-01-01",
    ACTION: "Edit"
  },
  {
    ID: 2,
    NAME: "Ground B",
    GAME: "Basketball",
    LOCATION: "City B",
    AMOUNT: 200,
    CREATED_AT: "2023-02-01",
    ACTION: "Edit"
  }
];

export default async function Page() {


    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
      
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[date.getMonth()];
      
        const year = date.getFullYear();
      
        return `${day} ${month} ${year}`;
      }


    const data = await Grounds();
    console.log(data);
    
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Grounds</h2>
      
    

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>GAME</TableHead>
              <TableHead>LOCATION</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>CREATED AT</TableHead>
              <TableHead>ACTION</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.court_id}</TableCell>
                <TableCell>{booking.name}</TableCell>
                <TableCell>{booking.GAME || 'Cricket'}</TableCell>
                <TableCell>{booking.court_location}</TableCell>
                <TableCell>{booking.hourly_rate}</TableCell>
                <TableCell>{formatDate(booking.created_at)}</TableCell>
                <TableCell>
                <Link href={`/grounds/${booking.id}`} className="text-primary1 w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full underline"><FiEdit/></Link>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}