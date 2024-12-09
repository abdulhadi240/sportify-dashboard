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
import {GetAllUser } from '@/actions/Grounds';
import {Skeleton} from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteUser } from '../actions/Grounds';



const BodyCustomer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await GetAllUser();
      setData(response);
      setLoading(false);
    }
    fetchData();
  }, []);


  const HandleDelete = async (id) => {
    await DeleteUser(id)
    const response = await GetAllUser();
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
  }

  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0)).join('');
    return initials;
  };
  

  if (loading) {
    return <Skeleton />;
  }

  return (
    <TableBody>
      {data.map((booking) => (
        <TableRow key={booking.id} className='hover:bg-[#f4eef8]'>
          <TableCell>{booking.name || 'Christine Brooks'}</TableCell>
          <TableCell>{booking.email || 'example@gmail.com'}</TableCell>
          <TableCell>{booking.user_phone || '+92-3334-567891'}</TableCell>
          <TableCell>{booking.secondary_user_phone || '+92-3334-567891'}</TableCell>
          <TableCell>
          <Avatar>
            <AvatarFallback className='bg-primary1 text-white'>{getInitials(booking.name)}</AvatarFallback>
          </Avatar>
          </TableCell>
          <TableCell>{formatDate(booking.created_at) || '04 sep 2024'}</TableCell>
          <TableCell>
            <div className="flex gap-2">
              <Link
                href={`/customers/${booking.id}`}
                className="text-primary1 w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full"
              >
                <FiEdit />
              </Link>
              <button
              onClick={()=>{HandleDelete(booking.id)}}
                className="text-primary1 hover:cursor-pointer w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full underline"
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

export default BodyCustomer;