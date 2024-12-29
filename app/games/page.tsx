
import React, { Suspense } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import BodyGames from "@/components/BodyGames";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Export from "@/components/Export";
import { AllGames } from "@/actions/Grounds";

export const experimental_ppr = true;

export default async function Page() {

  const response = await AllGames();
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Games</h2>
        <div className="flex gap-3">
          <Export/>
          <Link
            href="/games/create"
            className="px-6 bg-primary1 text-white rounded-lg flex items-center justify-center gap-2"
          >
            <FaPlus />
            <span className="hidden md:block">Create Game</span>
          </Link>
        </div>
      </div>
      <div className="w-full overflow-auto bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NAME</TableHead>
              <TableHead>CATEGORY</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>BOOKING</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<Skeleton />}>
            <BodyGames games={response}/>
          </Suspense>
        </Table>
      </div>
    </div>
  );
}
