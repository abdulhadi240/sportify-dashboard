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
import { Skeleton } from '@/components/ui/skeleton';
import { GetAllReviews, DeleteReviews } from '@/actions/Grounds';
import { useRouter } from 'next/navigation';
const BodyReview = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null); // Track the review being edited
  const [status, setStatus] = useState('');
const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const response = await GetAllReviews(token);
      setData(response);
      setLoading(false);
    }
    fetchData();
  }, []);

  const HandleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await DeleteReviews(id, token);
    const response = await GetAllReviews(token);
    setData(response);
    setLoading(false);
  };

  const HandleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://sportify-1haq.onrender.com/review/changeStatus', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id,
          status: newStatus,
        }),
      });

      const data = await response.json();
      if(status === 'approved') {
        router.push('/reviews');
      }
      } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <TableBody>
      {data?.map((booking) => (
        <TableRow key={booking.id} className='hover:bg-[#f4eef8]'>
          <TableCell>{booking.user.name}</TableCell>
          <TableCell>{booking.court.name}</TableCell>
          <TableCell>{booking.review_text}</TableCell>
          <TableCell>{booking.rating}</TableCell>
          <TableCell>
            {editingId === booking.id ? (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-2 rounded-lg"
              >
                <option value="approved">Approve</option>
                <option value="rejected">Reject</option>
                <option value="pendinqg">Pending</option>
              </select>
            ) : (
              <span
                className={`p-2 rounded-lg px-3 ${booking.published === 'published' ? 'bg-[#c3e3e5] text-[#00b69b]' : booking.published === 'cancelled' ? 'bg-[#f0cccc] text-[#b60000]' : 'bg-[#f0f0f0] text-[#b6b6b6]'}`}
              >
                {booking.published}
              </span>
            )}
          </TableCell>
          <TableCell>
            <div className="flex gap-2">
              <button
                className="text-primary1 w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full"
              >
                <FiEdit onClick={() => {
                  setEditingId(booking.id);
                  setStatus(booking.published); // Pre-select the current status
                  
                }} />
              </button>
              <button
                onClick={() => HandleDelete(booking.id)}
                className="text-primary1 hover:cursor-pointer w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full"
              >
                <MdDelete />
              </button>
            </div>
            {editingId === booking.id && (
              <button
                onClick={() => HandleStatusChange(booking.id, status)}
                className="mt-2 text-white bg-primary1 px-4 py-2 rounded-lg"
              >
                Save
              </button>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default BodyReview;
