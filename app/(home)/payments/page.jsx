
import React, { Suspense } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import BodyOfPayment from "@/components/BodyOfPayment";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Export from "@/components/Export";

export const experimental_ppr = true;

export default async function Page() {
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">PAYMENTS</h2>
        <div className="flex gap-3">
          <Export/>
          <Link
            href="/grounds/create"
            className="px-6 bg-primary1 text-white rounded-lg flex items-center justify-center gap-2"
          >
            <FaPlus />
            <span className="hidden md:block">Create Payment</span>
          </Link>
        </div>
      </div>
      <div className="w-full overflow-auto bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>BOOKING_ID</TableHead>
              <TableHead>PAYMENT</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>METHOD</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>SCREENSHOT</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<Skeleton />}>
            <BodyOfPayment/>
          </Suspense>
        </Table>
      </div>
    </div>
  );
}
