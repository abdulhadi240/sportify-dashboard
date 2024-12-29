
import React, { Suspense } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import BodyCustomer from "../../components/BodyCustomer";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Export_Customer from "@/components/Export_Customer";
import { GetAllUser } from "@/actions/Grounds";
import BulkEmail from "@/components/BulkEmail";


export const experimental_ppr = true;

export default async function Page() {
  
  const response = await GetAllUser();
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h2 className="md:text-3xl text-2xl font-bold tracking-tight">Customer</h2>
        <div className="flex gap-3 ">
        <BulkEmail/>
          <Export_Customer/>
          <Link
            href="/customers/create"
            className="md:px-6 px-3 bg-primary1 text-white rounded-lg flex items-center justify-center gap-2"
          >
            <FaPlus />
            <span className="hidden md:block">Create Customer</span>
          </Link>
          
        </div>
      </div>
      <div className="w-full overflow-auto bg-white rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NAME</TableHead>
              <TableHead>EMAIL</TableHead>
              <TableHead>CONTACT</TableHead>
              <TableHead>SEC CONTACT</TableHead>
              <TableHead>IMAGE</TableHead>
              <TableHead>CREATED AT</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <Suspense fallback={<Skeleton />}>
            <BodyCustomer user={response}/>
          </Suspense>
        </Table>
      </div>
    </div>
  );
}
