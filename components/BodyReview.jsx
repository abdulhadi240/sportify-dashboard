'use client';
import React, { useEffect, useState } from 'react';
import {
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import {Skeleton} from '@/components/ui/skeleton';


const BodyReview = ({review}) => {
  const [data, setData] = useState(review);
  const [loading, setLoading] = useState(false);


  console.log(data[0]);
  
    useEffect(() => {
    async function fetchData() {
      const response = await Courts();
      setData(response);
      setLoading(false);
    }
    fetchData();
  }, []);


  const HandleDelete = async (id) => {
    await DeleteCourt(id)
    const response = await Courts();
    setData(response);
    setLoading(false);
  } 

  
  if (loading) {
    return <Skeleton />;
  }

  return (
    <TableBody>
            {data?.map((booking) => (
                <TableRow key={booking.id} className='hover:bg-[#f4eef8]'>
                    <TableCell>{booking.user_id}</TableCell>
                    <TableCell>{booking.court_id}</TableCell>
                    <TableCell>{booking.review_text}</TableCell>
                    <TableCell>{booking.rating}</TableCell>
                    <TableCell>
                        {booking.published === 'published' ? (
                            <span className="bg-[#c3e3e5] text-[#00b69b] p-2 rounded-lg px-3">{booking.published}</span>
                        ) : (
                            <span className="bg-[#f0cccc] text-[#b60000] p-2 rounded-lg px-3">{booking.published}</span>
                        )}
                    </TableCell>
                    <TableCell>
                        <label className="flex gap-2">
                            <Link
                                href={`/reviews/${booking.id}`}
                                className="text-primary1 w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full"
                            >
                                <FiEdit />
                            </Link>
                            <button
                                className="text-primary1 hover:cursor-pointer w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full"
                            >
                                <MdDelete />
                            </button>
                        </label>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
  );
};

export default BodyReview;