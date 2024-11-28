"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const games = [
  {
    name: "Cricket Nets",
    slug: "cricket-nets",
    category: "Outdoor",
    status: "active",
    booking: "15",
  },
  // Add more games as needed
];

export function GamesList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>NAME</TableHead>
          <TableHead>SLUG</TableHead>
          <TableHead>CATEGORY</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead>BOOKING</TableHead>
          <TableHead>EDIT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {games.map((game) => (
          <TableRow key={game.slug}>
            <TableCell>{game.name}</TableCell>
            <TableCell>{game.slug}</TableCell>
            <TableCell>{game.category}</TableCell>
            <TableCell>
              <Badge
                variant={game.status === "active" ? "default" : "secondary"}
              >
                {game.status}
              </Badge>
            </TableCell>
            <TableCell>{game.booking}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <PencilIcon className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}