'use client';
import React, { useEffect, useState } from 'react';
import {
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { FiEdit } from 'react-icons/fi';
import { MdMail } from 'react-icons/md';
import { GetAllUser } from '@/actions/Grounds';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteUser } from '@/actions/Grounds';
import Loading from '@/components/Loading';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from 'react-toastify';

const BodyCustomer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(data?.id);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [load, setLoad] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');

      try {
        const response = await GetAllUser(token);
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await DeleteUser(id);
      setData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSendEmail = async () => {
    const token = localStorage.getItem('token');

    if (!selectedUser || !emailSubject || !emailContent) {
      alert("Please fill in all fields before sending.");
      return;
    }
    setLoad(true)
    try {
      const response = await fetch('https://sportify-1haq.onrender.com/admin/email_user', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedUser.id,
          subject: emailSubject,
          content: emailContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      toast.success("Email sent successfully!");
      setLoad(false)
      setEmailSubject('');
      setEmailContent('');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const getInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    const initials = nameParts.map((part) => part.charAt(0)).join('');
    return initials.toUpperCase();
  };

  if (loading) {
    return (
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index}>
            <TableCell><Skeleton className="h-4 w-full" /></TableCell>
            <TableCell><Skeleton className="h-4 w-full" /></TableCell>
            <TableCell><Skeleton className="h-4 w-full" /></TableCell>
            <TableCell><Skeleton className="h-4 w-full" /></TableCell>
            <TableCell><Skeleton className="h-4 w-full" /></TableCell>
            <TableCell><Skeleton className="h-4 w-full" /></TableCell>
            <TableCell><Skeleton className="h-4 w-full" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.map((user) => (
        <TableRow key={user.id} className="hover:bg-[#f4eef8]">
          <TableCell>{user.name || 'Christine Brooks'}</TableCell>
          <TableCell>{user.email || 'example@gmail.com'}</TableCell>
          <TableCell>{user.user_phone || '+92-3334-567891'}</TableCell>
          <TableCell>{user.secondary_user_phone || '+92-3334-567891'}</TableCell>
          <TableCell>
            <Avatar>
              <AvatarFallback className="bg-primary1 text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </TableCell>
          <TableCell>{formatDate(user.created_at) || '04 Sep 2024'}</TableCell>
          <TableCell>
            <div className="flex gap-2">
              <Link
                href={`/customers/${user.id}`}
                className="text-primary1 w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full"
              >
                <FiEdit />
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-primary1 hover:cursor-pointer w-8 h-8 bg-[#f7edfa] flex justify-center items-center rounded-full"
                  >
                    <MdMail />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Send Email</DialogTitle>
                    <DialogDescription>
                      Make sure to write a friendly email to the customer.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subject" className="text-right">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="content" className="text-right">
                        Content
                      </Label>
                      <textarea
                        id="content"
                        value={emailContent}
                        onChange={(e) => setEmailContent(e.target.value)}
                        className="col-span-3 border-[1px] rounded-sm p-2"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={handleSendEmail} className='bg-primary1'>{load ? <Loading/> : 'Send Email'}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default BodyCustomer;
