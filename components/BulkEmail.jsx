"use client";

import React, { useState } from "react";
import { MdMail } from "react-icons/md";
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
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

const BulkEmail = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBulkSendEmail = async () => {
    const token = localStorage.getItem('token');

    if (!emailSubject || !emailContent) {
      alert("Please fill in all fields before sending.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("https://sportify-1haq.onrender.com/admin/email_all", {
        method: "POST",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: emailSubject,
          content: emailContent,
          roles: ["admin"],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send email");
      }

      toast.success("Bulk email sent successfully!");
      setIsDialogOpen(false);
      setEmailSubject("");
      setEmailContent("");
    } catch (error) {
      console.error("Error sending bulk email:", error);
      toast.error("Failed to send bulk email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button
          className="md:px-6 px-3 bg-primary1 text-white rounded-lg flex items-center justify-center gap-2"
        >
          <MdMail />
          <span className="hidden md:block">Bulk</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Bulk Email</DialogTitle>
          <DialogDescription>
            Write a subject and content to send bulk email to all users.
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
          <Button type="button" onClick={handleBulkSendEmail} className="bg-primary1">
            {isLoading ? <Loading /> : "Send Email"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkEmail;
