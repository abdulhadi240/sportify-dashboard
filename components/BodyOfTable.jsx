'use client';
import React, { useEffect, useState } from 'react';
import { TableBody, TableCell, TableRow } from '@/components/ui/table'; // Assuming these components are correct
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { Courts, DeleteCourt } from '@/actions/Grounds';
import { Skeleton } from '@/components/ui/skeleton';

const BodyOfTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const response = await Courts(token);
      setData(response);
      setLoading(false);
    }
    fetchData();
  }, []);

  const HandleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await DeleteCourt(id, token);
    const response = await Courts(token);
    setData(response);
    setLoading(false);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  if (loading) {
    return <Skeleton />;
  }

  return (
    <TableBody>
      {data?.map((booking) => (
        <TableRow key={booking.id} className='hover:bg-[#f4eef8]'>
          <TableCell>{booking.court_id}</TableCell>
          <TableCell>{booking.name}</TableCell>
          <TableCell>{booking.game || 'Cricket'}</TableCell>
          <TableCell>{booking.court_location}</TableCell>
          <TableCell>{booking.hourly_rate}</TableCell>
          <TableCell>{formatDate(booking.created_at)}</TableCell>
          <TableCell>
            <span className="flex gap-2">
              <Link
                href={`/grounds/${booking.id}`}
                className="text-primary1 w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full"
              >
                <FiEdit />
              </Link>
              <button
                onClick={() => { HandleDelete(booking.id) }}
                className="text-primary1 hover:cursor-pointer w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full underline"
              >
                <MdDelete />
              </button>
            </span>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default BodyOfTable;
