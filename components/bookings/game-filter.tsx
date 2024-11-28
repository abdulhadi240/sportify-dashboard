"use client";

import { Button } from "@/components/ui/button";

export function GameFilter() {
  return (
    <div className="flex gap-2">
      <Button variant="secondary" className="text-sm">
        ALL
      </Button>
      <Button variant="outline" className="text-sm">
        CRICKET
      </Button>
      <Button variant="outline" className="text-sm">
        FUTSAL
      </Button>
    </div>
  );
}