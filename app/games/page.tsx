"use client";

import { Button } from "@/components/ui/button";
import { GamesList } from "@/components/games/games-list";

export default function GamesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Games</h2>
        <div className="flex gap-4">
          <Button>Export</Button>
          <Button>Create Category</Button>
        </div>
      </div>

      <GamesList />
    </div>
  );
}