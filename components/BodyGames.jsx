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
import { AllGames, DeleteGame } from '@/actions/Grounds';
import {Skeleton} from '@/components/ui/skeleton';


const BodyGames = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const response = await AllGames(token);
      setData(response);
      setLoading(false);
    }
    fetchData();
  }, []);


  const HandleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const res = await DeleteGame(id , token)
    console.log(res);
    
    const response = await AllGames(token);
    console.log(response);
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

  if (loading) {
    return <Skeleton />;
  }

  return (
    <TableBody>
      {data?.map((booking,index) => (
        <TableRow key={booking.id} className='hover:bg-[#f4eef8]'>
          <TableCell>{index+1}</TableCell>
          <TableCell>{booking.name || ''}</TableCell>
          <TableCell>{booking.category || ''}</TableCell>
          <TableCell>{booking.status || 'Published'}</TableCell>
          <TableCell>{booking.total || ''}</TableCell>
          <TableCell>
            <div className="flex gap-2">
              <Link
                href={`/games/${booking.id}`}
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

export default BodyGames;