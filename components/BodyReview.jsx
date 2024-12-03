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


const reviews = [
    {
        id: 1,
        customer: 'John Doe',
        ground: 'Ground 1 ',
        review: 'Sportefy is one of the best places for learning valuable skills, with a healthy environment and focused management.',
        rating: 5,
        status: 'InActive',
    },
    {
        id: 2,
        customer: 'Jane',
        ground: 'Ground 2',
        review: 'Sportefy is one of the best places for learning valuable skills, with a healthy ',
        rating: 2,
        status: 'Published',
    },
];


const BodyReview = () => {
  const [data, setData] = useState(reviews);
  const [loading, setLoading] = useState(false);
  console.log(reviews[0].customer);
  

 {/**  useEffect(() => {
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = monthNames[date.getMonth()];

    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } */}

  if (loading) {
    return <Skeleton />;
  }

  return (
    <TableBody>
            {data?.map((booking) => (
                <TableRow key={booking.id} className='hover:bg-[#f4eef8]'>
                    <TableCell>{booking.customer}</TableCell>
                    <TableCell>{booking.ground}</TableCell>
                    <TableCell>{booking.review}</TableCell>
                    <TableCell>{booking.rating}</TableCell>
                    <TableCell>
                        {booking.status === 'Published' ? (
                            <span className="bg-[#c3e3e5] text-[#00b69b] p-2 rounded-lg px-3">{booking.status}</span>
                        ) : (
                            <span className="bg-[#f0cccc] text-[#b60000] p-2 rounded-lg px-3">Failed</span>
                        )}
                    </TableCell>
                    <TableCell>
                        <div className="flex gap-2">
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
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
  );
};

export default BodyReview;