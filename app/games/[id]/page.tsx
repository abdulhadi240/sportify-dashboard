"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/games/image-upload";

export default function GameEditPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Games/Category</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input placeholder="Enter game name" />
          </div>
          
          <div>
            <label className="text-sm font-medium">Category</label>
            <Input placeholder="Enter category" />
          </div>

          <div>
            <label className="text-sm font-medium">Person</label>
            <Input type="number" placeholder="1,2,3" />
          </div>

          <div>
            <label className="text-sm font-medium">Date</label>
            <Input type="date" />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea placeholder="Description" />
          </div>

          <Button className="w-full">Save</Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Add Images</h3>
          <div className="grid grid-cols-2 gap-4">
            <ImageUpload label="Primary" />
            <ImageUpload label="Secondary" />
            <ImageUpload label="Secondary" />
            <ImageUpload label="Secondary" />
            <ImageUpload label="Secondary" />
            <ImageUpload label="Secondary" />
          </div>

          <h3 className="text-lg font-semibold mt-6">Add Videos</h3>
          <div className="grid grid-cols-2 gap-4">
            <ImageUpload label="Primary" />
            <ImageUpload label="Secondary" />
          </div>

          <Button className="w-full mt-4">Upload</Button>
        </div>
      </div>
    </div>
  );
}