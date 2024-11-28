"use client";

import { Button } from "@/components/ui/button";

const arenas = ["IU ARENA", "ELIXIR ARENA", "GROOVE ARENA"];

export function ArenaSelector() {
  return (
    <div className="flex gap-2">
      {arenas.map((arena) => (
        <Button
          key={arena}
          variant="outline"
          className="text-sm"
        >
          {arena}
        </Button>
      ))}
    </div>
  );
}